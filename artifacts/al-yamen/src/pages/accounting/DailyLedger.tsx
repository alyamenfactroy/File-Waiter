import { useLanguage } from "@/contexts/LanguageContext";
import { sampleDailyLedger } from "@/data/sampleData";
import { BookOpen, Download, Plus, ArrowUpRight, ArrowDownRight, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DailyLedger() {
  const { t } = useLanguage();

  const totalDebit = sampleDailyLedger.reduce((a, l) => a + l.debit, 0);
  const totalCredit = sampleDailyLedger.reduce((a, l) => a + l.credit, 0);
  const closingBalance = sampleDailyLedger[sampleDailyLedger.length - 1]?.balance || 0;

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.daily_ledger")}</h1>
          <p className="text-xs text-white/40 mt-0.5">January 15, 2024</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download size={14} /> Export</button>
          <button className="btn-primary"><Plus size={14} /> Add Entry</button>
        </div>
      </div>

      {/* Date Nav */}
      <div className="glass-card p-3 flex items-center justify-between">
        <button className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1"><ChevronLeft size={14} /> Previous</button>
        <span className="text-sm font-semibold text-white flex items-center gap-2">
          <BookOpen size={15} className="text-sky-400" />
          Daily Cash Book — January 15, 2024
        </span>
        <button className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1">Next <ChevronRight size={14} /></button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="glass-card p-4 stat-card stat-card-green">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <ArrowUpRight size={17} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-400">৳{totalCredit.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-0.5">Total Credit (Income)</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 stat-card stat-card-red">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <ArrowDownRight size={17} className="text-red-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-400">৳{totalDebit.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-0.5">Total Debit (Expense)</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 stat-card stat-card-blue">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <DollarSign size={17} className="text-sky-400" />
            </div>
            <div>
              <p className="text-xl font-bold gradient-text">৳{closingBalance.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-0.5">Closing Balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/05 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Ledger Entries</h3>
          <span className="text-xs text-white/35">{sampleDailyLedger.length} entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-start">Date</th>
                <th className="text-start">Particulars</th>
                <th className="text-center">Voucher No.</th>
                <th className="text-end">Debit (৳)</th>
                <th className="text-end">Credit (৳)</th>
                <th className="text-end">Balance (৳)</th>
                <th className="text-center">Type</th>
              </tr>
            </thead>
            <tbody>
              {sampleDailyLedger.map((entry, idx) => (
                <tr key={entry.id}>
                  <td className="text-center text-white/30 text-xs">{idx + 1}</td>
                  <td className="text-white/50 text-xs whitespace-nowrap">{entry.date}</td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0",
                        entry.type === "income" ? "bg-emerald-500/10" :
                        entry.type === "expense" ? "bg-red-500/10" :
                        "bg-sky-500/10"
                      )}>
                        {entry.type === "income"
                          ? <ArrowUpRight size={11} className="text-emerald-400" />
                          : entry.type === "expense"
                          ? <ArrowDownRight size={11} className="text-red-400" />
                          : <DollarSign size={11} className="text-sky-400" />
                        }
                      </div>
                      <span className="font-medium text-white/85">{entry.particulars}</span>
                    </div>
                  </td>
                  <td className="text-center font-mono text-sky-400/70 text-xs">{entry.voucherNo}</td>
                  <td className={cn("text-end font-medium", entry.debit > 0 ? "text-red-400" : "text-white/25")}>
                    {entry.debit > 0 ? `৳${entry.debit.toLocaleString()}` : "—"}
                  </td>
                  <td className={cn("text-end font-medium", entry.credit > 0 ? "text-emerald-400" : "text-white/25")}>
                    {entry.credit > 0 ? `৳${entry.credit.toLocaleString()}` : "—"}
                  </td>
                  <td className="text-end font-bold text-white/85">৳{entry.balance.toLocaleString()}</td>
                  <td className="text-center">
                    <span className={cn("badge text-xs",
                      entry.type === "income" ? "badge-green" :
                      entry.type === "expense" ? "badge-red" :
                      "badge-blue"
                    )}>
                      {entry.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-white/03">
                <td colSpan={4} className="px-4 py-3">
                  <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Totals</span>
                </td>
                <td className="px-4 py-3 text-end font-bold text-red-400">৳{totalDebit.toLocaleString()}</td>
                <td className="px-4 py-3 text-end font-bold text-emerald-400">৳{totalCredit.toLocaleString()}</td>
                <td className="px-4 py-3 text-end font-bold gradient-text text-base">৳{closingBalance.toLocaleString()}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
