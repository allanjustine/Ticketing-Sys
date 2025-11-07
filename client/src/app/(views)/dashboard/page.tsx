"use client";

import { useAuth } from "@/context/auth-context";
import AdminDashboard from "./_components/admin-dashboard";
import UserDashboard from "./_components/user-dashboard";
import useFetch from "@/hooks/use-fetch";
import withAuthPage from "@/lib/hoc/with-auth-page";
import AutomationDashboard from "./_components/automation-dashboard";
import { ROLE } from "@/constants/roles";

const Dashboard = () => {
  const { isAdmin, user } = useAuth();
  const { data, isLoading } = useFetch({
    url: "/dashboard-data",
  });

  if (isAdmin) {
    return <AdminDashboard data={data} isLoading={isLoading} />;
  } else if (user?.user_role?.role_name === ROLE.AUTOMATION) {
    return <AutomationDashboard data={data} isLoading={isLoading} />;
  } else {
    return <UserDashboard data={data} isLoading={isLoading} />;
  }
};

export default withAuthPage(Dashboard);
