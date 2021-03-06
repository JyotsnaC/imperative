/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

import {format, inspect, isNullOrUndefined} from "util";
import {ImperativeError} from "../../error";
import * as StackTrace from "stack-trace";
import * as path from "path";
import {TextUtils} from "../../utilities";
import {IO} from "../../io";
import {IConfigLogging} from "./doc/IConfigLogging";
import * as log4js from "log4js";
import {Console} from "../../console";

/**
 * Note(Kelosky): it seems from the log4js doc that you only get a single
 * instance of log4js per category.  To reconfigure, you should "shutdown" logger.
 */
export class Logger {
    public static readonly DEFAULT_IMPERATIVE_NAME = "imperative";
    public static readonly DEFAULT_APP_NAME = "app";

    /**
     * Get accessibility to logging service to invoke log calls, e.g
     * Logger.getLogger.info("important log info goes here");
     * @param {string} category - category of logger to obtain
     * @return {Logger} - instance of logger set to our app's category
     */
    public static getLoggerCategory(category: string) {
        return new Logger(log4js.getLogger(category));
    }

    /**
     * Get accessibility to logging service to invoke log calls, e.g
     * Logger.getLogger.info("important log info goes here");
     * @return {Logger} - instance of logger set to our app's category
     */
    public static getImperativeLogger() {
        return Logger.getLoggerCategory("imperative");
    }

    /**
     * Get log4js instance directed at our app's category.
     * @return {Logger} - instance of logger set to our app's category
     */
    public static getAppLogger() {
        return Logger.getLoggerCategory("app");
    }

    /**
     * Return an instance to the console logger which applies TextUtils invoked
     * through this Logger class.
     *
     * Note(Kelosky): this is not the same as obtaining a new Console() directly,
     * since we can make use of the internationalization and other routines
     * within this Logger class via this implementation.
     *
     * @return {Logger} - instance of logger set to our app's category
     */
    public static getConsoleLogger() {
        return new Logger(new Console());
    }

    /**
     * Get an instance of logging and adjust for config if config is present;
     * otherwise, use defaults.
     * @param  {IConfigLogging} loggingConfig [description]
     * @return {[type]}                       [description]
     */
    public static initLogger(loggingConfig: IConfigLogging) {
        if (isNullOrUndefined(loggingConfig)) {
            throw new ImperativeError({msg: "Input logging config document is required"});
        }

        if (isNullOrUndefined(loggingConfig.log4jsConfig)) {
            throw new ImperativeError({msg: "Input logging config is incomplete, does not contain log4jsConfig"});
        }

        if (isNullOrUndefined(loggingConfig.log4jsConfig.appenders)) {
            throw new ImperativeError({msg: "Input logging config is incomplete, does not contain log4jsConfig.appenders"});
        }

        let logger: log4js.Logger;

        try {
            let logFile: string;
            for (const appenderName of Object.keys(loggingConfig.log4jsConfig.appenders)) {
                const appender = loggingConfig.log4jsConfig.appenders[appenderName];
                if (appender.type === "file" || appender.type === "fileSync") {
                    IO.createDirsSyncFromFilePath(appender.filename);
                    logFile = appender.filename;
                }
            }
            log4js.configure(loggingConfig.log4jsConfig as any);
            logger = log4js.getLogger();
            logger.level = "debug";
            return new Logger(logger);
        } catch (err) {
            const cons = new Console();
            cons.error("Couldn't make desired logger: %s", inspect(err));
            return new Logger(cons);
        }

    }

    constructor(private mJsLogger: log4js.Logger | Console) {
    }

    // TODO: Can we find trace info for TypeScript to have e.g.  [ERROR] Jobs.ts : 43 - Error encountered

    /**
     * Log a message at the "trace" level
     *  Example: 'Entering cheese testing'
     * @param message - printf style template string, or a plain string message
     * @param args - printf style args
     * @returns {any}
     */
    public trace(message: string, ...args: any[]): string {
        const finalMessage = TextUtils.formatMessage.apply(this, [message].concat(args));
        this.logService.trace(this.getCallerFileAndLineTag() + finalMessage);
        return finalMessage;
    }

    /**
     * Log a message at the "debug" level
     *  Example: 'Got cheese'
     * @param message - printf  or mustache style template string, or a plain string message
     * @param args - printf or mustache style args
     * @returns {any}
     */
    public debug(message: string, ...args: any[]): string {
        const finalMessage = TextUtils.formatMessage.apply(this, [message].concat(args));
        this.logService.debug(this.getCallerFileAndLineTag() + finalMessage);
        return finalMessage;
    }

    /**
     * Log a message at the "info" level
     *  Example: 'Cheese is Gouda'
     * @param message - printf or mustache style template string, or a plain string message
     * @param args - printf or mustache style args
     * @returns {any}
     */
    public info(message: string, ...args: any[]): string {
        const finalMessage = TextUtils.formatMessage.apply(this, [message].concat(args));
        this.logService.info(this.getCallerFileAndLineTag() + finalMessage);
        return finalMessage;
    }

