"use client";

import React, { useEffect, useState } from "react";

type Countries = {
	id: string;
	name: string;
};

export interface Guesses {
	country: Country;
	landlockes: Landlockes;
	languages: Languages;
	region: Region;
	area: Area;
	currencies: Currencies;
	population: Population;
}

export interface Country {
	response: string;
	hint: Hint;
}

export interface Landlockes {
	response: boolean;
	hint: Hint;
}

export interface Languages {
	response: string[];
	hint: Hint;
}

export interface Region {
	response: string;
	hint: Hint;
}

export interface Area {
	response: number;
	hint: Hint;
}

export interface Currencies {
	response: string[];
	hint: Hint;
}

export interface Population {
	response: number;
	hint: Hint;
}

enum Hint {
	correct,
	lower,
	greater,
	include,
	incorrect,
}

function handleHint(hint: Hint) {
	if (hint === Hint.correct) {
		return "bg-green-500";
	}

	if (hint === Hint.incorrect) {
		return "bg-red-500";
	}

	if (hint === Hint.include) {
		return "bg-yellow-500";
	}

	if (hint === Hint.lower) {
		return "arrow-down bg-red-500";
	}

	if (hint === Hint.greater) {
		return "arrow-up bg-red-500";
	}
}

export default function Page() {
	const [countrie, setCountrie] = useState("");
	const [countries, setCountries] = useState<Countries[]>([]);
	const [guesses, setGuess] = useState<Guesses[]>([]);

	async function makeGuess(data: Countries) {
		setCountrie("");
		const res = await fetch("/api/guess", {
			method: "POST",
			body: JSON.stringify(data),
		});
		const response = await res.json();
		setGuess((old) => {
			return [response, ...old];
		});
	}

	async function queryCountriesNames(name: string) {
		const res = await fetch(`/api?name=${name}`);
		const response = await res.json();
		setCountries(response);
	}

	useEffect(() => {
		if (!countrie) {
			setCountries([]);
			return;
		}
		const timeout = setTimeout(() => {
			queryCountriesNames(countrie);
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [countrie]);

	return (
		<main className="container">
			<div className=" mx-auto py-8">
				<div className="max-w-96 mx-auto py-8">
					<h1 className="text-5xl font-black text-white text-center">
						Countrydle
					</h1>
					<h2 className="mt-4 text-white text-xl text-center">
						Adivinhe o país
					</h2>
					<div className="mt-8 relative">
						<div className="border-2 py-2 text-center rounded bg-slate-700 text-white px-4 border-white hover:cursor-pointer">
							<h1 className="font-medium">Adivinhe o país de hoje!</h1>
							<p>Digite qualquer país para começar.</p>
						</div>
						<form className="mt-4 flex gap-1">
							<input
								value={countrie}
								type="text"
								autoCorrect="off"
								autoComplete="off"
								onChange={(e) => setCountrie(e.target.value)}
								className="rounded h-10 w-full px-2"
								placeholder="Digite o nome do país ..."
							/>
						</form>
						<div className="absolute bg-white w-full rounded mt-4 z-30 flex flex-col gap-1">
							{countries.map((countrie) => {
								return (
									<button
										onClick={() => makeGuess(countrie)}
										type="button"
										key={countrie.id}
										className="p-2 w-full text-start  rounded hover:bg-gray-100 hover:cursor-pointer"
									>
										<h1>{countrie.name}</h1>
									</button>
								);
							})}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-7 text-white gap-y-2 max-w-2xl mx-auto ">
					<div className="text-center w-20">País</div>
					<div className="text-center w-20">Sem litoral</div>
					<div className="text-center w-20">Idioma(s)</div>
					<div className="text-center w-20">Regiões</div>
					<div className="text-center w-20">Área (km2)</div>
					<div className="text-center w-20">Moeda</div>
					<div className="text-center w-20">População</div>
					{guesses.map((guess) => {
						return (
							<React.Fragment key={guess.country.response}>
								<Boxes
									hint={guess.country.hint}
									guesses={[guess.country.response]}
								/>
								<Boxes
									hint={guess.landlockes.hint}
									guesses={guess.landlockes.response ? ["Sim"] : ["Não"]}
								/>
								<Boxes
									hint={guess.languages.hint}
									guesses={guess.languages.response}
								/>
								<Boxes
									hint={guess.region.hint}
									guesses={[guess.region.response]}
								/>
								<Boxes
									hint={guess.area.hint}
									guesses={[String(guess.area.response)]}
								/>
								<Boxes
									hint={guess.currencies.hint}
									guesses={guess.currencies.response}
								/>
								<Boxes
									hint={guess.population.hint}
									guesses={[String(guess.population.response)]}
								/>
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</main>
	);
}

function Boxes({ guesses, hint }: { guesses: string[]; hint: Hint }) {
	return (
		<div
			className={`flex relative animate-wiggle rounded flex-col items-center justify-center w-20 h-20 border border-white ${handleHint(hint)}`}
		>
			{guesses.map((guess) => {
				return (
					<p key={guess} className="z-20 text-center">
						{guess}
					</p>
				);
			})}
		</div>
	);
}
