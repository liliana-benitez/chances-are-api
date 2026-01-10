import express from "express"
import probabilityRoutes from "./routes/probability.routes"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/probability", probabilityRoutes)

export default app
