import { useLanguage } from "@/contexts/LanguageContext";
import { sampleProducts } from "@/data/sampleData";
import { cn } from "@/lib/utils";
import { Package, Search, AlertTriangle, Plus, Download, Edit2, Trash2, XCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const statusConfig: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  active: { label: "In Stock", cls: "badge-green", icon: <CheckCircle size={10} /> },
  low_stock: { label: "Low Stock", cls: "badge-amber", icon: <AlertTriangle size={10} /> },
  out_of_stock: { label: "Out of Stock", cls: "badge-red", icon: <XCircle size={10} /> },
};

export default function StockList() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = sampleProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const lowStock = sampleProducts.filter(p => p.status === "low_stock").length;
  const outOfStock = sampleProducts.filter(p => p.status === "out_of_stock").length;
  const totalValue = sampleProducts.reduce((a, p) => a + p.stock * p.price, 0);

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.stock_list")}</h1>
          <p className="text-xs text-white/40 mt-0.5">{sampleProducts.length} products tracked</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download size={14} /> Export</button>
          <Link href="/inventory/add-product" className="btn-primary"><Plus size={14} /> Add Product</Link>
        </div>
      </div>

      {/* Alert Banners */}
      {(lowStock > 0 || outOfStock > 0) && (
        <div className="flex flex-wrap gap-3">
          {outOfStock > 0 && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-red-500/08 border border-red-500/20 text-sm text-red-400">
              <XCircle size={14} /> <span className="font-medium">{outOfStock} product(s) out of stock!</span>
            </div>
          )}
          {lowStock > 0 && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-500/08 border border-amber-500/20 text-sm text-amber-400">
              <AlertTriangle size={14} /> <span className="font-medium">{lowStock} product(s) running low</span>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { label: "Total Products", value: sampleProducts.length, color: "text-sky-400", icon: <Package size={16} /> },
          { label: "Stock Value", value: `৳${(totalValue/1000).toFixed(0)}K`, color: "text-emerald-400", icon: <CheckCircle size={16} /> },
          { label: "Low Stock", value: lowStock, color: "text-amber-400", icon: <AlertTriangle size={16} /> },
          { label: "Out of Stock", value: outOfStock, color: "text-red-400", icon: <XCircle size={16} /> },
        ].map(c => (
          <div key={c.label} className="glass-card p-4 stat-card flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", c.color, "bg-current bg-opacity-10")}>
              <span className={c.color}>{c.icon}</span>
            </div>
            <div>
              <p className={cn("text-lg font-bold", c.color)}>{c.value}</p>
              <p className="text-xs text-white/40">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/05 flex flex-wrap gap-3 items-center">
          <div className="search-bar flex-1 min-w-[200px]">
            <Search size={13} className="text-white/30 flex-shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." />
          </div>
          <div className="flex gap-2">
            {["all", "active", "low_stock", "out_of_stock"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-lg transition-all font-medium capitalize",
                  statusFilter === s
                    ? "bg-sky-400/15 text-sky-400 border border-sky-400/25"
                    : "text-white/45 hover:text-white hover:bg-white/05"
                )}
              >
                {s === "all" ? "All" : s === "low_stock" ? "Low Stock" : s === "out_of_stock" ? "Out of Stock" : "In Stock"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-start">Product</th>
                <th className="text-start">SKU</th>
                <th className="text-center">Category</th>
                <th className="text-center">Supplier</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Min</th>
                <th className="text-end">Buy Price</th>
                <th className="text-end">Sell Price</th>
                <th className="text-end">Value</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const sc = statusConfig[p.status];
                const stockPct = Math.min((p.stock / Math.max(p.minStock * 3, 1)) * 100, 100);
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/15 flex items-center justify-center flex-shrink-0">
                          <Package size={13} className="text-sky-400/70" />
                        </div>
                        <span className="font-semibold text-white/85">{p.name}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-sky-400/70">{p.sku}</td>
                    <td className="text-center">
                      <span className="badge badge-gray text-xs">{p.category}</span>
                    </td>
                    <td className="text-center text-white/50 text-xs">{p.supplier}</td>
                    <td className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={cn("font-bold text-sm",
                          p.stock === 0 ? "text-red-400" : p.stock < p.minStock ? "text-amber-400" : "text-white/80"
                        )}>
                          {p.stock}
                        </span>
                        <div className="w-16 progress-bar">
                          <div
                            className={cn("progress-fill", p.stock === 0 ? "bg-red-400" : p.stock < p.minStock ? "bg-amber-400" : "bg-emerald-400")}
                            style={{ width: `${stockPct}%`, opacity: 0.7 }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-center text-white/45 text-xs">{p.minStock}</td>
                    <td className="text-end text-white/60">৳{p.purchasePrice.toLocaleString()}</td>
                    <td className="text-end font-semibold text-white/80">৳{p.price.toLocaleString()}</td>
                    <td className="text-end font-bold text-white/85">৳{(p.stock * p.price).toLocaleString()}</td>
                    <td className="text-center">
                      <span className={cn("badge text-xs gap-1", sc.cls)}>
                        {sc.icon} {sc.label}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="btn-icon text-sky-400/60 hover:text-sky-400 hover:bg-sky-400/10">
                          <Edit2 size={12} />
                        </button>
                        <button className="btn-icon text-red-400/60 hover:text-red-400 hover:bg-red-400/10">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">No products found</div>
        )}
      </div>
    </div>
  );
}
