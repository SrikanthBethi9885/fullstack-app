var parser = require('parse-address')
// var parsed = parser.parseLocation('123 Main St, apt #41, Cleveland, OH - 44124');
// console.log(parsed)

function parseAddress(address) {
    const parseaddress = parser.parseLocation(address)
    return parseaddress

}
console.log(parseAddress('123 Main St, apt #41, Cleveland, OH - 44124'))
