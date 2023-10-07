<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\MorphOne;
use Laravel\Nova\Fields\MorphTo;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class LightningInvoice extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\LightningInvoice>
     */
    public static $model = \App\Models\LightningInvoice::class;

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
        'payment_request', 'uuid', 'r_preimage'
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
            Text::make('Amount')->readonly(),
            Text::make('Amt Paid')->readonly(),
            Text::make('Payment Request')->readonly()->hideFromIndex(),
            Text::make('R Preimage')->readonly()->hideFromIndex(),
            Text::make('R Hash')->readonly()->hideFromIndex(),
            Text::make('Payment Addr')->readonly()->hideFromIndex(),
            Boolean::make('Settled')->readonly(),
            MorphTo::make('Lightning invoiceable', 'lightning_invoiceable')->types([
                Donation::class,
                StoreInvoice::class,
                GatedMessage::class,
                PaywallRequest::class,
            ]),
            DateTime::make('Created At')->readonly()->sortable(),
            DateTime::make('Updated At')->readonly()->sortable(),
            DateTime::make('Settled At')->readonly()->sortable(),

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
