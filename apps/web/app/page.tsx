import CreateSheets from "./create-sheets/create-sheets";
import Sheets from "./sheets/sheets";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
  <>
    <CreateSheets/>
    <Sheets/>
  </>
  );
}
