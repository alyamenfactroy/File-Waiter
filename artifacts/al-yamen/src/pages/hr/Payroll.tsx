import { useLanguage } from "@/contexts/LanguageContext";
import { samplePayroll } from "@/data/sampleData";
import { Receipt, Download, CheckCircle, Clock, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Payroll() {
  const { t } = useLanguage();

  const totalNet = samplePayroll.reduce((a, p) => a + p.netSalary, 0);
  const paid = samplePayroll.filter(p => p.status === "paid");
  const pending = samplePayroll.filter(p => p.status === "pending");

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.payroll")}</h1>
          <p className="text-xs text-white/40 mt-0.5">January 2024 — {samplePayroll.length} employees</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download size={14} /> Export</button>
          <button className="btn-primary"><Receipt size={14} /> Process Payroll</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Payroll", value: `৳${totalNet.toLocaleString()}`, icon: <DollarSign size={16} />, color: "text-sky-400 bg-sky-400/10" },
          { label: "Paid", value: paid.length, icon: <CheckCircle size={16} />, color: "text-emerald-400 bg-emerald-400/10" },
          { label: "Pending", value: pending.length, icon: <Clock size={16} />, color: "text-amber-400 bg-amber-400/10" },
          { label: "Total Staff", value: samplePayroll.length, icon: <Users size={16} />, color: "text-purple-400 bg-purple-400/10" },
        ].map(c => (
          <div key={c.label} className="glass-card p-4 stat-card">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-2", c.color)}>{c.icon}</div>
            <p className="text-xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/05 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Payroll Details — January 2024</h3>
          <span className="badge badge-blue">Month: January 2024</span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">Employee</th>
                <th className="text-center">Department</th>
                <th className="text-end">Basic</th>
                <th className="text-end">Bonus</th>
                <th className="text-end">Overtime</th>
                <th className="text-end">Deduction</th>
                <th className="text-end">Net Salary</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {samplePayroll.map((p) => (
                <tr key={p.employeeId}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/15 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {p.employeeName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/85">{p.employeeName}</p>
                        <p className="text-xs text-white/35 font-mono">{p.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="badge badge-blue text-xs">{p.department}</span>
                  </td>
                  <td className="text-end text-white/70 font-medium">৳{p.basicSalary.toLocaleString()}</td>
                  <td className="text-end text-emerald-400/80 font-medium">+৳{p.bonus.toLocaleString()}</td>
                  <td className="text-end text-sky-400/80 font-medium">+৳{p.overtime.toLocaleString()}</td>
                  <td className="text-end text-red-400/80 font-medium">-৳{p.deduction.toLocaleString()}</td>
                  <td className="text-end font-bold text-white/90">৳{p.netSalary.toLocaleString()}</td>
                  <td className="text-center">
                    <span className={cn("badge text-xs", p.status === "paid" ? "badge-green" : "badge-amber")}>
                      {p.status === "paid" ? <CheckCircle size={10} /> : <Clock size={10} />}
                      {p.status}
                    </span>
                  </td>
                  <td className="text-center">
                    {p.status === "pending" ? (
                      <button className="text-xs px-2.5 py-1 rounded-lg bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 hover:bg-emerald-400/15 transition-colors font-medium">
                        Pay Now
                      </button>
                    ) : (
                      <button className="text-xs px-2.5 py-1 rounded-lg bg-white/05 text-white/40 hover:bg-white/08 transition-colors">
                        Slip
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-white/03">
                <td colSpan={2} className="px-4 py-3">
                  <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Total</span>
                </td>
                <td className="px-4 py-3 text-end font-bold text-white/70">৳{samplePayroll.reduce((a, p) => a + p.basicSalary, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-end font-bold text-emerald-400">+৳{samplePayroll.reduce((a, p) => a + p.bonus, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-end font-bold text-sky-400">+৳{samplePayroll.reduce((a, p) => a + p.overtime, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-end font-bold text-red-400">-৳{samplePayroll.reduce((a, p) => a + p.deduction, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-end font-bold gradient-text text-lg">৳{totalNet.toLocaleString()}</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
