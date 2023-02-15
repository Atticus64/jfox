import {
  text,
  select,
  confirm,
  intro,
  outro,
  cancel,
  spinner,
  isCancel,
  multiselect,
  note,
} from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from "node:timers/promises";
import { copyTemplate, installDeps } from './tools/file.js';
import { PackageManager } from './entities/package';

const showNextSteps = async (isDeno: boolean, dir: string, install: boolean, packageManager: PackageManager) => {

  if (isDeno) {
    let nextSteps = `cd ${dir}        \n${install ? '' : `${packageManager} install\n`}deno task dev`;

    note(nextSteps, 'Next steps.');
    return
  }

  let nextSteps = `cd ${dir}        \n${install ? '' : `${packageManager} install\n`}${packageManager} run dev`;
  note(nextSteps, 'Next steps.');

  await setTimeout(1000);
}


async function main() {
  console.clear();

  await setTimeout(700);
  intro(`${color.bgCyan(color.black(" create-app "))}`);

  const dir = await text({
    message: "Where should we create your project?",
    placeholder: "awesome-project",
  });

  if (isCancel(dir)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const projectType = await select({
    message: `Pick a ${color.yellow('Js')} Runtime.`,
    options: [
      { value: "node", label: "Node" },
      { value: "deno", label: "Deno" },
    ],
  });

  if (isCancel(projectType)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const haveTypescript = await confirm({
    message: 'Do you like to use Typescript?',
    initialValue: true
  })

  const framework = await select({
    message: 'Select a backend framework',
    options: [
      { value: "hono", label: "Hono", hint: "recommended" },
      { value: "express", label: "Express" },
    ],
  });

  let packageManager;
  if (projectType === "node") {
    packageManager = await select({
      message: "Pick a Package Manager.",
      options: [
        { value: "npm", label: "Npm" },
        { value: "yarn", label: "Yarn" },
        { value: "pnpm", label: "Pnpm" },
      ],
    });
  }

  if (isCancel(packageManager)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  if (isCancel(haveTypescript)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const install = await confirm({
    message: "Install dependencies?",
    initialValue: false
  });

  if (isCancel(install)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  if (isCancel(framework)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const lang = haveTypescript ? 'ts' : 'js'
  const isDeno = projectType === "deno"
  packageManager = packageManager ?? "npm"
  copyTemplate(framework, lang, projectType, dir)

  if (install) {
    const s = spinner();
    if (isDeno) {
      s.start(`Caching deps with deno`);
    } else {
      s.start(`Installing via ${packageManager}`);
    }
    await installDeps(packageManager, dir, isDeno)
    s.stop(`Succesfully installed`);
  }

  await showNextSteps(isDeno, dir, install, packageManager)

  outro(`Problems? ${color.underline(color.cyan('https://example.com/issues'))}`);
}

main().catch(console.error);