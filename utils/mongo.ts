import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
	"mongodb+srv://luisfelipeamorim:rT26x0Y2AtEYdyTS@countrydle-db.gpjbety.mongodb.net/?retryWrites=true&w=majority&appName=Countrydle-db";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
