const RdfXmlParser = require("rdfxml-streaming-parser").RdfXmlParser;
const myParser = new RdfXmlParser();
const fs = require("fs");

const myTextStream = fs.createReadStream('./CSO.3.3.owl');

myParser.import(myTextStream)
  .on('data', console.log)
  .on('error', console.error)
  .on('end', () => console.log('All triples were parsed!'));