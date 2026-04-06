import { useLanguage } from "@/contexts/LanguageContext";
import { sampleOrders } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { ShoppingBag, Search, Plus, Download, Eye, CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const statusConfig: Record<string, { cls: string; icon: React.ReactNode; label: string }> = {
  completed: { cls: "badge-green", icon: <CheckCircle size={10} />, label: "Completed" },
  pending:   { cls: "badge-amber", icon: <Clock size={10} />,        label: "Pending"   },
  processing:{ cls: "badge-blue",  icon: <Truck size={10} />,        label: "Processing"},
  cancelled: { cls: "badge-red",   icon: <XCircle size={10} />,      label: "Cancelled" },
};

export default function OrderHistory() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = sampleOrders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = sampleOrders.filter(o => o.status === "completed").reduce((a, o) => a + o.amount, 0);

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.order_history")}</h1>
          <p className="text-xs text-white/40 mt-0.5">{sampleOrders.length} total orders</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download size={14} /> Export</button>
          <Link href="/sales/new-order" className="btn-primary"><Plus size={14} /> New Order</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Orders", value: sampleOrders.length, color: "text-sky-400 bg-sky-400/10" },
          { label: "Completed", value: sampleOrders.filter(o => o.status === "completed").length, color: "text-emerald-400 bg-emerald-400/10" },
          { label: "Pending", value: sampleOrders.filter(o => o.status === "pending").length, color: "text-amber-400 bg-amber-400/10" },
          { label: "Revenue", value: `৳${(totalRevenue / 1000).toFixed(0)}K`, color: "text-purple-400 bg-purple-400/10" },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 stat-card">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-2", s.color)}>
              <ShoppingBag size={16} />
            </div>
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="search-bar flex-1 min-w-[200px]">
          <Search size={13} className="text-white/30 flex-shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "completed", "pending", "processing", "cancelled"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-lg capitalize transition-all font-medium",
                statusFilter === s
                  ? "bg-sky-400/15 text-sky-400 border border-sky-400/25"
                  : "text-white/45 hover:text-white hover:bg-white/05"
              )}
            >
              {s}
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
                <th className="text-start">Order ID</th>
                <th className="text-start">Customer</th>
                <th className="text-center">Date</th>
                <th className="text-center">Items</th>
                <th className="text-center">Payment</th>
                <th className="text-end">Amount</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const sc = statusConfig[order.status] || statusConfig.pending;
                return (
                  <tr key={order.id}>
                    <td>
                      <span className="font-mono text-sky-400/80 font-semibold text-xs">{order.id}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/15 flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-white/80">{order.customer}</span>
                      </div>
                    </td>
                    <td className="text-center text-white/45 text-xs whitespace-nowrap">{order.date}</td>
                    <td className="text-center">
                      <span className="badge badge-gray">{order.items} items</span>
                    </td>
                    <td className="text-center text-white/50 text-xs capitalize">{order.paymentMethod}</td>
                    <td className="text-end font-bold text-white/85">৳{order.amount.toLocaleString()}</td>
                    <td className="text-center">
                      <span className={cn("badge text-xs gap-1", sc.cls)}>
                        {sc.icon} {sc.label}
                      </span>
                    </td>
                    <td className="text-center">
                      <button className="btn-icon text-sky-400/60 hover:text-sky-400 hover:bg-sky-400/10">
                        <Eye size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">No orders found</div>
        )}
      </div>
    </div>
  );
}
