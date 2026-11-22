import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../api/auth/login";
import { useAuthStore } from "../stores/auth-store";

export function useLoginMutation() {
  const client = useQueryClient();
  const navigate = useNavigate();
  return useMutation({ mutationFn: login,
    onSuccess: async (response, variables) => {
      await client.cancelQueries({ predicate: (query) => query.queryKey[0] !== "movies" });
      client.removeQueries({ predicate: (query) => query.queryKey[0] !== "movies" });
      useAuthStore.getState().login(response.result.accessToken, variables.email);
      await client.invalidateQueries({ queryKey: ["members", "me"] });
      void navigate({ to: "/" });
    },
  });
}
