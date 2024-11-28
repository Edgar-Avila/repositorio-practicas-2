<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContractPartLineResource extends JsonResource
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
            'productId' => $this->product_id,
            'dependencyId' => $this->dependency_id,
            'cantidad' => $this->cantidad,
            'precio' => $this->precio,
            'subtotal' => $this->subtotal,
            'producto' => new ProductResource($this->whenLoaded('product')),
            'dependencia' => new DependencyResource($this->whenLoaded('dependency')),
            'adicionales' => AdditionalResource::collection($this->whenLoaded('additionals')),
        ];
    }
}
