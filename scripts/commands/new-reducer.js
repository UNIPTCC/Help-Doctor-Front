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
      let [ reducerName ] = args
      const reducerFolder = path.join(path.dirname(path.dirname(__dirname)), './src/Reducers')
      const reducerFile = path.join(reducerFolder, 'Handlers', `${reducerName}.js`)
      const reducerTestFile = path.join(reducerFolder, 'tests', `${reducerName}.test.js`)
      const reducerIndexFile = path.join(reducerFolder, `index.js`)

      console.log(chalk.cyan(` Criando reducer ${reducerName}`))

      await Promise.all([
        copyFileAsync(path.join(__dirname, '/templates/reducerTest.test.js'), reducerTestFile), // Move os arquivos de teste para dentro
        copyFileAsync(path.join(__dirname, '/templates/reducerIndex.js'), reducerIndexFile), // Move os arquivos de index
        copyFileAsync(path.join(__dirname, '/templates/reducer.js'), reducerFile) // Move o arquivo base do reducer pra dentro
      ]) // Copia os arquivos

      // Arquivo de testes
      let fileContents = (await readFileAsync(reducerTestFile)).toString() // Obtém o conteúdo do arquivo
      fileContents = fileContents.replace(/@reducerName/g, reducerName)
      writeFileAsync(reducerTestFile, fileContents)

      // Arquivo do reducer
      fileContents = (await readFileAsync(reducerFile)).toString() // Obtém o conteúdo do arquivo
      fileContents = fileContents.replace(/@reducerName/g, reducerName)
      writeFileAsync(reducerFile, fileContents)

      // index do reducer, substituímos este arquivo para poder adicionar ao reducer combinado
      fileContents = (await readFileAsync(reducerIndexFile)).toString() // Obtém o conteúdo do arquivo

      let allReducers = [] // Lista de reducers
      const allImports = fs.readdirSync(path.join(reducerFolder, 'Handlers'))
            .map((reducer) => {
              const reducerName = reducer.split('.').shift()
              allReducers.push(reducerName)
              return `import ${reducerName} from './Handlers/${reducerName}'`
            })
            .join('\n')

      fileContents = fileContents.replace(/@reducerImports/g, allImports).replace(/@reducerList/g, allReducers.join(',\n  '))
      writeFileAsync(reducerIndexFile, fileContents)

      // Saída do console
      console.log(chalk.bold.yellow(`    >> Arquivos base criados, por favor altere a estrutura dos mesmos:`))
      console.log(chalk.bold.red(`      -> ${chalk.magenta(reducerFile)}`))

      console.log(chalk.bold.yellow(`    >> Não esqueça de alterar o teste:`))
      console.log(chalk.bold.red(`      -> ${chalk.magenta(reducerTestFile)}`))

      const returnObject = { name: reducerName, path: path.join(reducerFolder, reducerName) }
      resolve(returnObject)
    } catch (error) {
      reject(error)
    }
  })
}
