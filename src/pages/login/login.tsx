import { Input } from "@heroui/react";

const Login = () => {
  return (
    <Input
      isDisabled
      className="max-w-xs"
      defaultValue="junior@heroui.com"
      label="Email"
      type="email"
      variant="bordered"
    />
  );
};

export default Login;
