import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./button";
import { Spinner } from "./spinner";

interface ButtonLoaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

export default function ButtonLoader({
  isLoading = false,
  children,
  ...props
}: ButtonLoaderProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Spinner />}
      {children}
    </Button>
  );
}
