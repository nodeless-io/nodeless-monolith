<?php

namespace App\Nova\Filters;

use App\Enums\PaywallType;
use Laravel\Nova\Filters\Filter;
use Laravel\Nova\Http\Requests\NovaRequest;

class PaywallTypeNovaFilter extends Filter
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
        return $query->where('type', $value);
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
            PaywallType::CONTENT->value => PaywallType::CONTENT,
            PaywallType::DOWNLOAD->value => PaywallType::DOWNLOAD,
            PaywallType::REDIRECT->value => PaywallType::REDIRECT,
            PaywallType::WP_ARTICLE->value => PaywallType::WP_ARTICLE,
        ];
    }
}
