//Service.ts
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { getSP } from "./Pnpconfig";

export async function Fetch() {
  const sp = getSP();
  const listdata: any = await sp.web.lists.getByTitle("Faqs").items.getAll();
  return listdata;
}