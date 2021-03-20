/**
 * @author Shyam Hajare <hajareshyam@gmail.com>
 */

/**
 * create function is used to create pdf from handlebar templates.
 * @param  {document, options}
 * @return {callback}
 */

var Handlebars = require("handlebars");
var pdf = require("html-pdf");

Handlebars.registerHelper("inc", (x) => {
  return parseInt(x) + 1
})

var registerHelper = function (name, callback) {
  Handlebars.registerHelper(name, callback)
}

var create = function (document, options) {
  return new Promise((resolve, reject) => {
    if (!document || !document.html || !document.data) {
      reject(new Error("Some, or all, options are missing."));
    }
    // Compiles a template
    var html = Handlebars.compile(document.html)(document.data);
    var pdfPromise = pdf.create(html, options);

    // Create PDF from html template generated by handlebars
    // Output will be PDF file

    switch (document.type) {
      case "buffer":
        pdfPromise.toBuffer((err, res) => {
          if (!err) resolve(res);
          else reject(err);
        });
        break;

      case "stream":
        pdfPromise.toStream((err, res) => {
          if (!err) resolve(res);
          else reject(err);
        });
        break;

      default:
        pdfPromise.toFile(document.path, (err, res) => {
          if (!err) resolve(res);
          else reject(err);
        });
        break;
    }
  });
};

exports.create = create;
exports.registerHelper = registerHelper;
