import { Sheet } from "@repo/types";

export default async function Sheets() {
  const response = await fetch(`${process.env.API_URL}/sheets`, {
    next: { tags: ["sheets"] },
  });
  const sheets: Sheet[] = await response.json();
  return (
    <div>
      <h1>Sheets</h1>
      <div>
        {sheets.map((sheet) => (
          <div key={sheet.id}>
            <p>Title:{sheet.title}</p>
            <p>Price{sheet.year}</p>
            <p>cool</p>
          </div>
        ))}
      </div>
    </div>
  );
}
