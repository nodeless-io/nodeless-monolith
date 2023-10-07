<?php

namespace App\Nova;

use App\Nova\Filters\BitcoinableStatusNovaFilter;
use App\Nova\Filters\DonationStatus;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\HasOne;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Donation extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Donation>
     */
    public static $model = \App\Models\Donation::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'uuid';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'uuid',
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
            Text::make('UUID')->readonly(),
            Text::make('Name')->sortable(),
            BelongsTo::make('User')->sortable(),
            Text::make('Comment')->sortable()->hideFromIndex(),
            Text::make('Amount')->readonly()->sortable()->displayUsing(function ($value) {
                return number_format($value);
            }),
            Text::make('Amount Paid')->readonly()->sortable()->displayUsing(function ($value) {
                return number_format($value);
            }),
            Select::make('Status')->options([
                'pending' => 'Pending',
                'paid' => 'Paid',
                'expired' => 'Expired',
                'overpaid' => 'Overpaid',
                'underpaid' => 'Underpaid',
                'pending_confirmation' => 'Pending Confirmation',
                'new' => 'New',
            ])->readonly()->sortable(),
            BelongsTo::make('Donation Page'),
            HasOne::make('Lightning Invoice', 'lightning_invoice'),
            HasOne::make('Bitcoin Address', 'bitcoin_address'),
            HasOne::make('Transaction', 'transaction'),
            DateTime::make('Created At')->readonly()->sortable(),
            DateTime::make('Updated At')->readonly()->sortable(),
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
            new BitcoinableStatusNovaFilter(),
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
