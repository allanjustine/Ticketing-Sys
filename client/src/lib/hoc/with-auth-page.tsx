import Unauthorized from "@/app/unauthorized";
import PreLoader from "@/components/loaders/pre-loader";
import { ROLE } from "@/constants/roles";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

export default function withAuthPage(
  WrappedComponent: any,
  isProtected = false,
) {
  function AppWrappedComponent(props: any) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const isAlreadyAuthenticated = isAuthenticated && user;
    const noAccess =
      isProtected &&
      ![ROLE.ADMIN, ROLE.AUTOMATION_ADMIN].includes(
        user?.user_role?.role_name,
      ) &&
      isAlreadyAuthenticated;

    if (isLoading) {
      return <PreLoader />;
    }

    if (noAccess) {
      return <Unauthorized />;
    }

    if (!isAlreadyAuthenticated || !user) {
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

    return <WrappedComponent {...props} />;
  }
  return AppWrappedComponent;
}
