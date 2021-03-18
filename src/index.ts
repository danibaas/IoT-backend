import express from "express";
import { errorHandler } from "./middlewares/errorhandler";
import weather from "./routes/weather";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_res, req) => {
    req.send("Hello World!");
});

app.use("/weather", weather);
app.use(errorHandler);

// Default port for dokku is 5000.
app.listen(5000, () => console.log("Running on " + 5000));
app.post("/okidoki", (req, res) => {
    const text: string = req.body.text;
    res.json({ success: true, text });
});

(async () => {})();
