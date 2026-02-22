const delayFn = (timer)=> {
    return new Promise((resolve)=> setTimeout(resolve, timer))
}

console.log('Promise lecture starts')
delayFn(2000).then(()=> {
    console.log('after 2 seconds promise resolved');
})
console.log('end')

const divideFn = (num1, num2)=> {
    return new Promise((resolve, reject)=> {
        if(num2 === 0){
            reject("cannot delete by 0")
        } else {
            resolve(num1/num2)
        }
    })
}
divideFn(10, 5).then(result => console.log(result)).catch((err)=> console.log(err))