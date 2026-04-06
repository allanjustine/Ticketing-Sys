import PreLoader from "@/components/loaders/pre-loader";
import { ROLE } from "@/constants/roles";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

export default function withoutAuthPage(WrappedComponent: any) {
  function WithoutAuthPageComponent(props: any) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const isAlreadyAuthenticated = isAuthenticated && user;
    const isAudit = user?.user_role?.role_name === ROLE.AUDIT;

    if (isLoading) {
      return <PreLoader />;
    }

    if (isAlreadyAuthenticated || user) {
      Swal.fire({
        title: "Redirecting...",
        text: "Redirecting to dashboard. Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      redirect(isAudit ? "/audit-dashboard" : "/dashboard");
    }

    return <WrappedComponent {...props} />;
  }
  return WithoutAuthPageComponent;
}
