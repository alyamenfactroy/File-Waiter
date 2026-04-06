import { Menu, Bell, Globe, Search, X, CheckCircle, AlertTriangle, Info, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { sampleNotifications } from "@/data/sampleData";
import { Link } from "wouter";

interface HeaderProps {
  onMenuClick: () => void;
  pageTitle: string;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

const notifIcon: Record<string, React.ReactNode> = {
  warning: <AlertTriangle size={13} className="text-amber-400" />,
  success: <CheckCircle size={13} className="text-emerald-400" />,
  info: <Info size={13} className="text-sky-400" />,
};
const notifDot: Record<string, string> = {
  warning: "bg-amber-400",
  success: "bg-emerald-400",
  info: "bg-sky-400",
};

export default function Header({ onMenuClick, pageTitle }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const current = languages.find(l => l.code === language);
  const unreadCount = sampleNotifications.filter(n => !n.read).length;

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-dropdown]")) {
        setLangOpen(false);
        setNotifOpen(false);
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const roleColor: Record<string, string> = {
    admin: "from-sky-400 to-indigo-500",
    manager: "from-emerald-400 to-teal-500",
    cashier: "from-purple-400 to-pink-500",
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-white/05 glass-panel sticky top-0 z-30 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/05 transition-colors"
          data-testid="button-mobile-menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-white leading-tight">{pageTitle}</h2>
          <p className="text-xs text-white/30 hidden sm:block">
            {new Date().toLocaleDateString(language === "ar" ? "ar-SA" : language === "bn" ? "bn-BD" : "en-US", {
              weekday: "long", day: "numeric", month: "long"
            })}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">

        {/* Search */}
        <div className={cn(
          "flex items-center gap-2 rounded-xl border transition-all duration-300 overflow-hidden",
          searchOpen
            ? "w-48 md:w-64 bg-white/05 border-sky-400/30 px-3 py-2"
            : "w-9 h-9 bg-transparent border-transparent justify-center cursor-pointer"
        )}>
          {searchOpen ? (
            <>
              <Search size={14} className="text-white/40 flex-shrink-0" />
              <input
                ref={searchRef}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder={t("common.search") + "..."}
                className="bg-transparent border-none outline-none text-sm text-white/85 flex-1 placeholder:text-white/28 font-[inherit]"
              />
              <button onClick={() => { setSearchOpen(false); setSearchVal(""); }} className="text-white/30 hover:text-white flex-shrink-0">
                <X size={13} />
              </button>
            </>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-white/50 hover:text-white p-2">
              <Search size={16} />
            </button>
          )}
        </div>

        {/* Language Switcher */}
        <div className="relative" data-dropdown>
          <button
            onClick={() => { setLangOpen(!langOpen); setNotifOpen(false); setUserOpen(false); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-card hover:bg-white/08 transition-all text-white/75 hover:text-white text-sm"
            data-testid="button-language-switcher"
          >
            <Globe size={14} className="text-sky-400" />
            <span className="hidden sm:inline text-xs font-medium">{current?.flag} {current?.label}</span>
            <span className="sm:hidden text-base">{current?.flag}</span>
          </button>

          {langOpen && (
            <div className="absolute end-0 mt-2 z-50 min-w-[150px] glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/08 animate-fade-in">
              <div className="px-4 py-2.5 border-b border-white/05">
                <p className="text-xs text-white/35 font-medium uppercase tracking-wider">Language</p>
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-start",
                    language === lang.code
                      ? "bg-sky-400/10 text-sky-400"
                      : "text-white/65 hover:bg-white/05 hover:text-white"
                  )}
                  data-testid={`button-lang-${lang.code}`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-medium text-xs">{lang.label}</span>
                  {language === lang.code && <span className="ms-auto w-1.5 h-1.5 rounded-full bg-sky-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" data-dropdown>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setLangOpen(false); setUserOpen(false); }}
            className="relative p-2.5 rounded-xl glass-card hover:bg-white/08 transition-all text-white/55 hover:text-white"
            data-testid="button-notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 end-1.5 min-w-[14px] h-[14px] rounded-full bg-sky-400 text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-[hsl(222_47%_7%)]">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute end-0 mt-2 z-50 w-80 glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/08 animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/05">
                <div>
                  <p className="text-sm font-semibold text-white">Notifications</p>
                  <p className="text-xs text-white/35">{unreadCount} unread</p>
                </div>
                <button className="text-xs text-sky-400 hover:text-sky-300 font-medium">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {sampleNotifications.map((n) => (
                  <div key={n.id} className={cn(
                    "flex gap-3 px-4 py-3 border-b border-white/03 transition-colors hover:bg-white/03",
                    !n.read && "bg-white/02"
                  )}>
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                      n.type === "warning" ? "bg-amber-500/10" : n.type === "success" ? "bg-emerald-500/10" : "bg-sky-500/10"
                    )}>
                      {notifIcon[n.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn("text-xs font-semibold", !n.read ? "text-white" : "text-white/60")}>{n.title}</p>
                        {!n.read && <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1", notifDot[n.type])} />}
                      </div>
                      <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{n.message}</p>
                      <p className="text-xs text-white/25 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-white/05 text-center">
                <button className="text-xs text-sky-400 hover:text-sky-300 font-medium">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" data-dropdown>
          <button
            onClick={() => { setUserOpen(!userOpen); setLangOpen(false); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2.5 py-2 rounded-xl glass-card hover:bg-white/08 transition-all"
          >
            <div className={cn(
              "w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-white font-bold text-xs",
              roleColor[user?.role || "admin"] || "from-sky-400 to-indigo-500"
            )}>
              {user?.avatar || "A"}
            </div>
            <div className="hidden md:block text-start">
              <p className="text-xs font-semibold text-white leading-none">{user?.name?.split(" ")[0] || "Admin"}</p>
              <p className="text-xs text-white/35 mt-0.5 capitalize">{user?.role || "Admin"}</p>
            </div>
            <ChevronDown size={12} className={cn("text-white/35 transition-transform", userOpen && "rotate-180")} />
          </button>

          {userOpen && (
            <div className="absolute end-0 mt-2 z-50 w-52 glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/08 animate-fade-in">
              <div className="px-4 py-3 border-b border-white/05">
                <div className="flex items-center gap-2.5">
                  <div className={cn(
                    "w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm",
                    roleColor[user?.role || "admin"] || "from-sky-400 to-indigo-500"
                  )}>
                    {user?.avatar || "A"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                    <p className="text-xs text-white/35 truncate capitalize">{user?.role} — {user?.branch}</p>
                  </div>
                </div>
              </div>
              <Link href="/settings/system"
                onClick={() => setUserOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-white/60 hover:text-white hover:bg-white/05 transition-colors"
              >
                <Settings size={14} className="text-white/35" />
                Settings
              </Link>
              <div className="border-t border-white/05">
                <button
                  onClick={() => { logout(); setUserOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/08 transition-colors text-start"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
