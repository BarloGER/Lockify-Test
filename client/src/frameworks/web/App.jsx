import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AuthProvider } from "../../interface-adapters/context/AuthContext.jsx";
import { DataVaultProvider } from "../../interface-adapters/context/DataVaultContext.jsx";
import { DesignProvider } from "../../interface-adapters/context/DesignContext";
import { GlobalLayout, ProtectedLayout } from "./layouts/index.js";
import {
  AccountsPage,
  AuthenticationPage,
  BanksPage,
  BlockedPage,
  ContactsPage,
  DashboardPage,
  DataVaultPage,
  ForgotPasswordPage,
  LandingPage,
  NotesPage,
  RegisterPage,
  SupportPage,
  UserProfilePage,
  VerificationPage,
} from "../../interface-adapters/components/Pages/index.js";

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<GlobalLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirm-email" element={<VerificationPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/blocked" element={<BlockedPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/data-vault" element={<DataVaultPage />} />
          <Route path="/data-vault/dashboard" element={<DashboardPage />} />
          <Route path="/data-vault/accounts" element={<AccountsPage />} />
          <Route path="/data-vault/notes" element={<NotesPage />} />
          <Route path="/data-vault/contacts" element={<ContactsPage />} />
          <Route path="/data-vault/banks" element={<BanksPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <AuthProvider>
      <DataVaultProvider>
        <DesignProvider>
          <RouterProvider router={router} />
        </DesignProvider>
      </DataVaultProvider>
    </AuthProvider>
  );
};
