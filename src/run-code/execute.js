const { spawn } = require("child_process");

const { removeCodeFile } = require("../file-system/removeCodeFile");

async function executeCodeWithTimeout({ executeCodeCommand, executionArgs, input, jobID, language, outputExt, depFile }) {
    const timeout = 30;

    return new Promise((resolve, reject) => {
        const executeCode = spawn(executeCodeCommand, executionArgs || []);
        let output = "", error = "";

        const timer = setTimeout(async () => {
            executeCode.kill("SIGHUP");

            await removeCodeFile(jobID, language, outputExt, depFile);

            reject({
                status: 408,
                error: `Timed Out. Code took too long to execute, over ${timeout} seconds.`
            });
        }, timeout * 1000);

        if (input !== "") {
            input.split('\n').forEach(line => {
                executeCode.stdin.write(`${line}\n`);
            });
            executeCode.stdin.end();
        }

        executeCode.stdout.on('data', (data) => output += data.toString());
        executeCode.stderr.on('data', (data) => error += data.toString());

        executeCode.on('exit', () => {
            clearTimeout(timer);
            resolve({ output, error });
        });
    });
}

module.exports = { executeCodeWithTimeout };
