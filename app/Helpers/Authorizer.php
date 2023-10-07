<?php

namespace App\Helpers;

class Authorizer
{
    public function getModelByUuid($model, $uuid): object
    {
        return $model::where('uuid', $uuid)->first();
    }

    public function authorize($model, $uuid): bool
    {
        $model = $this->getModelByUuid($model, $uuid);
        return $model->user_id === auth()->user()->id;
    }
}
