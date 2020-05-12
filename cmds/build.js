const ora = require('ora');
module.exports = (args) => {
  const spinner = ora().start();
  console.log('⚡ Preparing to build...');
  spinner.stop();
  console.error("🛠 Looks like this command is still under construction!");
}