import { haks } from "./request";

export function userLogin(uid, password) {
  return haks({
    url: "/user/login",
    method: "post",
    data: {
      uid,
      password,
    },
  })
}

export function isTokenExpired(token) {
  return haks({
    url: "/user/auth",
    method: "get",
    params: {
      token,
    }
  })
}

export function modifyBaseInfo(username, telephone, uid) {
  return haks({
    url: "/user/modify_base",
    method: "get",
    params: {
      username,
      telephone,
      uid,
    }
  })
}

export function modifyPasswd(password, uid) {
  return haks({
    url: "/user/modify_passwd",
    method: "post",
    data: {
      password,
      uid,
    }
  })
}

export function getUserList(pageNumber, pageSize) {
  return haks({
    url: "/user/list",
    method: "get",
    params: {
      pageNumber,
      pageSize,
    }
  })
}

export function addUser(user) {
  return haks({
    url: "/user/add",
    method: "post",
    data: {
      ...user,
    }
  })
}

export function updateUser(user) {
  return haks({
    url: "/user/update",
    method: "post",
    data: {
      ...user,
    }
  })
}

export function deleteUser(uid) {
  return haks({
    url: "/user/delete",
    method: "get",
    params: {
      uid,
    }
  })
}