import createSheet from "./actions/create-sheet";

export default async function CreateSheet() {
  return (
    <div>
      <form action={createSheet}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input type="number" id="year" name="year" />
        </div>
        <button type="submit">Create Sheet</button>
      </form>
    </div>
  );
}
