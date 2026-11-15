import { createFileRoute } from "@tanstack/react-router";
import { MyPage } from "../pages/account/my-page";

export const Route = createFileRoute("/mypage")({ component: MyPage });
