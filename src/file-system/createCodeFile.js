const { v4: getUUID } = require("uuid");
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { join } = require("path");

if (!existsSync(join(process.cwd(), "codes"))) mkdirSync(join(process.cwd(), "codes"));
if (!existsSync(join(process.cwd(), "outputs"))) mkdirSync(join(process.cwd(), "outputs"));

const createCodeFile = async (language, code, packages) => {
    const jobID = getUUID();
    const codeFileName = `${jobID}.${language}`;
    const codeFilePath = join(process.cwd(), `codes/${codeFileName}`);

    await writeFileSync(codeFilePath, code?.toString());

    if (packages) {
        let depFileName;
        switch (language) {
            case 'py':
                depFileName = 'requirements.txt';
                break;
            case 'js':
                depFileName = 'package.json';
                break;
            case 'go':
                depFileName = 'go.mod';
                break;
            // Add other languages here as needed
        }

        if (depFileName) {
            const depFilePath = join(process.cwd(), `codes/${depFileName}`);
            await writeFileSync(depFilePath, packages?.toString());
        }
    }

    return {
        fileName: codeFileName,
        filePath: codeFilePath,
        jobID
    };
};

module.exports = {
    createCodeFile,
};
