const { unlinkSync } = require("fs");
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

module.exports = {
    removeCodeFile,
};
