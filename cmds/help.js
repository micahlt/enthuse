const menus = {
  main: `
    enthuse [command] <options>

    build .............. build an Enthusia site
    version ............ show package version
    help ............... show help menu for a command`,

  build: `
    enthuse build <options>

    --home, -h ..... the file to use as the home page`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help' ?
    args._[1] :
    args._[0]

  console.log(menus[subCmd] || menus.main)
}