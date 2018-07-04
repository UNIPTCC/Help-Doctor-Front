const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { promisify } = require('util')
const actionFile = path.join(path.dirname(path.dirname(__dirname)), './src/Actions/actions.js')
const actionTypeFile = path.join(path.dirname(path.dirname(__dirname)), './src/Actions/actionTypes.js')
const actionTestFolder = path.join(path.dirname(path.dirname(__dirname)), './src/Actions/tests')

const appendFileAsync = promisify(fs.appendFile)
const copyFileAsync = promisify(fs.copyFile)
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

exports.createNew = function (args) {
  return new Promise(async (resolve, reject) => {
    try {
      let [actionName, actionType] = args
      const returnObject = { name: actionName, path: actionFile }
      let actionTestFile = path.join(actionTestFolder, `${actionName}.action.test.js`)

      actionType = actionType.toUpperCase()

      console.log(chalk.cyan(` Criando ação ${actionName} do tipo ${actionType}`))

      await Promise.all([
        appendFileAsync(actionFile, `export const ${actionName} = () => ({ type: types.${actionType} })\n`),
        appendFileAsync(actionTypeFile, `export const ${actionType} = '${actionType}'\n`),
        copyFileAsync(path.join(__dirname, '/templates/actionTest.action.test.js'), actionTestFile)
      ])

      let fileContents = (await readFileAsync(actionTestFile)).toString()
      fileContents = fileContents.replace(/@actionName/g, actionName).replace(/@actionType/g, actionType)
      writeFileAsync(actionTestFile, fileContents)

      console.log(chalk.bold.yellow(`    >> Arquivos base criados, por favor altere a estrutura dos mesmos:`))
      console.log(chalk.bold.red(`      -> ${chalk.magenta(actionFile)}`))
      console.log(chalk.bold.red(`      -> ${chalk.magenta(actionTypeFile)}`))

      console.log(chalk.bold.yellow(`    >> Não esqueça de alterar o teste:`))
      console.log(chalk.bold.red(`      -> ${chalk.magenta(actionTestFile)}`))

      resolve(returnObject)
    } catch (error) {
      reject(error)
    }
  })
}
