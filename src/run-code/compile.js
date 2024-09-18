const { spawn } = require("child_process");

async function compileCode(compileCodeCommand, compilationArgs) {
    return new Promise((resolve, reject) => {
        const compileCode = spawn(compileCodeCommand, compilationArgs || []);

        compileCode.stderr.on('data', (error) => {
            reject({
                status: 200,
                output: '',
                error: error.toString(),
            });
        });

        compileCode.on('exit', () => resolve());
    });
}

module.exports = {
    compileCode,
};
