<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateNotificationSettingRequest;
use App\Http\Requests\User\UpdateNotificationSettingsRequest;
use App\Repositories\NotificationSettingRepository;
use Illuminate\Http\JsonResponse;

class NotificationSettingsController extends Controller
{
    public function __construct(private NotificationSettingRepository $notificationSettingRepository)
    {
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\User\UpdateNotificationSettingRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateNotificationSettingRequest $request): JsonResponse
    {
        $user = $request->user();

        try {
            return response()->json([
                'data' => $this->notificationSettingRepository->update($user, $request->validated()),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function show(): JsonResponse
    {
        return response()->json(
            auth()->user()->notification_setting,
        );
    }
}
