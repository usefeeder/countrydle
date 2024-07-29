// You now have access to the current locale
import { changeLocale } from "./change-locale";
import { getDictionary } from "./dictionaries.js";

// e.g. /en-US/products -> `lang` is "en-US"
export default async function Page({ params: { lang } }) {
	const dict = await getDictionary(lang);

	return (
		<main>
			<button type="button">{dict.products.cart}</button>
			<h1>{lang}</h1>
		</main>
	);
}
