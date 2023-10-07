<?php

namespace App\Http\Resources\API\ServerInfo;

use App\Services\LndService;
use Illuminate\Http\Resources\Json\JsonResource;

class StatusResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $lndService = new LndService();

        try {
            $info = $lndService->getNodeInfo();
            return ['code' => 200, 'status' => 'online', 'node' => $info->getAlias()];
        } catch (\Exception $e) {
            return ['code' => 500, 'status' => 'offline'];
        }
    }
}
