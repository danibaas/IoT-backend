import { Router } from "express";
import { Weather } from "../entities/Weather";
import { RequestError } from "../middlewares/errorhandler";

enum StatusCodes {
    PROP_UNDEF = "W001",
    DB_NOSAVE = "W002",
}

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        if (typeof req.body.temp !== "number") throw new RequestError("Property temp must be a number!", {}, 400, StatusCodes.PROP_UNDEF);
        if (typeof req.body.humid !== "number") throw new RequestError("Property humid must be a number!", {}, 400, StatusCodes.PROP_UNDEF);

        const weather = new Weather({ temperature: req.body.temp, humidity: req.body.humid });
        const saved = await weather.save().catch((error) => {
            throw new RequestError("Could not save to database!", {}, 500, StatusCodes.DB_NOSAVE, { originalError: error });
        });
        res.send(saved);
    } catch (error) {
        next(error);
    }
});

router.delete("/", async (req, res, next) => {
    try {
        if (typeof req.body.id != "string") throw new RequestError("Property id must be a string!", {}, 400, StatusCodes.PROP_UNDEF);
        const weather = await Weather.findOne({ id: req.body.id });
        const result = await weather?.delete();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        if (typeof req.body.id != "string") throw new RequestError("Property id must be a string!", {}, 400, StatusCodes.PROP_UNDEF);
        const weather = await Weather.findOne({ id: req.body.id });
        res.send(weather);
    } catch (error) {
        next(error);
    }
});

router.get("/:amount", async (req, res, next) => {
    try {
        const amount = parseInt(req.params.amount);
        const weathers = await Weather.findMany({});
        res.send(weathers.reverse().slice(0, amount));
    } catch (error) {
        next(error);
    }
});

export default router;
