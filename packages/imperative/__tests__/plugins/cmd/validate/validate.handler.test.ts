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

import Mock = jest.Mock;

jest.mock("../../../../../cmd/src/response/CommandResponse");
jest.mock("../../../../../cmd/src/response/HandlerResponse");

import {CommandResponse, IHandlerParameters} from "../../../../../cmd";
import {ImperativeConfig} from "../../../../src/ImperativeConfig";
import {IssueSeverity, PluginIssues} from "../../../../src/plugins/utilities/PluginIssues";
import {resolve} from "path";
import {TextUtils} from "../../../../../utilities";
import ValidateHandler from "../../../../src/plugins/cmd/validate/validate.handler";

describe("Plugin validate command handler", () => {

  const pluginName = "sample-plugin";
  const pluginIssues: PluginIssues = PluginIssues.instance;

  /* Put a base CLI config into ImperativeConfig. It is required by infrastructure
   * that is called underneath the functions that we want to test.
   */
  const impCfg: ImperativeConfig = ImperativeConfig.instance;
  impCfg.loadedConfig = require("../../baseCliConfig.testData");
  impCfg.callerLocation = resolve("../../../../../../imperative-sample/lib/index.js");

  beforeEach(() => {
    // Mocks need cleared after every test for clean test runs
    jest.resetAllMocks();

    pluginIssues.getInstalledPlugins = jest.fn().mockReturnValue({
      "imperative-sample-plugin": {
        package: "C:\\Some\\Path\\To\\imperative-plugins",
        registry: "http://imperative-npm-registry:4873/",
        version: "1.0.1"
      }
    });
  });

  /**
   * Create object to be passed to process function
   *
   * @returns {IHandlerParameters}
   */
  const getIHandlerParametersObject = (): IHandlerParameters => {
    const x: any = {
      response: new (CommandResponse as any)(),
      arguments: {
        plugin: null
      }
    };
    return x as IHandlerParameters;
  };

  describe("process function", () => {
    const params = getIHandlerParametersObject();
    const valHandler = new ValidateHandler() as any;
    const mockDisplayPluginIssues = jest.fn();
    const orgDisplayPluginIssues = valHandler.displayPluginIssues;

    beforeEach(() => {
      valHandler.displayPluginIssues = mockDisplayPluginIssues;
    });

    afterEach(() => {
      valHandler.displayPluginIssues = orgDisplayPluginIssues;
    });


    it("should display proper message when no plugin is installed", async () => {
      pluginIssues.getInstalledPlugins = jest.fn().mockReturnValue({});

      // plugin name is null
      params.arguments.plugin = null;
      await valHandler.process(params as IHandlerParameters);
      expect(params.response.console.log).toHaveBeenCalledWith("No plugins have been installed into your CLI application.");

      // plugin name is empty
      params.arguments.plugin = "";
      await valHandler.process(params as IHandlerParameters);
      expect(params.response.console.log).toHaveBeenCalledWith("No plugins have been installed into your CLI application.");
    });

    it("should validate all installed plugin when no plugin is defined", async () => {
      params.arguments.plugin = null;
      let testPlugin: string = null;

      await valHandler.process(params as IHandlerParameters);

      for (testPlugin in pluginIssues.getInstalledPlugins()){
        if (pluginIssues.getInstalledPlugins().hasOwnProperty(testPlugin)){
          expect(mockDisplayPluginIssues).toBeCalledWith(testPlugin, params.response);
        }
      }
    });

    it("should validate with non-existent plugin name", async () => {
      params.arguments.plugin = ["NonExistentPluginName"];

      await valHandler.process(params as IHandlerParameters);
      expect(params.response.console.log).toHaveBeenCalledWith(
        TextUtils.chalk.red(
        "The specified plugin 'NonExistentPluginName' has not been installed into your CLI application."
      ));
    });

    it("should validate the specific plugin requested by user", async () => {
      params.arguments.plugin = ["imperative-sample-plugin"];

      await valHandler.process(params as IHandlerParameters);
      expect(mockDisplayPluginIssues).toHaveBeenCalledWith(params.arguments.plugin, params.response);
    });
  });

  describe("displayPluginIssues function", () => {
    const validateHandler = new ValidateHandler() as any;
    const params = getIHandlerParametersObject();
    const testPlugin = "test Plugin";

    beforeEach(() => {
      pluginIssues.removeIssuesForPlugin(testPlugin);
    });

    it("should call CommandResponse.console.log with proper parameter", () => {
      const expectedMsg = `\nValidation results for plugin '${testPlugin}':\nSuccessfully validated.`;

      validateHandler.displayPluginIssues(testPlugin, params.response);

      expect(params.response.console.log).toHaveBeenCalledWith(expectedMsg);
    });

    it("should call CommandResponse.console.log with proper warning parameter", () => {
      const testErrorText = "test warning text";

      pluginIssues.recordIssue(testPlugin, IssueSeverity.WARNING, testErrorText);
      validateHandler.displayPluginIssues(testPlugin, params.response);

      expect(params.response.console.log).toHaveBeenCalled();
      const errorMsg = (params.response.console.log as Mock).mock.calls[0][0];
      expect(errorMsg).toContain(testPlugin);
      expect(errorMsg).toContain(`${IssueSeverity.WARNING}: ${testErrorText}`);
    });

    it("should call CommandResponse.console.log with proper error parameter", () => {
      const testErrorText = "test error text";

      pluginIssues.recordIssue(testPlugin, IssueSeverity.ERROR, testErrorText);
      validateHandler.displayPluginIssues(testPlugin, params.response);

      expect(params.response.console.log).toHaveBeenCalled();
      const errorMsg = (params.response.console.log as Mock).mock.calls[0][0];
      expect(errorMsg).toContain(testPlugin);
      expect(errorMsg).toContain(`${IssueSeverity.ERROR}: ${testErrorText}`);
      expect(errorMsg).toContain("No commands from this plugin will be available for future commands");
    });
  });

}); // end Plugin validate command handler

