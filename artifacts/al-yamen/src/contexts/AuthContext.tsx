import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "cashier";
  branch: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: { email: string; password: string; user: User }[] = [
  {
    email: "admin@alyamen.com",
    password: "admin123",
    user: { id: "1", name: "Admin User", email: "admin@alyamen.com", role: "admin", branch: "Head Office", avatar: "A" },
  },
  {
    email: "manager@alyamen.com",
    password: "manager123",
    user: { id: "2", name: "Md. Abdullah", email: "manager@alyamen.com", role: "manager", branch: "Dhaka Branch", avatar: "M" },
  },
  {
    email: "cashier@alyamen.com",
    password: "cashier123",
    user: { id: "3", name: "Sumaiya Khatun", email: "cashier@alyamen.com", role: "cashier", branch: "Motijheel", avatar: "S" },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("al-yamen-user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 800));
    const match = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (match) {
      setUser(match.user);
      localStorage.setItem("al-yamen-user", JSON.stringify(match.user));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("al-yamen-user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
