const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { promisify } = require('util')
const getTranslationNamespaces = require('./getNamespaces')

const copyFileAsync = promisify(fs.copyFile)
const readdirAsync = promisify(fs.readdir)
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const mkdirAsync = promisify(fs.mkdir)
const baseFolder = path.dirname(path.dirname(__dirname))

exports.createNew = function (args) {
  return new Promise(async (resolve, reject) => {
    try {
      let [ pageName ] = args
      const pageFolder = path.join(baseFolder, './src/Pages/', pageName)
      const pageFile = path.join(pageFolder, `${pageName}.js`)
      const pageConfFile = path.join(pageFolder, `${pageName}.conf.js`)
      // const pageTestFile = path.join(pageFolder, `${pageName}.test.js`)
      const translationDir = path.join(baseFolder, 'public/locales')
      // const i18nServiceFile = path.join(baseFolder, 'src/Services/i18n.js')

      console.log(chalk.cyan(` Criando página ${pageName}`))

      await mkdirAsync(pageFolder) // Cria a pasta do pagee

      await Promise.all([
        // copyFileAsync(path.join(__dirname, '/templates/pageTest.test.js'), pageTestFile), // Move os arquivos de teste para dentro
        copyFileAsync(path.join(__dirname, '/templates/page.js'), pageFile), // Move o arquivo base do pagee pra dentro
        copyFileAsync(path.join(__dirname, '/templates/page.conf.js'), pageConfFile), // Move o arquivo base do page conf pra dentro
      ])
      let fileContents
      // Atualiza o nome da página no arquivo de testes
      // fileContents = (await readFileAsync(pageTestFile)).toString()
      // fileContents = fileContents.replace(/@pageName/g, pageName)
      // writeFileAsync(pageTestFile, fileContents)

      // Atualiza o nome da página dentro do arquivo da página
      fileContents = (await readFileAsync(pageFile)).toString()
      fileContents = fileContents.replace(/@pageName/g, pageName)
      writeFileAsync(pageFile, fileContents)

      // Atualiza o nome da página no arquivo de configuração da página
      fileContents = (await readFileAsync(pageConfFile)).toString()
      fileContents = fileContents.replace(/@pageName/g, pageName)
      writeFileAsync(pageConfFile, fileContents)

      // Atualiza a lista de namespaces do i18n

      console.log(chalk.bold.yellow(`    >> Arquivos base criados, por favor altere a estrutura dos mesmos:`))
      console.log(chalk.bold.red(`      -> ${chalk.magenta(pageFile)}`))
      console.log(chalk.bold.red(`      -> ${chalk.magenta(pageConfFile)}`))

      // console.log(chalk.bold.yellow(`    >> Não esqueça de alterar o teste:`))
      // console.log(chalk.bold.red(`      -> ${chalk.magenta(pageTestFile)}`))

      const returnObject = { name: pageName, path: path.join(pageFolder, pageName) }
      resolve(returnObject)
    } catch (error) {
      reject(error)
    }
  })
}
