const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { promisify } = require('util')

const copyFileAsync = promisify(fs.copyFile)
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

exports.createNew = function (args) {
  return new Promise(async (resolve, reject) => {
    try {
      let [ serviceName ] = args
      const serviceFolder = path.join(path.dirname(path.dirname(__dirname)), './src/Services')
      const serviceFile = path.join(serviceFolder, `${serviceName}.js`)
      const serviceTestFile = path.join(serviceFolder, 'tests', `${serviceName}.test.js`)

      console.log(chalk.cyan(` Criando servicee ${serviceName}`))

      await Promise.all([
        copyFileAsync(path.join(__dirname, '/templates/serviceTest.test.js'), serviceTestFile), // Move os arquivos de teste para dentro
        copyFileAsync(path.join(__dirname, '/templates/service.js'), serviceFile) // Move o arquivo base do service pra dentro
      ])

      let fileContents = (await readFileAsync(serviceTestFile)).toString()
      fileContents = fileContents.replace(/@serviceName/g, serviceName)
      writeFileAsync(serviceTestFile, fileContents)

      fileContents = (await readFileAsync(serviceFile)).toString()
      fileContents = fileContents.replace(/@serviceName/g, serviceName)
      writeFileAsync(serviceFile, fileContents)

      console.log(chalk.bold.yellow(`    >> Arquivos base criados, por favor altere a estrutura dos mesmos:`))
      console.log(chalk.bold.red(`      -> ${chalk.magenta(serviceFile)}`))

      console.log(chalk.bold.yellow(`    >> Não esqueça de alterar o teste:`))
      console.log(chalk.bold.red(`      -> ${chalk.magenta(serviceTestFile)}`))

      const returnObject = { name: serviceName, path: path.join(serviceFolder, serviceName) }
      resolve(returnObject)
    } catch (error) {
      reject(error)
    }
  })
}
