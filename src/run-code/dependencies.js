const { spawn } = require("child_process");

async function installDependencies(depInstallCmd) {
    return new Promise((resolve, reject) => {
        const installDeps = spawn(depInstallCmd[0], depInstallCmd.slice(1), { shell: true });

        installDeps.stderr.on('data', (error) => {
            reject({
                status: 500,
                error: error.toString(),
                message: 'Dependency installation failed.'
            });
        });

        installDeps.on('exit', () => resolve());
    });
}

module.exports = {
    installDependencies,
};
