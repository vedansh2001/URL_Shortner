import dotenv from "dotenv"
import express from "express"
const app = express()
import connectDB from "./db/index.js" 
import urlRoute from "./routes/url.js"
import { URL } from "./models/url.models.js"
import cors from "cors"

dotenv.config({
  path: './env'
})
app.use(cors({         // "use" method is used for middlewares and configurations
    origin: process.env.CORS_ORIGIN,
    credentials: true         //what credentail to allow
}))

connectDB();

app.use(express.json())
app.use("/url", urlRoute)


app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  },
{
  $push: {
    visitHistory: {
      timestamp: Date.now(),
    }
  },
});
 res.redirect(entry.redirectURL);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})