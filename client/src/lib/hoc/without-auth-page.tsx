import PreLoader from "@/components/loaders/pre-loader";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function withoutAuthPage(WrappedComponent: any) {
  function WithoutAuthPageComponent(props: any) {
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
  return WithoutAuthPageComponent;
}
