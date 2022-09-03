import { useForm, useField } from "vee-validate";
import { mobile, code, isAgree } from "@/utils/validate-schema";
import useAfterLogin from "@/hooks/login/useAfterLogin";
import countdown from "@/utils/countdown";
import { getLoginMsgCode, loginByMobileMsgCode } from "@/api/user";

export default function useMobileFormValidate(instance) {
  const { handleSubmit: mobileFormHandleSubmit } = useForm({
    validationSchema: {
      mobile,
      code,
      isAgree,
    },
  });

  const { value: mobileField, errorMessage: mobileError } = useField("mobile");
  const { value: codeField, errorMessage: codeError } = useField("code");
  const { value: mobileIsAgreeField, errorMessage: mobileIsAgreeError } =
    useField("isAgree");

  const { validate: mobileValidate } = useField("mobile");
  const { count, start, isActive } = countdown();

  const getMsgCode = async () => {
    const { valid } = await mobileValidate();
    if (valid && !isActive.value) {
      try {
        await getLoginMsgCode(mobileField.value);
        instance.$message({ type: "success", text: "验证码发送成功" });
        start(60);
      } catch (error) {
        const msg = error.err.response.data.message;
        instance.$message({ type: "error", text: msg });
      }
    }
  };

  const { loginSuccess, loginFailed } = useAfterLogin();

  const onMobileFormSubmit = mobileFormHandleSubmit((value) => {
    loginByMobileMsgCode(value).then(loginSuccess).catch(loginFailed);
  });
  return {
    mobileField,
    mobileError,
    codeField,
    codeError,
    mobileIsAgreeField,
    mobileIsAgreeError,
    getMsgCode,
    count,
    isActive,
    onMobileFormSubmit,
  };
}
