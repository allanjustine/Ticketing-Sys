import Unauthorized from "@/app/unauthorized";
import PreLoader from "@/components/loaders/pre-loader";
import PasswordReset from "@/components/password-reset";
import { CAN_ACCESS_NO_AUDIT } from "@/constants/roles";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

export default function withAuthPage(
  WrappedComponent: any,
  roleCanAccess = CAN_ACCESS_NO_AUDIT,
) {
  function AppWrappedComponent(props: any) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const isAlreadyAuthenticated = isAuthenticated || user;
    const noAccess =
      !roleCanAccess.includes(user?.user_role?.role_name) &&
      isAlreadyAuthenticated;

    if (isLoading) {
      return <PreLoader />;
    }

    if (noAccess) {
      return <Unauthorized />;
    }

    if (!isAlreadyAuthenticated) {
      Swal.fire({
        title: "Redirecting...",
        text: "Redirecting to login. Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      return redirect("/login");
    }

    if (user?.requesting_password) {
      Swal.close();
      return <PasswordReset />;
    }

    return <WrappedComponent {...props} />;
  }
  return AppWrappedComponent;
}
