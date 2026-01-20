import fs from 'fs'

function greet(name, callbackfn){
    console.log(`Hello ${name}`);
    callbackfn()
}

function thankPerson(){
    console.log('Thank you')
}

greet('Shashi', thankPerson)

//callback hell
setTimeout(()=> {
    setTimeout(()=> {
        setTimeout(()=> {
            
        })
    })
}, 2000)
