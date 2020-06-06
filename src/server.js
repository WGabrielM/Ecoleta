const express = require("express")
const server = express()

//Configure serve to see the public folder
server.use(express.static("public"))

//Using template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configura paths in my aplication
// Main page
server.get("/", (req, res) => {
//    res.sendFile(__dirname + "/views/index.html")
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
//     res.sendFile(__dirname + "/views/create-point.html")
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
        return res.render("search-results.html")
    })

// Power on server
server.listen(3000)