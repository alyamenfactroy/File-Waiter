import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, EyeOff, LogIn, TrendingUp, Globe, Shield, BarChart3, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_CREDS = [
  { role: "Admin", email: "admin@alyamen.com", password: "admin123", color: "text-sky-400 bg-sky-400/10 border-sky-400/20" },
  { role: "Manager", email: "manager@alyamen.com", password: "manager123", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  { role: "Cashier", email: "cashier@alyamen.com", password: "cashier123", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
];

const features = [
  { icon: <BarChart3 size={18} />, label: "Real-time Analytics" },
  { icon: <Shield size={18} />, label: "Secure & Encrypted" },
  { icon: <Zap size={18} />, label: "Lightning Fast" },
  { icon: <Globe size={18} />, label: "3 Languages" },
];

export default function Login() {
  const { login } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("al-yamen-remember");
    if (saved) {
      const { email: e, password: p } = JSON.parse(saved);
      setEmail(e || "");
      setPassword(p || "");
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setError("");
    setLoading(true);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || "Login failed");
      setLoading(false);
    } else {
      if (rememberMe) {
        localStorage.setItem("al-yamen-remember", JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem("al-yamen-remember");
      }
    }
  };

  const fillCred = (cred: typeof DEMO_CREDS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError("");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "hsl(222 47% 7%)" }}>
      {/* Left Panel — Hero */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden p-12">
        {/* Background Glows */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)" }} />
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)" }} />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <TrendingUp size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">আল-ইয়ামেন</h1>
              <p className="text-xs text-white/40">Business Management System</p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-400/10 border border-sky-400/20 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs text-sky-400 font-medium">Version 2.0 — Fully Upgraded</span>
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                সম্পূর্ণ ব্যবসায়িক<br />
                <span className="gradient-text">ব্যবস্থাপনা সিস্টেম</span>
              </h2>
              <p className="text-base text-white/50 leading-relaxed mb-8">
                বিক্রয়, ক্রয়, মজুদ, মানব সম্পদ, হিসাব ও প্রতিবেদন — সব এক জায়গায় পরিচালনা করুন।
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/04 border border-white/06 hover:bg-white/06 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-sky-400/10 flex items-center justify-center text-sky-400 flex-shrink-0">
                      {f.icon}
                    </div>
                    <span className="text-xs font-medium text-white/70">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-6 pt-8 border-t border-white/06">
            {[
              { label: "Modules", value: "10+" },
              { label: "Routes", value: "27+" },
              { label: "Languages", value: "3" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-xl font-bold gradient-text">{s.value}</p>
                <p className="text-xs text-white/35">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex flex-col w-full lg:w-[480px] flex-shrink-0 items-center justify-center p-6 md:p-10 relative">
        {/* Glass BG */}
        <div className="absolute inset-0 border-l border-white/05"
          style={{ background: "rgba(10,15,30,0.95)", backdropFilter: "blur(20px)" }} />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">আল-ইয়ামেন</h1>
              <p className="text-xs text-white/40">Business Management</p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-1 p-1 bg-white/04 rounded-xl border border-white/06">
              {[
                { code: "bn", flag: "🇧🇩", label: "বাং" },
                { code: "en", flag: "🇬🇧", label: "EN" },
                { code: "ar", flag: "🇸🇦", label: "ع" },
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code as any)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                    language === l.code
                      ? "bg-sky-400/15 text-sky-400 border border-sky-400/25"
                      : "text-white/40 hover:text-white"
                  )}
                >
                  <span>{l.flag}</span> {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-white mb-1.5">স্বাগতম ফিরে আসুন 👋</h2>
            <p className="text-sm text-white/45">আপনার অ্যাকাউন্টে লগইন করুন</p>
          </div>

          {/* Demo Credentials */}
          <div className="mb-6 p-4 rounded-2xl bg-white/03 border border-white/06">
            <p className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wider">Demo Accounts — click to fill</p>
            <div className="flex flex-col gap-2">
              {DEMO_CREDS.map((cred) => (
                <button
                  key={cred.role}
                  onClick={() => fillCred(cred)}
                  className={cn(
                    "flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all hover:scale-[1.01] active:scale-100",
                    cred.color
                  )}
                >
                  <span className="font-bold">{cred.role}</span>
                  <span className="opacity-70">{cred.email}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                placeholder="you@alyamen.com"
                className="form-input"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your password"
                  className="form-input pe-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 end-0 px-3.5 flex items-center text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={cn(
                    "w-4 h-4 rounded flex items-center justify-center border transition-all",
                    rememberMe ? "bg-sky-400 border-sky-400" : "border-white/20 bg-white/03"
                  )}
                >
                  {rememberMe && <span className="text-white text-[10px] font-bold">✓</span>}
                </div>
                <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-xs text-sky-400 hover:text-sky-300 transition-colors">Forgot password?</button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/08 border border-red-500/20 animate-fade-in">
                <span className="w-4 h-4 rounded-full bg-red-400/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 text-xs font-bold">!</span>
                </span>
                <p className="text-xs text-red-400 font-medium">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200",
                loading
                  ? "bg-sky-400/30 text-sky-400/60 cursor-not-allowed"
                  : "bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:from-sky-400 hover:to-indigo-400 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 hover:scale-[1.01] active:scale-100"
              )}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/05 text-center">
            <p className="text-xs text-white/25">
              © 2024 Al-Yamen Business Management System
            </p>
            <p className="text-xs text-white/18 mt-1">All data is demo data. No real information is stored.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
