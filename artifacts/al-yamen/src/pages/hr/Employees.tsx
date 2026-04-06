import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleEmployees } from "@/data/sampleData";
import { Search, Plus, Users, Phone, Edit2, Trash2, UserCheck, UserX, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const deptColors: Record<string, string> = {
  Sales: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Finance: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  HR: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Inventory: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Logistics: "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

export default function Employees() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  const departments = ["all", ...Array.from(new Set(sampleEmployees.map(e => e.department)))];

  const filtered = sampleEmployees.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  const active = sampleEmployees.filter(e => e.status === "active").length;
  const totalPayroll = sampleEmployees.filter(e => e.status === "active").reduce((a, e) => a + e.salary, 0);

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.employees")}</h1>
          <p className="text-xs text-white/40 mt-0.5">{sampleEmployees.length} total employees</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download size={14} /> Export</button>
          <button className="btn-primary"><Plus size={14} /> Add Employee</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Staff", value: sampleEmployees.length, color: "text-sky-400 bg-sky-400/10" },
          { label: "Active", value: active, color: "text-emerald-400 bg-emerald-400/10" },
          { label: "Departments", value: departments.length - 1, color: "text-purple-400 bg-purple-400/10" },
          { label: "Monthly Payroll", value: `৳${(totalPayroll / 1000).toFixed(0)}K`, color: "text-amber-400 bg-amber-400/10" },
        ].map(c => (
          <div key={c.label} className="glass-card p-4 stat-card">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-2", c.color)}>
              <Users size={16} />
            </div>
            <p className="text-xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="search-bar flex-1 min-w-[200px]">
          <Search size={13} className="text-white/30 flex-shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-lg capitalize transition-all font-medium",
                deptFilter === dept
                  ? "bg-sky-400/15 text-sky-400 border border-sky-400/25"
                  : "text-white/45 hover:text-white hover:bg-white/05"
              )}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">Employee</th>
                <th className="text-start">ID</th>
                <th className="text-center">Department</th>
                <th className="text-center">Position</th>
                <th className="text-center">Join Date</th>
                <th className="text-center">Phone</th>
                <th className="text-end">Salary</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold text-white",
                        emp.status === "active"
                          ? "bg-gradient-to-br from-sky-500/30 to-indigo-500/30 border border-sky-500/20"
                          : "bg-white/05 border border-white/08"
                      )}>
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/85">{emp.name}</p>
                        <p className="text-xs text-white/40">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-xs text-sky-400/70">{emp.id}</td>
                  <td className="text-center">
                    <span className={cn("badge text-xs", deptColors[emp.department] || "badge-gray")}>
                      {emp.department}
                    </span>
                  </td>
                  <td className="text-center text-white/60 text-xs">{emp.position}</td>
                  <td className="text-center text-white/45 text-xs">{emp.joinDate}</td>
                  <td className="text-center text-white/45 text-xs">{emp.phone}</td>
                  <td className="text-end font-bold text-white/80">৳{emp.salary.toLocaleString()}</td>
                  <td className="text-center">
                    <span className={cn("badge text-xs gap-1", emp.status === "active" ? "badge-green" : "badge-gray")}>
                      {emp.status === "active" ? <UserCheck size={10} /> : <UserX size={10} />}
                      {emp.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="btn-icon text-sky-400/60 hover:text-sky-400 hover:bg-sky-400/10"><Edit2 size={12} /></button>
                      <button className="btn-icon text-red-400/60 hover:text-red-400 hover:bg-red-400/10"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">No employees found</div>
        )}
      </div>
    </div>
  );
}
