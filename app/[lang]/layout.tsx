import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
	title: "Countrydle",
	description: "Daily guress Countries by clues, flags",
};

export default function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: any;
}>) {
	return (
		<html lang={params.lang}>
			<body className="bg-slate-900 w-screen h-screen">{children}</body>
		</html>
	);
}
