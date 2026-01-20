import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const datafolder = path.join(__dirname, "data")
if(!fs.existsSync(datafolder)){
    fs.mkdirSync(datafolder)
    console.log('Data folder created')
}

const filepath = path.join(datafolder, 'example.txt')
fs.writeFileSync(filepath, 'This content will be added to the file')
console.log('file created successfully')
fs.appendFileSync(filepath, '\nAdding the second line')
const readContent = fs.readFileSync(filepath, 'utf-8')
console.log(readContent);

const asyncFilePath = path.join(datafolder, 'async-example.txt')
fs.writeFile(asyncFilePath, 'This content is added asynchronously', (err)=> {
    if(err) throw err
    console.log('file created async')

    fs.readFile(asyncFilePath, 'utf-8', (err, data)=> {
        if(err) throw err
        if(data) console.log(data, 'async data loaded')
    })
})
