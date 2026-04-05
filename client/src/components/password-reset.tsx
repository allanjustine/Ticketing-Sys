import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import ButtonLoader from "./ui/button-loader";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { MessageCircleWarning } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type FormInputType = {
  password: string;
  password_confirmation: string;
};

const FORM_INPUTS = {
  password: "",
  password_confirmation: "",
};

export default function PasswordReset() {
  const { setUser } = useAuth();
  const [formInput, setFormInput] = useState<FormInputType>(FORM_INPUTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/password-reset", formInput);
      if (response.status === 200) {
        setUser(response.data?.user);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-6 p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-sm dark:text-white text-gray-600">
            To use this new system, you need to reset the password for your
            account.
          </p>
        </div>
        {error && (
          <Alert variant="destructive">
            <MessageCircleWarning />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="new-password"
              className="block text-sm font-medium dark:text-white text-gray-700"
            >
              New password
            </Label>
            <Input
              onChange={(e) =>
                setFormInput((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter your new password"
              value={formInput.password}
            />
            {errors?.password && (
              <small className="text-red-500">{errors?.password[0]}</small>
            )}
          </div>
          <div>
            <Label
              htmlFor="new-password"
              className="block text-sm font-medium dark:text-white text-gray-700"
            >
              Confirm new password
            </Label>
            <Input
              onChange={(e) =>
                setFormInput((prev) => ({
                  ...prev,
                  password_confirmation: e.target.value,
                }))
              }
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter your new password confirmation"
              value={formInput.password_confirmation}
            />
          </div>
          <ButtonLoader
            type="submit"
            isLoading={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Password
          </ButtonLoader>
        </form>
      </div>
    </div>
  );
}
