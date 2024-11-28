<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdditionalResource extends JsonResource
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
            'tipoIncremento' => $this->tipo_incremento,
            'tipoDocumento' => $this->tipo_documento,
            'descripcion' => $this->descripcion,
            'numeroDocumento' => $this->numero_documento,
            'fechaDocumento' => $this->fecha_documento,
            'urlDocumento' => $this->url_documento,
            'estado' => $this->estado,
            'cantidad' => $this->cantidad,
            'precio' => $this->precio,
            'subtotal' => $this->subtotal,
            'contractPartLineId' => $this->contract_part_line_id,
            'contractPartLine' => new ContractPartLineResource($this->whenLoaded('contractPartLine')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
