<?php

namespace App\Repositories;

use App\Models\NotificationSetting;
use App\Models\User;
use Exception;

class NotificationSettingRepository
{
    public function update(User $user, array $data): NotificationSetting
    {
        if (!$user->notification_setting) {
            return $user->notification_setting()->create($data);
        }

        $user->notification_setting()->update($data);

        return $user->notification_setting;
    }
}
