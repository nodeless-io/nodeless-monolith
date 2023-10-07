import React from "react";
import SettingsLayout from "../components/SettingsLayout";
import ProfileNotificationsContent from "./components/ProfileNotificationsContent";
import { UserNotificationContextProvider } from "../../../contexts/user/UserNotificationContext";

function ProfileNotifications() {
  return (
    <SettingsLayout>
      <UserNotificationContextProvider>
        <ProfileNotificationsContent />
      </UserNotificationContextProvider>
    </SettingsLayout>
  );
}

export default ProfileNotifications;
