import { useLanguage } from "@/contexts/LanguageContext";
import { sampleAttendance } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Clock, UserCheck, UserX, Calendar, Download, ChevronLeft, ChevronRight } from "lucide-react";

const statusConfig = {
  present: { label: "Present", cls: "badge-green", icon: <UserCheck size={10} /> },
  absent:  { label: "Absent",  cls: "badge-red",  icon: <UserX size={10} /> },
  leave:   { label: "Leave",   cls: "badge-amber", icon: <Calendar size={10} /> },
};

export default function Attendance() {
  const { t } = useLanguage();

  const present = sampleAttendance.filter(a => a.status === "present").length;
  const absent  = sampleAttendance.filter(a => a.status === "absent").length;
  const leave   = sampleAttendance.filter(a => a.status === "leave").length;

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.attendance")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Today — January 15, 2024</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download size={14} /> Export</button>
          <button className="btn-primary"><Clock size={14} /> Mark Attendance</button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="glass-card p-4 flex items-center justify-between">
        <button className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1">
          <ChevronLeft size={14} /> Previous
        </button>
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-sky-400" />
          <span className="text-sm font-semibold text-white">January 15, 2024 — Tuesday</span>
        </div>
        <button className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1">
          Next <ChevronRight size={14} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3.5">
        {[
          { label: "Present", value: present, icon: <UserCheck size={18} />, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", ring: "stat-card-green" },
          { label: "Absent", value: absent, icon: <UserX size={18} />, color: "text-red-400 bg-red-400/10 border-red-400/20", ring: "stat-card-red" },
          { label: "On Leave", value: leave, icon: <Calendar size={18} />, color: "text-amber-400 bg-amber-400/10 border-amber-400/20", ring: "stat-card-amber" },
        ].map(s => (
          <div key={s.label} className={cn("glass-card p-5 stat-card text-center", s.ring)}>
            <div className={cn("w-12 h-12 rounded-2xl mx-auto flex items-center justify-center border mb-3", s.color)}>
              {s.icon}
            </div>
            <p className="text-3xl font-bold text-white mb-0.5">{s.value}</p>
            <p className="text-xs text-white/40">{s.label}</p>
            <div className="mt-3 progress-bar">
              <div
                className={cn("progress-fill", s.label === "Present" ? "bg-emerald-400" : s.label === "Absent" ? "bg-red-400" : "bg-amber-400")}
                style={{ width: `${(s.value / sampleAttendance.length) * 100}%`, opacity: 0.65 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/05">
          <h3 className="text-sm font-bold text-white">Attendance Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">Employee</th>
                <th className="text-center">Date</th>
                <th className="text-center">Check In</th>
                <th className="text-center">Check Out</th>
                <th className="text-center">Hours Worked</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleAttendance.map((a) => {
                const sc = statusConfig[a.status as keyof typeof statusConfig];
                return (
                  <tr key={a.employeeId}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0",
                          a.status === "present"
                            ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20"
                            : a.status === "absent"
                            ? "bg-red-500/10 border border-red-500/15"
                            : "bg-amber-500/10 border border-amber-500/15"
                        )}>
                          {a.employeeName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white/85">{a.employeeName}</p>
                          <p className="text-xs font-mono text-white/35">{a.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center text-white/50 text-xs">{a.date}</td>
                    <td className="text-center">
                      {a.checkIn !== "-" ? (
                        <span className="text-sm font-semibold text-white/80">{a.checkIn}</span>
                      ) : (
                        <span className="text-white/25">—</span>
                      )}
                    </td>
                    <td className="text-center">
                      {a.checkOut !== "-" ? (
                        <span className="text-sm font-semibold text-white/80">{a.checkOut}</span>
                      ) : (
                        <span className="text-white/25">—</span>
                      )}
                    </td>
                    <td className="text-center">
                      {a.hours !== "-" ? (
                        <span className="text-xs font-medium text-sky-400">{a.hours}</span>
                      ) : (
                        <span className="text-white/25">—</span>
                      )}
                    </td>
                    <td className="text-center">
                      <span className={cn("badge text-xs gap-1", sc.cls)}>
                        {sc.icon} {sc.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
