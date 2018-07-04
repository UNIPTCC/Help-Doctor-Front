#!/usr/bin/env node
const chalk = require('chalk')
const args = process.argv.slice(2)

function displayHelp () {
  console.log(chalk.gray.bold('Utilitário de criação de arquivos SquidHub\n'))
  console.log(chalk.cyan('Comandos:'))
  console.log(' help            Mostra essa mensagem de ajuda')
  console.log(' action          Cria um novo objeto do tipo ação')
  console.log(`   ${chalk.cyan('Parâmetros:')}`)
  console.log(`     ${chalk.yellow('- actionName:    Nome da ação')}`)
  console.log(`     ${chalk.yellow('- actionType:    Tipo da ação')}`)
  console.log(' component          Cria um novo objeto do tipo componente')
  console.log(`   ${chalk.cyan('Parâmetros:')}`)
  console.log(`     ${chalk.yellow('- componentName:    Nome do componente')}`)
  console.log(' page          Cria um novo objeto do tipo página')
  console.log(`   ${chalk.cyan('Parâmetros:')}`)
  console.log(`     ${chalk.yellow('- pageName:    Nome da página')}`)
  console.log(' reducer          Cria um novo objeto do tipo reducer')
  console.log(`   ${chalk.cyan('Parâmetros:')}`)
  console.log(`     ${chalk.yellow('- reducerName:    Nome do reducer')}`)
  console.log(' service          Cria um novo objeto do tipo serviço')
  console.log(`   ${chalk.cyan('Parâmetros:')}`)
  console.log(`     ${chalk.yellow('- serviceName:    Nome do serviço')}`)
  console.log(chalk.cyan('\nUso:'))
  console.log(' react-cli action nome tipo            Cria uma ação chamada "nome" com o tipo "tipo", junto com seus testes')
  console.log(' react-cli component nome              Cria um componente chamado "nome", junto com seus testes')
  console.log(' react-cli page nome                   Cria uma página chamada "nome", junto com seus testes')
  console.log(' react-cli reducer nome                Cria um reducer chamado "nome", junto com seus testes')
  console.log(' react-cli service nome                Cria um serviço chamado "nome", junto com seus testes')
  console.log(chalk.gray(`\n--------\n`))
  console.log(chalk.red('Todos os arquivos vem com um boilerplate básico, necessitando de edições posteriores'))
}

console.log(chalk.yellow(`-- React Cli 1.0.0 --`))

if (args[0] === 'help') {
  displayHelp()
} else if (['action', 'component', 'page', 'reducer', 'service', 'stylesheet'].indexOf(args[0]) !== -1) {
  console.log(chalk.magenta(`# Criando novo elemento do tipo '${args[0]}'`))
  const commandType = args.shift()
  const command = `./commands/new-${commandType}.js`

  require(command)
    .createNew(args)
    .then((result) => {
      console.log(chalk.green(`-> ${commandType} criado com o nome de "${chalk.cyan(result.name)}" na pasta ${chalk.cyan.underline(result.path)}`))
    })
    .catch((err) => {
      console.log(chalk.red(`## Erro ao criar ${commandType}: ${err.message}`))
    })
} else {
  displayHelp()
}
