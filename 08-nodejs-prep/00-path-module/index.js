import {fileURLToPath} from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('filename:', __filename)
console.log('dirname:', __dirname)
// this just creates a path. It doesn't create folders.
//path.join() creates path relatively - meaning anywhere
console.log('created folder', path.join('first folder', 'second folder', 'third folder', 'text.txt'))
//path.resolve() - create path absolutely - meaning inside curr directory
console.log('finding path', path.resolve('text.txt'))

console.log('path normalise', path.normalize('/users//..doc/..dd/shashi.txt'))