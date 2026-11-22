import { createFileRoute } from "@tanstack/react-router";
import ProfileEditPage from "../../../pages/profile/profile-edit-page.tsx";

export const Route = createFileRoute("/(member)/me/edit")({
  component: ProfileEditPage,
});
