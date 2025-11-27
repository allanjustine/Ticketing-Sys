import { ReactNode } from "react";
import SmctBuilding from "@/assets/building.jpg";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main
      style={{ backgroundImage: `url(${SmctBuilding.src})` }}
      className="bg-no-repeat bg-cover bg-center"
    >
      <div className="bg-black/50 h-screen overflow-y-auto">{children}</div>
    </main>
  );
};

export default AuthLayout;
