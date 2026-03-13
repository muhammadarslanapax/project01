const express = require("express")
const app = express()

app.use(express.json())

const port = 8000;


// Health check API
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running",
        time: new Date()
    })
})


// Welcome API
app.get("/start", (req, res) => {
    res.json({ msg: "Welcome to testing API" })
})


// Test API
app.get("/test", (req, res) => {
    res.json({ msg: "Test API working" })
})


// Example: Get users
let users = [
    { id: 1, name: "Arslan", role: "Developer" },
    { id: 2, name: "Ali", role: "Designer" }
]

app.get("/users", (req, res) => {
    res.json(users)
})


// Example: Get single user (params)
app.get("/users/:id", (req, res) => {

    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)

    if (!user) {
        return res.status(404).json({ msg: "User not found" })
    }

    res.json(user)
})


// Create user
app.post("/users", (req, res) => {

    const { name, role } = req.body

    const newUser = {
        id: users.length + 1,
        name,
        role
    }

    users.push(newUser)

    res.status(201).json({
        msg: "User created",
        user: newUser
    })
})


// Update user
app.put("/users/:id", (req, res) => {

    const id = parseInt(req.params.id)
    const { name, role } = req.body

    const user = users.find(u => u.id === id)

    if (!user) {
        return res.status(404).json({ msg: "User not found" })
    }

    user.name = name || user.name
    user.role = role || user.role

    res.json({
        msg: "User updated",
        user
    })
})


// Delete user
app.delete("/users/:id", (req, res) => {

    const id = parseInt(req.params.id)

    users = users.filter(u => u.id !== id)

    res.json({
        msg: "User deleted"
    })
})


// Query params example
app.get("/search", (req, res) => {

    const { name } = req.query

    const result = users.filter(u =>
        u.name.toLowerCase().includes(name.toLowerCase())
    )

    res.json(result)
})



app.listen(port, () => {
    console.log("SERVER IS RUNNING AT " + port)
})