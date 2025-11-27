import Unauthorized from "@/app/unauthorized";
import PreLoader from "@/components/loaders/pre-loader";
import { ROLE } from "@/constants/roles";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function withAuthPage(
  WrappedComponent: any,
  isProtected = false
) {
  function AppWrappedComponent(props: any) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const isAlreadyAuthenticated = isAuthenticated && user;
    const noAccess =
      isProtected &&
      ![ROLE.ADMIN, ROLE.AUTOMATION_ADMIN].includes(
        user?.user_role?.role_name
      ) &&
      isAlreadyAuthenticated;

    if (isLoading) {
      return <PreLoader />;
    }

    if (noAccess) {
      return <Unauthorized />;
    }

    if (!isAlreadyAuthenticated) {
      return redirect("/login");
    }

    return <WrappedComponent {...props} />;
  }
  return AppWrappedComponent;
}
