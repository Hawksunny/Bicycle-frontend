import { haks } from "./request";

export function getMultiData() {
  return haks({
    url: "/home/multidata",
  });
}

export function getGoods(type, page) {
  return haks({
    url: "/home/data",
    params: {
      type,
      page,
    },
  });
}

export function getBikes() {
  return haks({
    url: "/bike/list",
  })
}