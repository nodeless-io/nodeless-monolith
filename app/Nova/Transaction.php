<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\Code;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\MorphOne;
use Laravel\Nova\Fields\MorphTo;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Transaction extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Transaction>
     */
    public static $model = \App\Models\Transaction::class;

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
            Text::make('UUID', 'uuid')->sortable(),
            BelongsTo::make('User', 'user', User::class)->sortable(),
            Number::make('Amount', 'amount')->sortable()->displayUsing(function ($value) {
                return number_format($value);
            }),
            Select::make('Type', 'type')->options([
                'credit' => 'Credit',
                'debit' => 'Debit',
            ])->sortable(),
            Select::make('Status', 'status')->options([
                'pending' => 'Pending',
                'settled' => 'Settled',
            ])->sortable(),
            Boolean::make('Is Fee', 'is_fee')->sortable(),
            Text::make('Onchain Tx', 'onchain_tx')->hideFromIndex()->readonly(),
            Text::make('Lightning Error', 'lightning_error')->hideFromIndex()->readonly(),
            Text::make('Lightning Payment Preimage', 'lightning_payment_preimage')->hideFromIndex()->readonly(),
            Text::make('Lightning Payment Hash', 'lightning_payment_hash')->hideFromIndex()->readonly(),
            Code::make('Lightning Payment Route', 'lightning_payment_route')->hideFromIndex()->readonly()->json(),
            MorphTo::make('Transactable')->sortable(),
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
