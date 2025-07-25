import React from "react";

import Form from "@components/From";
import Input from "@components/Input";
import Button from "@components/Button";

import { signIn } from "@/api/signin";

import { type LoginRequest } from "@models/signin"; // Adjust the import path as necessary

const LoginForm = () => {
  const [formError, setFormError] = React.useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const loginData: LoginRequest = {
      username: formData.username as string,
      password: formData.password as string,
    };

    try {
      setSubmitLoading(true);
      const result = await signIn(loginData);
      console.log(result);
    } catch (error) {
      console.error("Login failed:", error);
      setFormError({ username: "登录失败", password: "请检查用户名和密码" });
    } finally {
      setTimeout(() => {
        setSubmitLoading(false);
      }, 1000);
    }
  };

  const handleInputValidation = (
    e: React.FocusEvent<HTMLInputElement>,
    key: string,
    field: string
  ) => {
    if (e.target.value.length === 0) {
      setFormError((prev) => ({
        ...prev,
        [key]: `${field}不能为空`,
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 my-4">
        <Input
          className="login-form__input"
          isRequired
          label="用户名"
          onBlur={(e) => handleInputValidation(e, "username", "用户名")}
          isInvalid={formError.username !== ""}
          labelPlacement="inside"
          errorMessage={formError.username}
          name="username"
          type="text"
        />
        <Input
          className="login-form__input"
          isRequired
          label="密码"
          onBlur={(e) => handleInputValidation(e, "password", "密码")}
          isInvalid={formError.password !== ""}
          labelPlacement="inside"
          errorMessage={formError.password}
          name="password"
          type="password"
        />
      </div>
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
