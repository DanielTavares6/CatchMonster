const http = require("http");
const express = require("express");


const clientPath = `${__dirname}/../Client`

const app = express();
// server the static client files.
app.use(express.static(clientPath));

const server = http.createServer(app);

server.on("error", (err) => {
	console.error("Server error", err);
});

server.listen(8080, () => {
	console.log('CatchMonster started on 8080');
});