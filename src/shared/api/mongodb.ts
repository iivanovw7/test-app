import { MongoClient } from "mongodb";

const URI = import.meta.env.MONGODB_URI as string;
const options = {};

declare global {
    // eslint-disable-next-line prefer-let/prefer-let, no-var
    var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
    private clientPromise: Promise<MongoClient>;
    private static _instance: Singleton;
    private client: MongoClient;

    private constructor() {
        this.client = new MongoClient(URI, options);
        this.clientPromise = this.client.connect();

        if (process.env.NODE_ENV === "development") {
            // In development mode, use a global variable so that the value
            // is preserved across module reloads caused by HMR (Hot Module Replacement).
            global._mongoClientPromise = this.clientPromise;
        }
    }

    public static get instance() {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!this._instance) {
            this._instance = new Singleton();
        }

        return this._instance.clientPromise;
    }
}

const clientPromise = Singleton.instance;

export default clientPromise;
