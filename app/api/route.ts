import { client } from "@/utils/mongo";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const name = searchParams.get("name");

	const db = client.db("countries");
	const countries = await db
		.collection("en-US")
		.find({
			"name.common": {
				$regex: new RegExp(name || "", "i"),
			},
		})
		.project({
			_id: 1,
			"name.common": 1,
		})

		.limit(10)
		.toArray();

	const formatted = countries.map((countrie) => {
		return {
			name: countrie.name.common,
			id: countrie._id,
		};
	});

	return Response.json(formatted);
}
