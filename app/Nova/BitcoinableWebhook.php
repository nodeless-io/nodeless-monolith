<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\MorphTo;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class BitcoinableWebhook extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\BitcoinableWebhook>
     */
    public static $model = \App\Models\BitcoinableWebhook::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'url';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'url',
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
            Text::make('uuid')->readonly(),
            Text::make('url'),
            MorphTo::make('Bitcoinable Webhook', 'bitcoinable_webhook')->types([
               Store::class,
               DonationPage::class,
               Paywall::class,
               Inbox::class,
            ]),

            Select::make('status')->options([
                'active' => 'Active',
                'inactive' => 'Inactive',
            ])->displayUsingLabels(),
            // use the best field for an array of items
            Text::make('events')->hideFromIndex(),
            DateTime::make('Created At')->sortable()->readonly(),
            DateTime::make('Updated At')->sortable()->readonly(),
            DateTime::make('Last Delivery At')->hideFromIndex()->readonly(),
            DateTime::make('Deleted At')->hideFromIndex()->readonly(),

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
