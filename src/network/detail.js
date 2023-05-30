import { haks } from "./request";

export function getStationInfo(id) {
  return haks({
    url: "/station/list_by_id",
    params: { id },
  });
}

export function getBikeInfo(id) {
  return haks({
    url: "/bike/list_by_id",
    params: { id },
  });
}

export function updateBikeInfo(bike) {
  return haks({
    method: "post",
    url: "/bike/update",
    data: { ...bike },
  });
}

export function addOrder(o) {
  return haks({
    url: "/order/add",
    method: "post",
    data: { ...o },
  });
}

export function addRepair(r) {
  return haks({
    url: "/repair/add",
    method: "post",
    data: {...r},
  });
}