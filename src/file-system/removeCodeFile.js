const { unlinkSync, rmSync } = require("fs");
const { join } = require("path");

const removeCodeFile = async (uuid, lang, outputExt, depFile) => {
    const codeFile = join(process.cwd(), `codes/${uuid}.${lang}`);
    const outputFile = join(process.cwd(), `outputs/${uuid}.${outputExt}`);

    await unlinkSync(codeFile);

    if (outputExt) {
        await unlinkSync(outputFile);
        await unlinkSync(depFile);
    }
};

const removeVirtualEnv = async (uuid) => {
    const venvPath = join(process.cwd(), `venv_${uuid}`);

    rmSync(venvPath, { recursive: true, force: true });
};

module.exports = {
    removeCodeFile,
    removeVirtualEnv
};
