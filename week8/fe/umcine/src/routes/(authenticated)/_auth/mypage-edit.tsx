import { createFileRoute } from "@tanstack/react-router";
import { EditMyPage } from "../../../pages/account/edit-my-page";
export const Route = createFileRoute("/(authenticated)/_auth/mypage-edit")({ component: EditMyPage });
