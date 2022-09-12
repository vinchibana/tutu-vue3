import { useField, useForm } from "vee-validate";
import {
  checkUserAccount,
  code,
  mobile,
  password,
  rePassword,
} from "@/utils/validate-schema";
import countdown from "@/utils/countdown";
import { createNewAccountBindQQ, getRegisterMsgCode } from "@/api/user";
import MsgService from "@/components/library/MsgService";
import useAfterLogin from "@/hooks/login/useAfterLogin";

export default function useBindNewAccountFormValid(props) {
  const { handleSubmit } = useForm({
    validationSchema: {
      checkUserAccount,
      code,
      mobile,
      password,
      rePassword,
    },
  });

  const { value: accountField, errorMessage: accountError } =
    useField("checkUserAccount");
  const { value: codeField, errorMessage: codeError } = useField("code");
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValid,
  } = useField("mobile");
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  const { value: rePasswordField, errorMessage: rePasswordError } =
    useField("rePassword");

  const { count, start, isActive } = countdown();
  const getMsgCode = async () => {
    const { valid } = await mobileValid();
    if (valid && !isActive.value) {
      try {
        await getRegisterMsgCode(mobileField.value);
        MsgService({ type: "success", text: "验证码发送成功" });
      } catch (error) {
        const msg = error.err.response.data.message;
        MsgService({ type: "error", text: msg });
      }
    }
  };

  // 登录表单提交
  const { loginSuccess, loginFailed } = useAfterLogin();
  const onSubmitHandler = handleSubmit((value) => {
    console.log(value);
    createNewAccountBindQQ({
      unionId: props.unionId,
      account: value.checkUserAccount,
      mobile: value.mobile,
      code: value.code,
      password: value.password,
    })
      .then(loginSuccess)
      .catch(loginFailed);
  });

  return {
    accountField,
    accountError,
    codeField,
    codeError,
    mobileField,
    mobileError,
    passwordField,
    passwordError,
    rePasswordField,
    rePasswordError,
    onSubmitHandler,
    getMsgCode,
    count,
    start,
    isActive,
  };
}
