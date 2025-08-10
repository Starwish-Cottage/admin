import { Alert as HeroAlert, type AlertProps as HeroAlertProps } from "@heroui/react";

import { cn } from "@heroui/react";

const Alert = (props: HeroAlertProps) => {
  return <HeroAlert {...props} className={cn("alert", props.className)} />;
};

export default Alert;
