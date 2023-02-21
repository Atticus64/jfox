import { sleep } from "sleep";
import { Confirm, Input, Select } from "cliffy_prompt";
import { TerminalSpinner, SpinnerTypes } from "spinners";
import box from './tools/box.ts';
import { Mascot } from "./tools/mascot.ts";
import { copyTemplate, installDeps } from "./tools/file.ts";

const showNextSteps = async (isDeno: boolean, dir: string, install: boolean, packageManager: string) => {

  if (isDeno) {

    await box('Next steps.', [`cd ${dir}`, `${install ? '' : `${packageManager} install`}`, `deno task dev`]);
    return
  }

  await box('Next steps.', [`cd ${dir}`, `${install ? '' : `${packageManager} install`}`, `${packageManager} run dev`]);

  await sleep(1);
}


async function main() {
  const jay = new Mascot()
  await jay.say(["Hello I'm Jay Fox", "Your new friend to create awesome projects"])

  await sleep(2);
  console.log(' ')
  const dir = await Input.prompt({
    message: "Enter the name of project",
    default: "app"
  });

  const runtime: string = await Select.prompt({
    message: "Pick a color",
    options: [
      { name: "Node", value: "node" },
      { name: "Deno", value: "deno" },
    ],
  });


  const wantTypescript = await Confirm.prompt('Do you like to use Typescript?')

  const framework: string = await Select.prompt({
    message: "Pick a framework",
    search: true,
    options: [
      { name: "Hono", value: "hono" },
      { name: "Express", value: "express" },
    ],
  });

  let packageManager: string;
  if (runtime === "node") {
    packageManager = await await Select.prompt({
      message: "Select a package manager",
      search: true,
      options: [
        { name: "Npm", value: "npm" },
        { name: "Yarn", value: "yarn" },
        { name: "Pnpm", value: "pnpm" },
      ],
    });
  }


  const wantInstall = await Confirm.prompt("Install dependencies?");

  const lang = wantTypescript ? 'ts' : 'js'
  const isDeno = runtime === "deno"
  packageManager ??= "npm"
  await copyTemplate(framework, lang, runtime, dir)

  if (wantInstall) {
    const text = isDeno
      ? 'Caching deps with deno'
      : `Installing via ${packageManager}`
    const terminalSpinner = new TerminalSpinner({
      text, // telling the user what is going on
      color: "red", // see colors in util.ts
      spinner: SpinnerTypes.arc, // check the SpinnerTypes - see import
      indent: 1, // The level of indentation of the spinner in spaces
      cursor: false, // Whether or not to display a cursor when the spinner is active
      writer: Deno.stdout // anything using the Writer interface incl. stdout, stderr, and files
    });
    terminalSpinner.start();
    await installDeps(packageManager, dir, isDeno)
    terminalSpinner.succeed("Action completed");
  }

  await showNextSteps(isDeno, dir, wantInstall, packageManager)

}

await main().catch(console.error);
