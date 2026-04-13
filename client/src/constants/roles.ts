export const ROLE = {
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
  AUTOMATION: "Automation",
  ACCOUNTING_HEAD: "Accounting Head",
  BRANCH_HEAD: "Branch Head",
  USER: "Staff",
  CAS: "CAS",
  ACCOUNTING_STAFF: "Accounting Staff",
  AREA_MANAGER: "Area Manager",
  AUTOMATION_MANAGER: "Automation Manager",
  AUTOMATION_ADMIN: "Automation Admin",
  AUDIT: "Audit",
};

export const { AUDIT, ...NO_AUDIT_ROLE } = ROLE;

export const ADMIN_ACCESS = [
  ROLE.ADMIN,
  ROLE.AUTOMATION_ADMIN,
  ROLE.AUTOMATION_MANAGER,
  ROLE.SUPER_ADMIN,
];

export const CAN_ACCESS_ALL = Object.values(ROLE);

export const CAN_ACCESS_NO_AUDIT = Object.values(NO_AUDIT_ROLE);
