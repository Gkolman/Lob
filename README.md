# Lob

<h2> Getting started </h2>

Install dependencies via `npm install`

Then start the server via `npm start`

The server should then be available at `http://localhost:3000`

<h2> Using the server </h2>

<h3> Getting an address </h3>
To retrieve a list of addresses based on a substring send a GET request to the addresses endpoint
with the request body content containing a key of `location` and the value as a substring in which you would
like to search for. I.G

```
GET  http://localhost:3000/addresses 
requestBody = {
  "location": "some sub string"
}
```
<h3> Adding an address </h3>

To add an address send a POST request to addresses endpoint with the request body content
containing the fields and values of an address in which you would like to add I.G.
```
  POST  http://localhost:3000/addresses 
  {
    "line1": "Roosevelt Way NE",
    "city": "Seattle",
    "state": "WA",
    "zip": "98115"
  }
```
<h3> Updating an address </h3>

To update an address you must first search for the address to get the associated address id from the response 
body. Then send a patch request to the addresses endpoint with a query parameter containing the id of the address
you wish to update along with the request body content containing the new data you would like to update it with. I.G

```
PATCH  http://localhost:3000/addresses/1
  {
    "line1": "New Data",
    "city": "New Data",
    "state": "New Data",
    "zip": "New Data"
  }
```
<h3> Deleteing an address </h3>

To delete an address, just send a delete request to the addresses endpoint with the query paramaeter containing the
id of the address in which you would like to delete. I.G
```
DELETE  http://localhost:3000/addresses/1
```