    /**
     * Log a message at the "warn" level
     *  Example: 'Cheese is quite smelly.'
     * @param message - printf or mustache style template string, or a plain string message
     * @param args - printf  or mustache style args
     * @returns {any}
     */
    public warn(message: string, ...args: any[]): string {
        const finalMessage = TextUtils.formatMessage.apply(this, [message].concat(args));
        this.logService.warn(this.getCallerFileAndLineTag() + finalMessage);
        return finalMessage;
    }

    /**
     * Log a message at the "error" level
     *  Example: 'Cheese is too ripe!'
     * @param message - printf or mustache style template string, or a plain string message
     * @param args - printf or mustache style args
     * @returns {any}
     */
    public error(message: string, ...args: any[]): string {
        const finalMessage = TextUtils.formatMessage.apply(this, [message].concat(args));
        this.logService.error(this.getCallerFileAndLineTag() + finalMessage);
        return finalMessage;
    }

    /**
     * Log a message at the "fatal" level
     *  Example: 'Cheese was breeding ground for listeria.'
     * @param message - printf or mustache style template string, or a plain string message
     * @param args - printf  or mustache style args
     * @returns {any}
     */
    public fatal(message: string, ...args: any[]): string {
        const finalMessage = TextUtils.formatMessage.apply(this, [message].concat(args));
        this.logService.fatal(this.getCallerFileAndLineTag() + finalMessage);
        return finalMessage;
    }

    /**
     * Log a message without CallerFileAndLineTag
     *  Example: 'Cheese that is plain'
     * @param message - printf or mustache style template string, or a plain string message
     * @param args - printf or mustache style args
     * @returns {any}
     */
    public simple(message: string, ...args: any[]): string {
        const finalMessage = TextUtils.formatMessage.apply(this, [message].concat(args));
        this.logService.info(finalMessage);
        return finalMessage;
    }

    /**
     * Log an Imperative error, including any optional fields if present
     * @param {ImperativeError} err - the error to log
     */
    public logError(err: ImperativeError): void {
        this.debug("Stack at time of error logging: %s", new Error().stack);

        if (!isNullOrUndefined(err.details.additionalDetails)) {
            this.error(err.details.additionalDetails);
        }
        if (!isNullOrUndefined(err.stack)) {
            this.error(err.stack);
        }
        if (!isNullOrUndefined(err.details.causeErrors) && !isNullOrUndefined(err.details.causeErrors.length)
            && err.details.causeErrors.length > 0) {
            for (const cause of err.details.causeErrors) {
                this.error("Cause error:\n%s", inspect(cause));
            }
        }
        this.error(err.message);

    }

    /**
     * translate a message if possible
     * @param message - original message to translate, possibly with printf or {{obj}} style template
     * @param args  - varargs to use to translate / format
     * @returns {string} translated or replaced result
     */
    // public translate(message: string, ...args: any[]): string {
    //     let result: string;
    //     let translationError: Error;
    //     try {
    //         result = i18n.__.apply(global, [message].concat(args));
    //     } catch (e) {
    //         result = undefined;
    //         translationError = e;
    //     }
    //     if (isNullOrUndefined(result)) {
    //         if (translationError) {
    //             this.logService.warn("Error while translating!\n%s", inspect(translationError));
    //         }
    //         result = TextUtils.formatMessage(message, ...args);
    //     }
    //     return result;
    // }

    /**
     * Obtain .js file name and line number which issued the log message.
     * NOTE(Kelosky): Consensus seems to be that this may produce a lot of overhead
     * by creating an Error and obtaining stack information for EVERY log message
     * that is issued.
     *
     * There are also packages available to obtain the appropriate line number.
     *
     * Perhaps when a package pops up that gives the appropriate .ts line number
     * and file name, we'll remove usage of this method.
     * @returns {string} - file and line number
     */
    private getCallerFileAndLineTag(): string {
        const frame: StackTrace.StackFrame[] = StackTrace.parse(new Error());
        let callerStackIndex = 1;
        while (frame[callerStackIndex].getFileName().indexOf(path.basename(__filename)) >= 0) {
            // go up the stack until we're outside of the BrightsideLogger file
            callerStackIndex += 1;
        }
        const filename = path.basename(frame[callerStackIndex].getFileName());
        const lineNumber = frame[callerStackIndex].getLineNumber();
        return format("[%s:%s] ", filename, lineNumber);
    }

    /**
     * Allow for programmatic adjustments to the logger
     * @param {string} level - new level to set
     */
    set level(level: string) {
        this.logService.level = level;
    }

    /**
     * Get current level setting
     * @return {string} - level of current log setting
     */
    get level() {
        return this.logService.level;
    }

    /**
     * Get underlying logger service
     */
    private get logService() {
        return this.mJsLogger;
    }

    /**
     * Set underlying logger service
     */
    private set logService(service: log4js.Logger | Console) {
        this.mJsLogger = service;
    }
}
