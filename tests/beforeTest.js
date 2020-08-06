/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { execSync } = require('child_process');
const { join } = require('path');
const findChrome = require('carlo/lib/find_chrome');
const detectInstaller = require('detect-installer');

const installPuppeteer = () => {
  // find can use package manger
  const packages = detectInstaller(join(__dirname, '../../'));
  // get installed package manger
  const packageName = packages.find(detectInstaller.hasPackageCommand) || 'npm';
  const command = `${packageName} ${packageName.includes('yarn') ? 'add' : 'i'} puppeteer`;
  execSync(command, {
    stdio: 'inherit',
  });
};

const initPuppeteer = async () => {
  try {
    // eslint-disable-next-line import/no-unresolved
    const findChromePath = await findChrome({});
    const { executablePath } = findChromePath;
    return;
  } catch (error) {
  }

  try {
    require.resolve('puppeteer');
  } catch (error) {
    // need install puppeteer
    await installPuppeteer();
  }
};

initPuppeteer();
