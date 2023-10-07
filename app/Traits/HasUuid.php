<?php

namespace App\Traits;

trait HasUuid
{
    /**
     *  Setup model event hooks
     */
    protected static function bootHasUuid()
    {
        self::creating(function ($model) {
            $model->uuid = (string) str()->uuid();
        });
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }
}
