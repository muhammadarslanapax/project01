const express = require("express")
const app = express()

app.use(express.json())

const port = 8000;

app.get("/start", async (req, res) => {

    res.json({ "msg": "Welcome to testing" });
});



app.get("/test", async (req, res) => {

    res.json({ "msg": "Welcome to testing" });
});



app.listen(port, () => {
    console.log("SERVER IS RUNNING AT " + port)
})