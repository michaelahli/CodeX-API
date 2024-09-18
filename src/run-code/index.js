const { commandMap } = require("./instructions");
const { info } = require("./info");
const { validateInput } = require("./validate");
const { installDependencies } = require("./dependencies");

const { createCodeFile } = require("../file-system/createCodeFile");
const { executeCodeWithTimeout } = require("./execute");

async function runCode({ language = "", code = "", input = "", packages = "" }) {
    validateInput(language, code);

    const { jobID } = await createCodeFile(language, code, packages);
    const { compileCodeCommand, compilationArgs, executeCodeCommand, executionArgs, depInstallCmd, depFile, outputExt } = commandMap(jobID, language);

    if (packages && depInstallCmd) {
        await installDependencies(depInstallCmd);
    }

    if (compileCodeCommand) {
        await compileCode(compileCodeCommand, compilationArgs);
    }

    const result = await executeCodeWithTimeout({ executeCodeCommand, executionArgs, input, jobID, language, outputExt, depFile });

    return {
        ...result,
        language,
        info: await info(language)
    };
}

module.exports = { runCode };