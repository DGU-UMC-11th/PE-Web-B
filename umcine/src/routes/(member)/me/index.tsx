import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../../../pages/profile/profile-page.tsx";

// (member) 폴더는 로그인이 필요한 페이지를 묶는 라우트 그룹이에요.
// 괄호로 감싼 폴더 이름은 URL에 포함되지 않아요. (/me)
// 로그인 여부에 따른 접근 제한(layout, beforeLoad)은 이후 주차에서 추가해요.
export const Route = createFileRoute("/(member)/me/")({
  component: ProfilePage,
});
