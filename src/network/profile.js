import { haks } from "./request";

export function userLogin(username, password) {
  return haks({
    url: "/user/login",
    method: "post",
    data: {
      username,
      password,
    },
  })
}
