import React from "react";
import { useNavigate } from "react-router";

import Form from "@components/From";
import Input from "@components/Input";
import Button from "@components/Button";

import { signIn } from "@/api/signin";

import { type LoginRequest } from "@models/signin"; // Adjust the import path as necessary
import { ProcessErrorMessage } from "@/utils/utils";

const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY;

const LoginForm = () => {
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSetErrorMessage(""); // Reset error message on new submission

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const loginData: LoginRequest = {
      username: formData.username as string,
      password: formData.password as string,
    };

    try {
      setSubmitLoading(true);
      const result = await signIn(loginData);
      const { full_name, session_token } = result;
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ full_name, session_token })
      );
      setTimeout(() => {
        setSubmitLoading(false);
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setSubmitLoading(false);
        if (error instanceof Error) {
          handleSetErrorMessage(error.message);
        } else {
          handleSetErrorMessage("发生未知错误，请稍后再试");
        }
        console.error("Login failed:", error);
      }, 3000);
    }
  };

  const handleSetErrorMessage = (message: string) => {
    const processedMessage = ProcessErrorMessage(message);
    setErrorMessage(processedMessage);
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 my-4">
        <Input
          className="login-form__input"
          isRequired
          label="用户名"
          labelPlacement="inside"
          errorMessage="用户名不能为空"
          name="username"
          type="text"
        />
        <Input
          className="login-form__input"
          isRequired
          label="密码"
          labelPlacement="inside"
          errorMessage="密码不能为空"
          name="password"
          type="password"
        />
      </div>
      {errorMessage && <div className="text-danger text-sm">{errorMessage}</div>}
      <Button
        className="login-form__button"
        type="submit"
        variant="shadow"
        color="success"
        isLoading={submitLoading}
      >
        登录
      </Button>
    </Form>
  );
};

export default LoginForm;
