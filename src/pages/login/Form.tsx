import Form from "@components/From";
import Input from "@components/Input";
import Button from "@components/Button";

interface LoginRequest {
  username: string;
  password: string;
}

const LoginForm = () => {
  return (
    <Form
      className="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        const loginData = {
          username: formData.username || "",
          password: formData.password || "",
        } as LoginRequest;
        console.log(loginData);
      }}
    >
      <div className="flex flex-col gap-3 my-4">
        <Input
          className="login-form__input"
          isRequired
          label="用户名"
          labelPlacement="inside"
          errorMessage="请输入正确用户名"
          name="username"
          type="text"
        />
        <Input
          className="login-form__input"
          isRequired
          label="密码"
          labelPlacement="inside"
          errorMessage="密码错误"
          name="password"
          type="password"
        />
      </div>
      <Button
        className="login-form__button"
        type="submit"
        variant="shadow"
        color="success"
      >
        登录
      </Button>
    </Form>
  );
};

export default LoginForm;
