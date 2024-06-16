import { useMemo } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { UserInteractor } from "../../usecases/UserInteractor.js";
import { UserRepository } from "../../interface-adapters/repositories/UserRepository.js";

import { AuthProvider } from "../../interface-adapters/context/AuthContext.jsx";
import { GlobalLayout, ProtectedLayout } from "./layouts";
import {
  DashboardPage,
  LoginPage,
  RegisterPage,
  VerificationPage,
  BlockedPage,
  ForgotPasswordPage,
} from "../../interface-adapters/components/Pages";

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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirm-email" element={<VerificationPage />} />
        <Route path="/blocked" element={<BlockedPage />} />
        <Route path="/auth" element={<ProtectedLayout />}></Route>
      </Route>
    )
  );

  return (
    <AuthProvider userInteractor={userInteractor}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
