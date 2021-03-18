import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_res, req) => {
    req.send("Hello World!");
});

// Default port for dokku is 5000.
app.listen(5000, () => console.log("Running on " + 5000));
