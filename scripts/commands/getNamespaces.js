const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const readdirAsync = promisify(fs.readdir)

async function getTranslationNamespaces (baseFolder) {
  const [ pages, components ] = await Promise.all([ readdirAsync(path.join(baseFolder, 'src/Pages')), readdirAsync(path.join(baseFolder, 'src/Components')) ])
  const namespaces = [...pages, ...components, 'default']
  let stringNamespace = '['
  for (let namespace of namespaces) {
    if (namespace === '.DS_Store') continue
    stringNamespace += `'${namespace}', `
  }
  return stringNamespace.slice(0, -2).concat(']')
}

module.exports = getTranslationNamespaces
