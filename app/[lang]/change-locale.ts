"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function changeLocale() {
	cookies().set("locale", "pt-BR");
	redirect("pt-BR");
}
