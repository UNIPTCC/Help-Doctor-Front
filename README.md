# Help Doctor

# Atenção: UTILIZEM O [yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable) ao invés do npm, isso porque o react faz uns build loco depois que o adiciona umas depedencias da vida

## Requirements
Node >= 9.11.1 segundo localizado no arquivo `.nvmrc`

### Script de auxilio

Conforme foi discutido em uma reunião de grooming do projeto, um dos pontos negativos do React era que ele não possuia um CLI de auxílio para criação de componentes do projeto, assim como o Ember, Angular ou Vue. Então criamos um CLI bem simples para ajudar os desenvolvedores a criar os arquivos do projeto.

O funcionamento é bem simples. O Script tem capacidade de criar os arquivos e dependências para os principais tipos de elementos do sistema ([actions](#actions), [reducers](#reducers), [componentes](#componentes), [services](#services), [páginas](#páginas)).

#### Uso

Para usar o CLI basta executar o comando `new` pelo Yarn ou NPM:

- `yarn new <tipo>`
- `npm run new <tipo>`

Alternativamente é possível executar o CLI direto pela pasta `src/scripts` executando o arquivo `react-cli.js`.

> Ressalvas existem se a interface funciona ou não em todos os SOs e ambientes. Atualmente o MacOS e o Linux estão testados.

`<tipo>` pode ser um da lista:

- action
- component
- page
- reducer
- service

O comando `yarn new help` mostra a mensagem de ajuda (qualquer comando não reconhecido mostrará esta mensagem):

![Ajuda do comando](./docs/react-cli.help.png)

__Exemplo:__ `yarn new component MeuComponente`, `yarn new action MinhaAcao TipoDaAcao`

> Os arquivos devem ser editados após criados, pois são apenas templates de componentes

#### Funcionamento

O script funciona com base no arquivo presente na pasta `./scripts/react-cli.js` que é o responsável por receber os comandos e repassar para os arquivos dentro da pasta `./scripts/commands/`. Estes comandos por sua vez fazem basicamente três coisas:

- Criam os arquivos/pastas aonde os elementos vão ficar (utilizando-se dos templates na pasta `./scripts/commands/templates/`)
- Criam os testes dos mesmos
- Criam quaisquer arquivos de configurações necessários