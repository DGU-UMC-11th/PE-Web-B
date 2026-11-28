import { createFileRoute } from "@tanstack/react-router";
import { MyPageEdit } from "@/pages/auth/my-page-edit";

export const Route = createFileRoute("/me/edit")({ component: MyPageEdit });
