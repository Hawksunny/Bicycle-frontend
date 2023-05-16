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

export function updateBikeInfo(o) {
  return haks({
    method: "post",
    url: "/bike/update",
    params: { ...o },
  });
}

export function addOrder(o) {
  return haks({
    method: "post",
    url: "/order/add",
    params: { ...o },
  });
}

export function getOrderInfo(id) {
  return haks({
    url: "/order/list",
    params: { id },
  });
}

export function updateOrderInfo(o) {
  return haks({
    method: "post",
    url: "/order/update",
    params: { ...o },
  });
}

export function addPayment(o) {
  return haks({
    url: "/payment/add",
    params: { ...o },
  });
}
