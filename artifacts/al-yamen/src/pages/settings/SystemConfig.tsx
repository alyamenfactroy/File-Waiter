import { useLanguage } from "@/contexts/LanguageContext";
import { Settings, Save, Building2, Globe, Bell, Lock, Printer, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function SystemConfig() {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);

  const [config, setConfig] = useState({
    businessName: "Al-Yamen Trading Co.",
    address: "Purana Paltan, Dhaka-1000",
    phone: "+880 1234-567890",
    email: "info@alyamen.com",
    currency: "BDT",
    taxRate: "15",
    invoicePrefix: "INV-",
    receiptFooter: "Thank you for your business!",
    lowStockAlert: true,
    emailNotifications: true,
    smsAlerts: false,
    autoBackup: true,
    language: "bn",
    timezone: "Asia/Dhaka",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/05">
        <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/15 flex items-center justify-center text-sky-400">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );

  const Toggle = ({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-white/80">{label}</p>
        <p className="text-xs text-white/35 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${value ? "bg-sky-500" : "bg-white/10"}`}
      >
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${value ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-5 page-enter">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-base font-bold text-white">{t("nav.system_config")}</h1>
          <p className="text-xs text-white/40 mt-0.5">Configure your system settings</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><RefreshCw size={14} /> Reset</button>
          <button onClick={handleSave} className={`btn-primary ${saved ? "bg-emerald-500/20 text-emerald-400" : ""}`}>
            {saved ? <><RefreshCw size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Business Information" icon={<Building2 size={15} />}>
          <Field label="Business Name">
            <input className="form-input" value={config.businessName} onChange={e => setConfig({...config, businessName: e.target.value})} />
          </Field>
          <Field label="Address">
            <input className="form-input" value={config.address} onChange={e => setConfig({...config, address: e.target.value})} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone">
              <input className="form-input" value={config.phone} onChange={e => setConfig({...config, phone: e.target.value})} />
            </Field>
            <Field label="Email">
              <input className="form-input" value={config.email} onChange={e => setConfig({...config, email: e.target.value})} />
            </Field>
          </div>
        </Section>

        <Section title="Regional Settings" icon={<Globe size={15} />}>
          <Field label="Language">
            <select className="form-input form-select" value={config.language} onChange={e => setConfig({...config, language: e.target.value})}>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="en">English</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </Field>
          <Field label="Currency">
            <select className="form-input form-select" value={config.currency} onChange={e => setConfig({...config, currency: e.target.value})}>
              <option value="BDT">BDT — Bangladeshi Taka (৳)</option>
              <option value="USD">USD — US Dollar ($)</option>
              <option value="SAR">SAR — Saudi Riyal (﷼)</option>
            </select>
          </Field>
          <Field label="Timezone">
            <select className="form-input form-select" value={config.timezone} onChange={e => setConfig({...config, timezone: e.target.value})}>
              <option value="Asia/Dhaka">Asia/Dhaka (UTC+6)</option>
              <option value="Asia/Riyadh">Asia/Riyadh (UTC+3)</option>
              <option value="UTC">UTC</option>
            </select>
          </Field>
          <Field label="Tax Rate (%)">
            <input type="number" className="form-input" value={config.taxRate} onChange={e => setConfig({...config, taxRate: e.target.value})} />
          </Field>
        </Section>

        <Section title="Notifications" icon={<Bell size={15} />}>
          <Toggle label="Low Stock Alerts" desc="Get notified when stock falls below minimum" value={config.lowStockAlert} onChange={v => setConfig({...config, lowStockAlert: v})} />
          <div className="divider" />
          <Toggle label="Email Notifications" desc="Receive important updates via email" value={config.emailNotifications} onChange={v => setConfig({...config, emailNotifications: v})} />
          <div className="divider" />
          <Toggle label="SMS Alerts" desc="Send SMS for critical alerts" value={config.smsAlerts} onChange={v => setConfig({...config, smsAlerts: v})} />
          <div className="divider" />
          <Toggle label="Auto Backup" desc="Daily automatic data backup" value={config.autoBackup} onChange={v => setConfig({...config, autoBackup: v})} />
        </Section>

        <Section title="Invoice & Printing" icon={<Printer size={15} />}>
          <Field label="Invoice Prefix">
            <input className="form-input" value={config.invoicePrefix} onChange={e => setConfig({...config, invoicePrefix: e.target.value})} />
          </Field>
          <Field label="Receipt Footer Message">
            <textarea
              className="form-input resize-none"
              rows={3}
              value={config.receiptFooter}
              onChange={e => setConfig({...config, receiptFooter: e.target.value})}
            />
          </Field>
          <div className="flex gap-2">
            <button className="btn-secondary flex-1 text-xs">Print Test Receipt</button>
            <button className="btn-secondary flex-1 text-xs">Preview Invoice</button>
          </div>
        </Section>
      </div>
    </div>
  );
}
