import http from 'http'

const server = http.createServer((req,res)=> {
    const url = req.url
    if(url === '/'){
        res.writeHead(200, {'content-type': 'text/plain'})
        res.end('Home Page')
    } else if(url === '/about'){
         res.writeHead(200, {'content-type': 'text/plain'})
        res.end('About Page')
    } else {
        res.writeHead(404, {'content-type': 'text/plain'})
        res.end('OOPS... Page not found')
    }
})


server.listen(3000, ()=> {
    console.log('server listening on port 3000')
})