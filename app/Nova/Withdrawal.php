<?php

namespace App\Nova;

use App\Enums\WithdrawalType;
use App\Nova\Filters\WithdrawalTypeNovaFilter;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\MorphOne;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Withdrawal extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Withdrawal>
     */
    public static $model = \App\Models\Withdrawal::class;

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
            Number::make('Amount', 'amount')->sortable()->displayUsing(function ($value) {
                return number_format($value);
            }),
            Select::make('Type', 'type')->options([
                WithdrawalType::LIGHTNING->value => WithdrawalType::LIGHTNING,
                WithdrawalType::ONCHAIN->value => WithdrawalType::ONCHAIN,
            ])->sortable(),
            Text::make('Onchain Address', 'onchain_address'),
            Text::make('Lightning Address', 'lightning_address'),
            BelongsTo::make('User', 'user', User::class)->sortable(),
            MorphOne::make('Transaction', 'transaction', Transaction::class),
            DateTime::make('Created At', 'created_at')->sortable()->readonly(),
            DateTime::make('Updated At', 'updated_at')->sortable()->readonly(),
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
            new WithdrawalTypeNovaFilter(),
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
