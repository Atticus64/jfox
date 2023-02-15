import fs from 'node:fs';
import path from 'node:path';
import * as url from 'url';
import { exec } from 'child_process';
import { PackageManager } from '../entities/package.js';
export function copyTemplate(framework, lang, runtime, folderProject) {
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const source = path.join(__dirname, `../../templates/${framework}-${lang}-${runtime}`);
    fs.cpSync(source, folderProject, { recursive: true });
}
/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
export function execShellCommand(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}
export const installDeps = async (packageManager, nameProject) => {
    if (packageManager === PackageManager.npm) {
        await execShellCommand(`npm i --prefix ${nameProject}`);
    }
    if (packageManager === PackageManager.yarn) {
        await execShellCommand(`yarn --cwd ${nameProject}`);
    }
    if (packageManager === PackageManager.pnpm) {
        await execShellCommand(`pnpm i -C ${nameProject}`);
    }
};
