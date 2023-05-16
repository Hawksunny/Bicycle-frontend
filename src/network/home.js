import { haks } from "./request";

export function getBikes() {
  return haks({
    url: "/bike/list_all",
    method: "get",
  })
}