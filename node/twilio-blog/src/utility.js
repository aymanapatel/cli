const { promises: { readdir } } = require('fs')

export const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


export const fullPathImport = () => {
   return new URL(import.meta.url).pathname; 
}