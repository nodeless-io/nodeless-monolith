<?php

namespace App\Nova\Filters;

use App\Enums\BitcoinableStatus;
use Laravel\Nova\Filters\Filter;
use Laravel\Nova\Http\Requests\NovaRequest;

class BitcoinableStatusNovaFilter extends Filter
{
    /**
     * The filter's component.
     *
     * @var string
     */
    public $component = 'select-filter';

    /**
     * Apply the filter to the given query.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply(NovaRequest $request, $query, $value)
    {
        return $query->where('status', $value);
    }

    /**
     * Get the filter's available options.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function options(NovaRequest $request)
    {
        return [
            BitcoinableStatus::NEW->value => BitcoinableStatus::NEW,
            BitcoinableStatus::PAID->value => BitcoinableStatus::PAID,
            BitcoinableStatus::UNDERPAID->value => BitcoinableStatus::UNDERPAID,
            BitcoinableStatus::OVERPAID->value => BitcoinableStatus::OVERPAID,
            BitcoinableStatus::PENDING_CONFIRMATION->value => BitcoinableStatus::PENDING_CONFIRMATION,
            BitcoinableStatus::EXPIRED->value => BitcoinableStatus::EXPIRED,
            BitcoinableStatus::CANCELLED->value => BitcoinableStatus::CANCELLED,
        ];
    }
}
