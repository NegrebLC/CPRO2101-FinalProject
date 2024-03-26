const http = require("http");

/**
 * Simple function to make an HTTP POST request.
 * @param {string} path The path of the request.
 * @param {Object} data The JSON data to send.
 * @param {Function} callback Callback function to handle the response.
 */
function httpPost(path, data, callback) {
  const options = {
    hostname: "localhost",
    port: 5000,
    path: path,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const req = http.request(options, (res) => {
    let responseBody = "";
    res.on("data", (chunk) => {
      responseBody += chunk;
    });
    res.on("end", () => {
      callback(null, JSON.parse(responseBody));
    });
  });

  req.on("error", (error) => {
    callback(error);
  });

  req.write(JSON.stringify(data));
  req.end();
}
module.exports = httpPost;
