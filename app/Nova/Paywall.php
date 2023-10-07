<?php

namespace App\Nova;

use App\Enums\PaywallType;
use App\Nova\Filters\PaywallTypeNovaFilter;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Paywall extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Paywall>
     */
    public static $model = \App\Models\Paywall::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'name';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'uuid', 'name'
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
            Text::make('Name', 'name')->sortable(),
            Select::make('Type', 'type')->options([
                PaywallType::CONTENT->value => PaywallType::CONTENT,
                PaywallType::DOWNLOAD->value => PaywallType::DOWNLOAD,
                PaywallType::REDIRECT->value => PaywallType::REDIRECT,
                PaywallType::WP_ARTICLE->value => PaywallType::WP_ARTICLE,
            ])->sortable(),
            Number::make('Price', 'price')->sortable()->displayUsing(function ($value) {
                return number_format($value);
            }),
            BelongsTo::make('User', 'user', User::class)->sortable(),
            HasMany::make('Requests', 'paywallRequests', PaywallRequest::class)->hideFromIndex(),
            // show the total amount of paywallRequests in the table
            Number::make('Total Requests', function () {
                return $this->paywallRequests()->count();
            })->sortable()->onlyOnIndex(),
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
        return [
            new PaywallTypeNovaFilter(),
        ];
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
