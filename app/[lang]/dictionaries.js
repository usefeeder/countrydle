import "server-only";

const dictionaries = {
	"pt-BR": () =>
		import("@/dictionaries/pt-BR.json").then((module) => module.default),
	"en-US": () =>
		import("@/dictionaries/en-US.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
	console.log(await dictionaries[locale]());
	return dictionaries[locale]();
};
