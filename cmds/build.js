const colors = require('colors');
const fs = require('fs');
var ZSchema = require("z-schema");
module.exports = (args) => {
  console.log('⚡ Preparing to build...');
  fs.access('enthuse-config.json', (err) => {
    if (err) {
      console.log("⛔ ERROR: Couldn't find an enthuse-config.json file.".red);
    } else {
      fs.readFile('enthuse-config.json', 'utf8', function(err, data) {
        if (err) {
          console.error("⛔ ERROR: Invalid enthuse-config.json file");
        }
        var validator = new ZSchema();
        var schema = {
          "$ref": "http://json-schema.org/draft-04/schema#"
        };
        var valid = validator.validate(JSON.parse(data), schema);
        if (valid) {
          console.log("✅ Valid enthuse-config.json file");
        } else {
          console.error("⛔ ERROR: Invalid enthuse-config.json file");
        }
      });
    }
  });
}