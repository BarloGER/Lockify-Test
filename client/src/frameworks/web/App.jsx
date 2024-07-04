import { useMemo } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { UserInteractor } from "../../usecases/user/UserInteractor.js";
import { UserRepository } from "../../interface-adapters/repositories/UserRepository.js";

import { AuthProvider } from "../../interface-adapters/context/AuthContext.jsx";
import { GlobalLayout, ProtectedLayout } from "./layouts/index.js";
import {
  AccountsPage,
  BlockedPage,
  DashboardPage,
  DataVaultPage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  UserProfile,
  VerificationPage,
} from "../../interface-adapters/components/Pages/index.js";

export const App = () => {
  const userRepository = useMemo(() => new UserRepository(), []);
  const userInteractor = useMemo(
    () => new UserInteractor(userRepository),
    [userRepository]
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<GlobalLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirm-email" element={<VerificationPage />} />
        <Route path="/blocked" element={<BlockedPage />} />
        <Route path="/auth" element={<ProtectedLayout />}>
          <Route path="data-vault" element={<DataVaultPage />}>
            <Route path="accounts" element={<AccountsPage />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <AuthProvider userInteractor={userInteractor}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
