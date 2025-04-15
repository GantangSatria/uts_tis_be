import express from 'express'
const expressServer = express()
const soap = require('soap')
const port = 3000

expressServer.get('/', (req, res) => {
 res.send('Hello World!')
})

expressServer.listen(port, () => {
    var soapServer = soap.listen(expressServer, '/hello', service, wsdl);
    console.log(`Server running at http://localhost:${port}`)
})
