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

export function getRegisterMsgCode(mobile) {
  return request("/register/code", "get", { mobile });
}

/**
 * 创建新账号并绑定QQ
 * @param unionId QQ用户唯一标识
 * @param account 用户名
 * @param mobile 手机号
 * @param code 验证码
 * @param password 密码
 * @returns {*}
 */
export function createNewAccountBindQQ({
  unionId,
  account,
  mobile,
  code,
  password,
}) {
  return request(`/login/social/${unionId}/complement`, "post", {
    account,
    mobile,
    code,
    password,
  });
}
