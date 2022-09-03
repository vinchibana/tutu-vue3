import request from "@/utils/request";

export function checkUsernameIsUnique(account) {
  return request("/register/check", "get", { account });
}

export function loginByAccountAndPassword({ account, password }) {
  return request("/login", "post", { account, password });
}

export function getLoginMsgCode(mobile) {
  return request("/login/code", "get", { mobile });
}

export function loginByMobileMsgCode({ mobile, code }) {
  return request("/login/code", "post", { mobile, code });
}
