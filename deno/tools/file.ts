import { copy } from "std/fs/mod.ts";
import { sleep } from "sleep";

export function copyTemplate(framework: string, lang: string, runtime: string, folderProject: string) {

  copy(`./templates/${framework}-${lang}-${runtime}`, `${folderProject}`)

}

export const installDeps = async (packageManager: string, nameProject: string, isDeno: boolean) => {
  if (isDeno) {
    await sleep(2)
    const deno = Deno.run({
      cmd: ["deno", "cache", "--reload", "--import-map", `./${nameProject}/import_map.json`, `./${nameProject}/src/main.ts`],
      stdout: "null",
      stderr: "null"
    })
    const status = await deno.status();
    return
  }

  if (packageManager === "npm") {
    const npm = Deno.run({
      cmd: ["npm", "install", "--prefix", `${nameProject}`],
      stdout: "null",
      stderr: "null"
    })
    const status = await npm.status();
  }

  if (packageManager === 'yarn') {
    // const pathObj = new URL(import.meta.url)
    // const absolute = `${pathObj.pathname}/${nameProject}`
    const yarn = Deno.run({
      cmd: ['yarn', 'install', '--cwd', `${nameProject}`],
      stdout: "null",
      stderr: "null"
    })
    const status = await yarn.status();
  }

  if (packageManager === "pnpm") {
    const pnpm = Deno.run({
      cmd: ['pnpm', 'install', '-C', `${nameProject}`],
      stdout: "null",
      stderr: "null"
    })
    const status = await pnpm.status();
  }

}
