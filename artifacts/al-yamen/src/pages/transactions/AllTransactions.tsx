import { useLanguage } from "@/contexts/LanguageContext";
import { sampleTransactions } from "@/data/sampleData";
import { Search, ArrowUpRight, ArrowDownRight, Download, Plus, Filter, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "wouter";

export default function AllTransactions() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = sampleTransactions.filter(tx => {
    const matchSearch =
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.reference.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || tx.type === typeFilter;
    const matchStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalIncome = sampleTransactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const totalExpense = sampleTransactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.all_transactions")}</h1>
          <p className="text-xs text-white/40 mt-0.5">{sampleTransactions.length} transactions total</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download size={14} /> Export</button>
          <Link href="/transactions/add" className="btn-primary"><Plus size={14} /> Add New</Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="glass-card p-4 stat-card stat-card-green">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <TrendingUp size={17} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-400">৳{totalIncome.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-0.5">Total Income</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 stat-card stat-card-red">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <TrendingDown size={17} className="text-red-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-400">৳{totalExpense.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-0.5">Total Expense</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 stat-card stat-card-blue">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <DollarSign size={17} className="text-sky-400" />
            </div>
            <div>
              <p className={cn("text-xl font-bold", netBalance >= 0 ? "text-sky-400" : "text-red-400")}>
                ৳{Math.abs(netBalance).toLocaleString()}
              </p>
              <p className="text-xs text-white/40 mt-0.5">Net Balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-white/05 flex flex-wrap items-center gap-3">
          <div className="search-bar flex-1 min-w-[200px]">
            <Search size={13} className="text-white/30 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t("common.search") + "..."}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "all", label: "All" },
              { key: "income", label: "Income" },
              { key: "expense", label: "Expense" },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setTypeFilter(f.key)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-lg transition-all font-medium",
                  typeFilter === f.key
                    ? f.key === "income"
                      ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/25"
                      : f.key === "expense"
                      ? "bg-red-400/15 text-red-400 border border-red-400/25"
                      : "bg-sky-400/15 text-sky-400 border border-sky-400/25"
                    : "text-white/45 hover:text-white hover:bg-white/05"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">Date</th>
                <th className="text-start">Description</th>
                <th className="text-center">Category</th>
                <th className="text-center">Reference</th>
                <th className="text-center">Bank</th>
                <th className="text-center">Type</th>
                <th className="text-end">Amount</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id}>
                  <td className="text-white/50 text-xs whitespace-nowrap">{tx.date}</td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                        tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"
                      )}>
                        {tx.type === "income"
                          ? <ArrowUpRight size={13} className="text-emerald-400" />
                          : <ArrowDownRight size={13} className="text-red-400" />
                        }
                      </div>
                      <span className="font-medium text-white/85 text-xs">{tx.description}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="badge badge-gray text-xs">{tx.category}</span>
                  </td>
                  <td className="text-center font-mono text-sky-400/70 text-xs">{tx.reference}</td>
                  <td className="text-center text-white/50 text-xs">{tx.bank}</td>
                  <td className="text-center">
                    <span className={cn("badge text-xs", tx.type === "income" ? "badge-green" : "badge-red")}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={cn(
                    "text-end font-bold text-sm",
                    tx.type === "income" ? "text-emerald-400" : "text-red-400"
                  )}>
                    {tx.type === "income" ? "+" : "-"}৳{tx.amount.toLocaleString()}
                  </td>
                  <td className="text-center">
                    <span className={cn("badge text-xs", tx.status === "completed" ? "badge-green" : "badge-amber")}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">
            No transactions found
          </div>
        )}

        <div className="p-4 border-t border-white/05 flex items-center justify-between">
          <p className="text-xs text-white/30">Showing {filtered.length} of {sampleTransactions.length} transactions</p>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs py-1.5 px-3">← Prev</button>
            <button className="btn-secondary text-xs py-1.5 px-3">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
