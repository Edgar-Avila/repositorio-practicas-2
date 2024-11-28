<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContractResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'porMonto' => $this->por_monto,
            'entityId' => $this->entity_id,
            'estado' => $this->estado,
            'principal' => new ContractPartResource($this->whenLoaded('principal')),
            'complementario' => new ContractPartResource($this->whenLoaded('complementario')),
        ];
    }
}
