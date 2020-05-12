const colors = require('colors');
const fs = require('fs');
var ZSchema = require("z-schema");
module.exports = (args) => {
  console.log('⚡ Preparing to build...');
  fs.access('enthuse-config.json', (err) => {
    if (err) {
      console.error();
      ("⛔ ERROR: Couldn't find an enthuse-config.json file.".red);
    } else {
      fs.readFile('enthuse-config.json', 'utf8', function(err, data) {
        if (err) {
          console.error("⛔ ERROR: Invalid enthuse-config.json file".red);
        }
        var validator = new ZSchema();
        var schema = {
          "$ref": "http://json-schema.org/draft-04/schema#"
        };
        var valid = validator.validate(JSON.parse(data), schema);
        if (valid) {
          console.log("✔ Valid enthuse-config.json file");
          var config = JSON.parse(data);
          var css = './css';
          if (!fs.existsSync(css)) {
            fs.mkdirSync(css);
          }
          console.log("✔ Verified that the ./css folder exists");
          var js = './js';
          if (!fs.existsSync(js)) {
            fs.mkdirSync(js);
          }
          console.log("✔ Verified that the ./js folder exists");
          var img = './img';
          if (!fs.existsSync(img)) {
            fs.mkdirSync(img);
          }
          console.log("✔ Verified that the ./img folder exists");
          let htmlToWrite =
            `
            <!DOCTYPE html>
            <html lang="en" dir="ltr">
            <head>
              <meta name="description" content="` +
            config["platform-description"] +
            `">
              <meta charset="utf-8">
              <title>` +
            config["platform-name"] +
            `</title>
              <link rel="stylesheet" href="css/home-layout.css">
              <link rel="stylesheet" href="/css/custom.css">
            </head>
            <body>
              <div class="enthuse-navbar">
                <img class="enthuse-logo">
              </div>
              <div class="enthuse-main">
              </div>
              <script src="js/home.js" charset="utf-8"></script>
            </body>
            </html>
            `;
          console.log("✔ Successfully generated HTML syntax")
          fs.writeFile(config["platform-name"].toLowerCase() + ".html", htmlToWrite, function(err) {
            if (err) return console.log(err);
            console.log("✔ Successfully created HTML document as " + config["platform-name"].toLowerCase() + ".html");
          });
        } else {
          console.error("⛔ ERROR: Invalid enthuse-config.json file");
        }
      });
    }
  });
}