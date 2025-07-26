export const ProcessErrorMessage = (error: string): string => {
  switch (error) {
    case "Incorrect username or password":
      return "登录失败，用户名或密码错误，请检查后重试";
    default:
      return error;
  }
};
