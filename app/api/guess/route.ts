import { client } from "@/utils/mongo";
import { ObjectId } from "mongodb";
const today = {
	_id: {
		$oid: "66a7176eb9f3f675a4369ca7",
	},
	name: {
		common: "Grenada",
	},
	currencies: {
		XCD: {
			name: "Eastern Caribbean dollar",
			symbol: "$",
		},
	},
	region: "Americas",
	languages: {
		eng: "English",
	},
	landlocked: false,
	area: 344,
	population: 112519,
	continents: ["North America"],
};

enum Hint {
	correct,
	lower,
	greater,
	include,
	incorrect,
}

function validateNumberRespose(today: number, guess: number) {
	if (guess > today) {
		return Hint.lower;
	}

	if (guess < today) {
		return Hint.greater;
	}

	if (guess === today) {
		return Hint.correct;
	}
}

function validateCurrencyResponse(today: any, guess: any) {
	const todayObject = Object.keys(today);

	const guessObject = Object.keys(guess);

	const response = guessObject.filter((guessed) => {
		return todayObject.includes(guessed);
	});

	if (response.length === 0) {
		return Hint.incorrect;
	}

	if (response.length === todayObject.length) {
		return Hint.correct;
	}

	return Hint.include;
}

function validateLanguageResponse(today: any, guess: any) {
	const todayObject = Object.values(today);

	const guessObject = Object.values(guess);

	const response = guessObject.filter((guessed) => {
		return todayObject.includes(guessed);
	});

	if (response.length === 0) {
		return Hint.incorrect;
	}

	if (response.length === guessObject.length) {
		return Hint.correct;
	}

	return Hint.include;
}

export async function POST(request: Request) {
	const body = await request.json();

	const db = client.db("countries");
	const guess = (await db.collection("en-US").findOne({
		_id: new ObjectId(body.id as string),
	})) as any;

	const guessedResponse = {
		country: {
			response: guess.name.common,
			hint:
				guess.name.common === today.name.common ? Hint.correct : Hint.incorrect,
		},
		landlockes: {
			response: guess.landlocked,
			hint:
				guess.landlocked === today.landlocked ? Hint.correct : Hint.incorrect,
		},
		languages: {
			response: Object.values(guess.languages),
			hint: validateLanguageResponse(today.languages, guess.languages),
		},
		region: {
			response: guess.region,
			hint: guess.region === today.region ? Hint.correct : Hint.incorrect,
		},
		area: {
			response: guess.area,
			hint: validateNumberRespose(today.area, guess.area),
		},
		currencies: {
			response: Object.keys(guess.currencies),
			hint: validateCurrencyResponse(today.currencies, guess.currencies),
		},
		population: {
			response: guess.population,
			hint: validateNumberRespose(today.population, guess.population),
		},
	};

	return Response.json(guessedResponse);
}
