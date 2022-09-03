import { useForm, useField } from "vee-validate";
import { account, password, isAgree } from "@/utils/validate-schema";
import { loginByAccountAndPassword } from "@/api/user";
import useAfterLogin from "@/hooks/login/useAfterLogin";

export default function useAccountFormValidate() {

  // 解构赋值重命名为 accountFormHandleSubmit
  const { handleSubmit: accountFormHandleSubmit } = useForm({
    // 指定表单验证规则
    validationSchema: {
      account,
      password,
      isAgree,
    },
  });

  const { value: accountField, errorMessage: accountError } =
    useField("account");
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  const { value: accountIsAgreeField, errorMessage: accountIsAgreeError } =
    useField("isAgree");

  accountField.value = "user";
  passwordField.value = "123456";

  const { loginSuccess, loginFailed } = useAfterLogin();

  const onAccountFormSubmit = accountFormHandleSubmit((value) => {
    loginByAccountAndPassword(value).then(loginSuccess).catch(loginFailed);
  });

  return {
    accountField,
    accountError,
    passwordField,
    passwordError,
    accountIsAgreeField,
    accountIsAgreeError,
    onAccountFormSubmit,
  };
}
