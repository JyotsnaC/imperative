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

import {TestOperations1} from "./mockops/TestOperations1";
import {TestOperations4} from "./mockops/TestOperations4";

import {isNullOrUndefined} from "util";
import {TestOperations3} from "./mockops/TestOperations3";

import {IOperationResult, Operation, Operations} from "../../index";
import {TestLogger} from "../../../../__tests__/TestLogger";

const logger = TestLogger.getTestLogger();

export class OperationTestConstants {
    public static OPER_TEST1_RESULTS: Array<IOperationResult<any>> = [{
        operationName: "Initialize Test Sub Op 1",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op 2",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op No Undo",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: false,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }];

    public static OPER_TEST2_RESULTS: Array<IOperationResult<any>> = [{
        operationName: "Initialize Test Sub Op 1",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: true,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op 2",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: true,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op No Undo",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: false,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op 4",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: true,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op 5",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: true,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op fail",
        resultMessage: "",
        operationFailed: true,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: true,
        operationUndoAttempted: true,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }];

    public static OPER_TEST3_RESULTS: Array<IOperationResult<any>> = [{
        operationName: "Initialize Test Sub Op 1",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op 2",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op No Undo",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: false,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op 4",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op 5",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }, {
        operationName: "Initialize Test Sub Op 6",
        resultMessage: "",
        operationFailed: false,
        diverge: false,
        divergeTo: null,
        continuePath: true,
        nextOperationResult: null,
        operationObject: null,
        operationUndoPossible: true,
        operationUndoFailed: false,
        operationUndoAttempted: false,
        critical: true,
        output: null,
        infoMessages: [],
        errorMessages: []
    }];
}

describe("Operation Infrastructure", () => {
    it("Operations: Test a simple set of operations ",
        (done: any) => {
            logger.debug("Starting simple operations test.");
            const testOperation: Operations<any> = new TestOperations1();
            let operationResults: IOperationResult<any> = null;
            testOperation.executeOperation(Operation.NO_PARMS, (output: any, opResults: IOperationResult<any>) => {
                logger.debug("All operations have completed");
                operationResults = opResults;
                checkResults(operationResults, OperationTestConstants.OPER_TEST1_RESULTS, done, true);
            });
        });
    it("Operations: Test for complex set of operations  ",
        (done: any) => {
            logger.debug("Starting complex operations tests.");
            const testOperation: Operations<any> = new TestOperations3();
            let operationResults: IOperationResult<any> = null;
            testOperation.executeOperation(Operation.NO_PARMS, (output: any, opResults: IOperationResult<any>) => {
                logger.debug("All operations have completed");
                operationResults = opResults;
                checkResults(operationResults, OperationTestConstants.OPER_TEST3_RESULTS, done, true);
            });
        });
    it("Operations: Test for complex set of undo operations  ",
        (done: any) => {
            logger.debug("Starting simple undo test");
            const testOperation: Operations<any> = new TestOperations4();
            let operationResults: IOperationResult<any> = null;
            testOperation.executeOperation(Operation.NO_PARMS, (output: any, opResults: IOperationResult<any>) => {
                logger.debug("All operations have completed");
                operationResults = opResults;
                checkResults(operationResults, OperationTestConstants.OPER_TEST2_RESULTS, done, true);
            });
        });
});

function checkResults(operationActualResults: IOperationResult<any>,
                      operationExpectedResults: Array<IOperationResult<any>>,
                      done: any, callDone: boolean) {

    if (isNullOrUndefined(operationActualResults)) {
        // The operations failed to return any results
        expect(0).toEqual(1);
    } else {
        let currentOperationResults: IOperationResult<any> = operationActualResults;
        for (const result of operationExpectedResults) {
            logger.debug("Result operation name: " + currentOperationResults.operationName);
            logger.debug("Result expected name: " + result.operationName);

            /**
             * Test all the operation result properties agaisnt the set of expected properties
             */
            logger.debug("Checking operation name match...");
            expect(currentOperationResults.operationName).toEqual(result.operationName);
            logger.debug("Checking operation failed match...");
            expect(currentOperationResults.operationFailed).toEqual(result.operationFailed);
            logger.debug("Checking operation undo possible match...");
            expect(currentOperationResults.operationUndoPossible).toEqual(result.operationUndoPossible);
            logger.debug("Checking operation undo attempted match...");
            expect(currentOperationResults.operationUndoAttempted).toEqual(result.operationUndoAttempted);

            currentOperationResults = currentOperationResults.nextOperationResult;
        }

        if (!isNullOrUndefined(currentOperationResults)) {
            // more results than expected - fail
            expect(0).toEqual(1);
        }

        if (callDone) {
            done();
        }
    }
}
