import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login";

// Pages — Core
import Dashboard from "@/pages/Dashboard";
import AddTransaction from "@/pages/transactions/AddTransaction";
import AllTransactions from "@/pages/transactions/AllTransactions";
import RecentTransactions from "@/pages/transactions/RecentTransactions";

// Pages — Sales
import NewOrder from "@/pages/sales/NewOrder";
import OrderHistory from "@/pages/sales/OrderHistory";
import Customers from "@/pages/sales/Customers";

// Pages — Purchase
import NewPurchase from "@/pages/purchase/NewPurchase";
import PurchaseHistory from "@/pages/purchase/PurchaseHistory";
import Suppliers from "@/pages/purchase/Suppliers";

// Pages — Inventory
import AddProduct from "@/pages/inventory/AddProduct";
import AddCompany from "@/pages/inventory/AddCompany";
import StockList from "@/pages/inventory/StockList";
import Categories from "@/pages/inventory/Categories";

// Pages — HR
import Employees from "@/pages/hr/Employees";
import Payroll from "@/pages/hr/Payroll";
import Attendance from "@/pages/hr/Attendance";

// Pages — CRM
import Loyalty from "@/pages/crm/Loyalty";

// Pages — Accounting
import DailyLedger from "@/pages/accounting/DailyLedger";
import ExpenseReport from "@/pages/accounting/ExpenseReport";
import BankAccounts from "@/pages/accounting/BankAccounts";

// Pages — Reports
import ProfitLoss from "@/pages/reports/ProfitLoss";
import SalesReport from "@/pages/reports/SalesReport";
import StockReport from "@/pages/reports/StockReport";

// Pages — Settings
import SystemConfig from "@/pages/settings/SystemConfig";
import UserRoles from "@/pages/settings/UserRoles";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AuthenticatedApp() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(222 47% 7%)" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center animate-pulse shadow-lg shadow-sky-500/25">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-sky-400/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Layout>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/transactions/add" component={AddTransaction} />
          <Route path="/transactions/all" component={AllTransactions} />
          <Route path="/transactions/recent" component={RecentTransactions} />
          <Route path="/sales/new-order" component={NewOrder} />
          <Route path="/sales/order-history" component={OrderHistory} />
          <Route path="/sales/customers" component={Customers} />
          <Route path="/purchase/new" component={NewPurchase} />
          <Route path="/purchase/history" component={PurchaseHistory} />
          <Route path="/purchase/suppliers" component={Suppliers} />
          <Route path="/inventory/add-product" component={AddProduct} />
          <Route path="/inventory/add-company" component={AddCompany} />
          <Route path="/inventory/stock-list" component={StockList} />
          <Route path="/inventory/categories" component={Categories} />
          <Route path="/hr/employees" component={Employees} />
          <Route path="/hr/payroll" component={Payroll} />
          <Route path="/hr/attendance" component={Attendance} />
          <Route path="/crm/customers" component={Customers} />
          <Route path="/crm/loyalty" component={Loyalty} />
          <Route path="/accounting/daily-ledger" component={DailyLedger} />
          <Route path="/accounting/expense-report" component={ExpenseReport} />
          <Route path="/accounting/bank-accounts" component={BankAccounts} />
          <Route path="/reports/profit-loss" component={ProfitLoss} />
          <Route path="/reports/sales-report" component={SalesReport} />
          <Route path="/reports/stock-report" component={StockReport} />
          <Route path="/settings/system" component={SystemConfig} />
          <Route path="/settings/user-roles" component={UserRoles} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <AuthenticatedApp />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
