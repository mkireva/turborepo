"use server";

import { revalidateTag } from "next/cache";

export default async function createSheet(formData: FormData) {
  await fetch(`${process.env.API_URL}/sheets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  revalidateTag("sheets");
}