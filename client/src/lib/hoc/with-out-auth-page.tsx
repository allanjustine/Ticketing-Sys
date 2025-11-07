import PreLoader from "@/components/loaders/pre-loader";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function withOutAuthPage(WrappedComponent: any) {
  function WithOutAuthPageComponent(props: any) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const isAlreadyAuthenticated = isAuthenticated && user;

    if (isLoading) {
      return <PreLoader />;
    }

    if (isAlreadyAuthenticated) {
      return redirect("/dashboard");
    }

    return <WrappedComponent {...props} />;
  }
  return WithOutAuthPageComponent;
}
