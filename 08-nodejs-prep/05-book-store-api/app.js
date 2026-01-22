import { configDotenv } from "dotenv";
import express from "express";

configDotenv();
const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())

app.listen(PORT, ()=> {
    console.log(`Server running on PORT: ${PORT}`)
})
