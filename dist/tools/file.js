import fs from 'node:fs';
import path from 'node:path';
import * as url from 'url';
import { exec } from 'child_process';
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
export const installDeps = async (packageManager, nameProject, isDeno) => {
    if (isDeno) {
        await execShellCommand(`deno cache --reload --import-map ${nameProject}/import_map.json ${nameProject}/src/main.ts`);
        return;
    }
    if (packageManager === "npm") {
        await execShellCommand(`npm i --prefix ${nameProject}`);
    }
    if (packageManager === 'yarn') {
        const absolute = path.resolve(`./${nameProject}`);
        await execShellCommand(`yarn install --cwd ${absolute}`);
    }
    if (packageManager === "pnpm") {
        await execShellCommand(`pnpm i -C ${nameProject}`);
    }
};
