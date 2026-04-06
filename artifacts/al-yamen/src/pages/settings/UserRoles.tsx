import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, UserCog, Check, Crown, User, Eye, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access. Can manage all settings, users, and data.",
    icon: <Crown size={18} />,
    color: "from-red-500/20 to-orange-500/20 border-red-500/20 text-red-400",
    badge: "badge-red",
    users: 2,
    permissions: {
      dashboard: true, transactions: true, sales: true, purchase: true,
      inventory: true, hr: true, crm: true, accounting: true,
      reports: true, settings: true, userManagement: true, deleteRecords: true,
    },
  },
  {
    id: "manager",
    name: "Manager",
    description: "Access to most modules. Cannot delete records or change system settings.",
    icon: <Shield size={18} />,
    color: "from-sky-500/20 to-indigo-500/20 border-sky-500/20 text-sky-400",
    badge: "badge-blue",
    users: 3,
    permissions: {
      dashboard: true, transactions: true, sales: true, purchase: true,
      inventory: true, hr: true, crm: true, accounting: true,
      reports: true, settings: false, userManagement: false, deleteRecords: false,
    },
  },
  {
    id: "cashier",
    name: "Cashier",
    description: "Limited to transactions, sales, and viewing reports only.",
    icon: <User size={18} />,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20 text-emerald-400",
    badge: "badge-green",
    users: 5,
    permissions: {
      dashboard: true, transactions: true, sales: true, purchase: false,
      inventory: false, hr: false, crm: false, accounting: false,
      reports: false, settings: false, userManagement: false, deleteRecords: false,
    },
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to dashboard and reports. Cannot create or edit.",
    icon: <Eye size={18} />,
    color: "from-purple-500/20 to-violet-500/20 border-purple-500/20 text-purple-400",
    badge: "badge-purple",
    users: 1,
    permissions: {
      dashboard: true, transactions: false, sales: false, purchase: false,
      inventory: false, hr: false, crm: false, accounting: false,
      reports: true, settings: false, userManagement: false, deleteRecords: false,
    },
  },
];

const permissionLabels: Record<string, string> = {
  dashboard: "Dashboard", transactions: "Transactions", sales: "Sales",
  purchase: "Purchase", inventory: "Inventory", hr: "HR Management",
  crm: "CRM", accounting: "Accounting", reports: "Reports",
  settings: "Settings", userManagement: "User Management", deleteRecords: "Delete Records",
};

export default function UserRoles() {
  const { t } = useLanguage();

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.user_roles")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Manage user roles and permissions</p>
        </div>
        <button className="btn-primary"><Plus size={14} /> Create Role</button>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="glass-card p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br border flex items-center justify-center flex-shrink-0", role.color)}>
                {role.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white">{role.name}</h3>
                  <span className={cn("badge text-xs", role.badge)}>{role.users} users</span>
                </div>
                <p className="text-xs text-white/45 leading-relaxed">{role.description}</p>
              </div>
              <button className="btn-icon text-sky-400/60 hover:text-sky-400 hover:bg-sky-400/10">
                <UserCog size={14} />
              </button>
            </div>

            <div className="divider mb-4" />

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries(role.permissions).map(([key, allowed]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={cn(
                    "w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0",
                    allowed ? "bg-emerald-400/15 border border-emerald-400/25" : "bg-white/04 border border-white/07"
                  )}>
                    {allowed && <Check size={9} className="text-emerald-400" />}
                  </div>
                  <span className={cn("text-xs", allowed ? "text-white/70" : "text-white/25")}>
                    {permissionLabels[key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
