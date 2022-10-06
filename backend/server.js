const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const {addressSet} = require('./utils')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


app.get('/addresses', (req, res) => {
  const location = req.body.location
  res.send(addressSet.getAddress(location))
})
app.post('/addresses', (req, res) => {
  const address = req.body
  addressSet.addAddress(address)
  res.end()
});

app.patch('/addresses/:addressId',(req, res) => {
  const addressId = parseInt(req.params.addressId)
  const updates = req.body
  addressSet.editAddress(addressId, updates)
  res.end()
});

app.delete('/addresses/:addressId', (req, res) =>  {
  const addressId = parseInt(req.params.addressId)
  addressSet.deleteAddress(addressId)
  res.end()
});

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})