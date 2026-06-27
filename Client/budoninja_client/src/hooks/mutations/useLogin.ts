// src/hooks/mutations/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService, LoginPayload } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../utils/getErrorMessage";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      login(data.access, data.refresh);
      toast.success("ورود با موفقیت انجام شد");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}