import { useLanguage } from "@/contexts/LanguageContext";
import { sampleCustomers } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Users, Search, Phone, Mail, Plus, Edit2, Trash2, Star, Download } from "lucide-react";
import { useState } from "react";

export default function Customers() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = sampleCustomers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const totalRevenue = sampleCustomers.reduce((a, c) => a + c.totalPurchase, 0);
  const avgOrder = sampleCustomers.reduce((a, c) => a + c.totalPurchase, 0) / sampleCustomers.length;

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.customers")}</h1>
          <p className="text-xs text-white/40 mt-0.5">{sampleCustomers.length} registered customers</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download size={14} /> Export</button>
          <button className="btn-primary"><Plus size={14} /> Add Customer</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Customers", value: sampleCustomers.length, color: "text-sky-400 bg-sky-400/10" },
          { label: "Total Revenue", value: `৳${(totalRevenue / 1000).toFixed(0)}K`, color: "text-emerald-400 bg-emerald-400/10" },
          { label: "Avg Purchase", value: `৳${(avgOrder / 1000).toFixed(0)}K`, color: "text-purple-400 bg-purple-400/10" },
          { label: "VIP Customers", value: sampleCustomers.filter(c => c.tier === "gold" || c.tier === "platinum").length, color: "text-amber-400 bg-amber-400/10" },
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

      {/* Search */}
      <div className="search-bar w-full">
        <Search size={13} className="text-white/30 flex-shrink-0" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, or phone..." />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">Customer</th>
                <th className="text-center">Phone</th>
                <th className="text-center">Area</th>
                <th className="text-center">Orders</th>
                <th className="text-end">Total Purchase</th>
                <th className="text-end">Due Balance</th>
                <th className="text-center">Tier</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const tierCls = c.tier === "platinum" ? "badge-purple" : c.tier === "gold" ? "badge-amber" : c.tier === "silver" ? "badge-gray" : "badge-blue";
                return (
                  <tr key={c.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/15 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white/85">{c.name}</p>
                          <p className="text-xs text-white/35 flex items-center gap-1"><Mail size={9} /> {c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center text-white/55 text-xs">
                      <span className="flex items-center justify-center gap-1"><Phone size={10} /> {c.phone}</span>
                    </td>
                    <td className="text-center text-white/45 text-xs">{c.address}</td>
                    <td className="text-center font-semibold text-sky-400">{c.totalOrders}</td>
                    <td className="text-end font-bold text-white/80">৳{c.totalPurchase.toLocaleString()}</td>
                    <td className={cn("text-end font-bold", c.dueBalance > 0 ? "text-red-400" : "text-emerald-400")}>
                      {c.dueBalance > 0 ? `-৳${c.dueBalance.toLocaleString()}` : "Clear"}
                    </td>
                    <td className="text-center">
                      <span className={cn("badge text-xs gap-1 capitalize", tierCls)}>
                        {(c.tier === "gold" || c.tier === "platinum") && <Star size={9} />}
                        {c.tier}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="btn-icon text-sky-400/60 hover:text-sky-400 hover:bg-sky-400/10"><Edit2 size={12} /></button>
                        <button className="btn-icon text-red-400/60 hover:text-red-400 hover:bg-red-400/10"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">No customers found</div>
        )}
      </div>
    </div>
  );
}
