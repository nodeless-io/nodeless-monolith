<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Inbox extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Inbox>
     */
    public static $model = \App\Models\Inbox::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'username';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'username',
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            ID::make()->sortable(),
            Text::make('UUID', 'uuid')->sortable(),
            Text::make('Username', 'username')->sortable(),
            Text::make('Email', 'email')->sortable(),
            Number::make('Price', 'price')->sortable()->displayUsing(function ($price) {
                return number_format($price);
            }),
            Text::make('Nostr nPub', 'nostr_npub')->hideFromIndex(),
            Text::make('Nostr hexPub', 'nostr_hexpub')->hideFromIndex(),
            BelongsTo::make('User', 'user', User::class)->sortable(),
            HasMany::make('Requests', 'requests', GatedMessageRequest::class)->hideFromIndex(),
            HasMany::make('Messages', 'messages', GatedMessage::class)->hideFromIndex(),
            DateTime::make('Created At', 'created_at')->sortable()->readonly(),
            DateTime::make('Updated At', 'updated_at')->sortable()->readonly(),
            HasMany::make('Transactions')
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function cards(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function filters(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function lenses(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function actions(NovaRequest $request)
    {
        return [];
    }
}
