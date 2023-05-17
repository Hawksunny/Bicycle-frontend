import { haks } from "./request";

export function getOrderListByUid(uid) {
  return haks({
    url: "/order/list_by_uid",
    method: "get",
    params: {
      uid,
    }
  });
}

export function deleteOrder(id) {
  return haks({
    url: "/order/delete",
    method: "get",
    params: {
      id,
    }
  })
}