import fs from 'fs'
import path from 'path'
import * as url from 'url';
import { exec } from 'child_process';
import { PackageManager } from '../entities/package.js';

export function copyTemplate(framework: string, lang: string, runtime: string, folderProject: string) {

  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const source = path.join(__dirname, `../../templates/${framework}-${lang}-${runtime}`)
  fs.cpSync(source, folderProject, { recursive: true })

}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
export function execShellCommand(cmd: string) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

export const installDeps = async (packageManager: PackageManager, nameProject: string, isDeno: boolean) => {
  if (isDeno) {
    await execShellCommand(`deno cache --reload --import-map ${nameProject}/import_map.json ${nameProject}/src/main.ts`)
    return
  }

  if (packageManager === "npm") {
    await execShellCommand(`npm i --prefix ${nameProject}`)
  }

  if (packageManager === 'yarn') {
    const absolute = path.resolve(`./${nameProject}`);
    await execShellCommand(`yarn install --cwd ${absolute}`)
  }

  if (packageManager === "pnpm") {
    await execShellCommand(`pnpm i -C ${nameProject}`)
  }
}
