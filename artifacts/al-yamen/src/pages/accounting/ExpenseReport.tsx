import { useLanguage } from "@/contexts/LanguageContext";
import { categoryExpenses, monthlyData } from "@/data/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart3, Download, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExpenseReport() {
  const { t } = useLanguage();

  const totalExpense = categoryExpenses.reduce((a, b) => a + b.value, 0);
  const monthlyExpenseTotal = monthlyData.reduce((a, b) => a + b.expense, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="glass-panel rounded-xl p-3 border border-white/10 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="text-red-400 font-semibold">৳{payload[0]?.value?.toLocaleString()}</p>
      </div>
    );
  };

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.expense_report")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Monthly expense breakdown</p>
        </div>
        <button className="btn-secondary"><Download size={14} /> Export</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "This Month", value: `৳${(totalExpense / 1000).toFixed(0)}K`, color: "text-red-400 bg-red-400/10", icon: <TrendingDown size={16} /> },
          { label: "This Period", value: `৳${(monthlyExpenseTotal / 1000).toFixed(0)}K`, color: "text-amber-400 bg-amber-400/10", icon: <BarChart3 size={16} /> },
          { label: "Avg Monthly", value: `৳${Math.round(monthlyExpenseTotal / monthlyData.length / 1000)}K`, color: "text-sky-400 bg-sky-400/10", icon: <BarChart3 size={16} /> },
          { label: "Categories", value: categoryExpenses.length, color: "text-purple-400 bg-purple-400/10", icon: <TrendingUp size={16} /> },
        ].map(c => (
          <div key={c.label} className="glass-card p-4 stat-card">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-2", c.color)}>{c.icon}</div>
            <p className="text-xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Bar Chart */}
        <div className="lg:col-span-2 glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-4">Monthly Expense Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v / 1000}K`} width={45} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="expense" name="Expense" fill="rgba(248,113,113,0.55)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-3">By Category</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={categoryExpenses} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {categoryExpenses.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: any) => `৳${v.toLocaleString()}`} contentStyle={{ background: "rgba(10,15,30,0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryExpenses.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-white/55 flex-1 truncate">{item.name}</span>
                <span className="text-xs font-semibold text-white/75">৳{item.value.toLocaleString()}</span>
                <span className="text-xs text-white/30">{((item.value / totalExpense) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/05">
          <h3 className="text-sm font-bold text-white">Expense Category Breakdown</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th className="text-start">Category</th>
              <th className="text-end">Amount</th>
              <th className="text-center">% of Total</th>
              <th className="text-start w-48">Distribution</th>
            </tr>
          </thead>
          <tbody>
            {categoryExpenses.map(item => (
              <tr key={item.name}>
                <td>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-white/85">{item.name}</span>
                  </div>
                </td>
                <td className="text-end font-bold text-white/80">৳{item.value.toLocaleString()}</td>
                <td className="text-center">
                  <span className="badge badge-gray">{((item.value / totalExpense) * 100).toFixed(1)}%</span>
                </td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(item.value / totalExpense) * 100}%`, backgroundColor: item.color, opacity: 0.7 }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-white/03">
              <td className="px-4 py-3 font-bold text-white/60 uppercase text-xs tracking-wider">Total</td>
              <td className="px-4 py-3 text-end font-bold text-white">৳{totalExpense.toLocaleString()}</td>
              <td className="px-4 py-3 text-center"><span className="badge badge-blue">100%</span></td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
