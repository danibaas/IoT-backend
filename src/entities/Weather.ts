import { Database } from "../../modules/AloeDB";
import { v1 as id } from "uuid";

const db = new Database<Omit<Weather, "save" | "delete" | "update">>("./db/weather.json");

export class Weather {
    id: string;
    timestamp: number;
    temperature: number;
    humidity: number;

    constructor(data: Omit<Weather, "save" | "delete" | "update" | "id" | "timestamp"> & Partial<Pick<Weather, "id" | "timestamp">>) {
        this.id = data.id ?? id();
        this.timestamp = data.timestamp ?? new Date().getTime();
        this.temperature = data.temperature;
        this.humidity = data.humidity;
    }

    save() {
        return db.insertOne(this);
    }

    delete() {
        return db.deleteOne({ id: this.id });
    }

    update() {
        return db.updateOne({ id: this.id }, this);
    }

    static async findOne(query: Partial<Omit<Weather, "save" | "delete" | "update">>): Promise<Weather | null> {
        const obj = await db.findOne(query);
        if (obj) return new Weather(obj);
        return null;
    }

    static async findMany(query: Partial<Omit<Weather, "save" | "delete" | "update">>): Promise<Weather[]> {
        const obj = await db.findMany(query);
        return obj.map((object) => {
            return new Weather(object);
        });
    }
}
