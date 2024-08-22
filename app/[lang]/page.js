import Link from "next/link";
import { getDictionary } from "./dictionaries.js";

export default async function Page({ params: { lang } }) {
	const dict = await getDictionary(lang);

	return (
		<main className="container">
			<div className="max-w-80 mx-auto py-8">
				<h1 className="text-5xl font-black text-white text-center">
					Countrydle
				</h1>
				<h2 className="mt-4 text-white text-xl text-center">Adivinhe o país</h2>
				<div className="mt-8">
					<Link href={`${lang}/classic`}>
						<div className="border-2 py-2 rounded bg-slate-700 text-white px-4 border-white hover:cursor-pointer">
							<h1 className="font-medium">Clássico</h1>
							<p>Consiga pistas a cada tentativa</p>
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
}
