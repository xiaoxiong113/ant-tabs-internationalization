/*
 * @description: 校验 GIT 提交信息是否符合 Angular 规范
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-04-16 14:47:31
 */
const chalk = require('chalk');

chalk.enabled = true;
chalk.level = 1;

const msg = require('fs').readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf-8').trim();
const commitReg = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore|types)(\(.+\))?: .{1,50}/;

if (!commitReg.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`commit message 格式无效`)}\n\n` +
      chalk.red(`  需提交符合规范的 message 以便生成 CHANGELOG.md. Examples:\n\n`) +
      `    ${chalk.green(`feat(app): add pages option`)}\n` +
      `    ${chalk.green(`fix(app): fix some bugs`)}\n\n` +
      chalk.red(`  详情请参考 ./README.md.\n`),
  );
  process.exit(1);
}
