const express = require("express")
const server = express()

// Get database
const bd = require("./database/db")

// Configure serve to see the public folder
server.use(express.static("public"))

// Enable the use of the req.body in my application
server.use(express.urlencoded({extended: true}))

// Using template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configura paths in my aplication
// Main page
server.get("/", (req, res) => {
//  res.sendFile(__dirname + "/views/index.html")
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html")

    // req query: Query Strings for my url
    console.log(req.query)

    return res.render("create-point.html", {saved: true})
})

server.post("/savepoint", (req, res) => {
    
    // Insert data in Database

    // 2 Insert datas into the table
    const query = `
        INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")

        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.send("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData) 

    
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search =="") {
        // Empty search
        return res.render("search-results.html", {total:0})
    }

    // Get data from database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err) {
         return console.log(err)
        }
        
        const total = rows.length
        
        // Show html page with data from databse
        return res.render("search-results.html", {places: rows, total: total})
    })
})

// Power on server
server.listen(3000)

