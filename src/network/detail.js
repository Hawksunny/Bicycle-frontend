import { haks } from "./request";

export function getBikeInfo(id) {
  return haks({
    url: "/bike/list",
    params: {
      id,
    }
  })
}

export function getStationInfo(id) {
  return haks({
    url: "/station/list",
    params: {
      id,
    }
  })
}
