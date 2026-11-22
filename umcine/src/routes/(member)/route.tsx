import { createFileRoute } from "@tanstack/react-router";
import MemberLayout from "../../components/layout/member-layout.tsx";

// (member) 그룹의 공통 레이아웃 라우트예요.
// 괄호 폴더는 URL에 포함되지 않으므로 하위 페이지 주소는 그대로 /me, /me/edit 예요.
export const Route = createFileRoute("/(member)")({
  component: MemberLayout,
});
