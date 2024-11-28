<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
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
            'tipoDoc' => $this->tipo_doc,
            'numDoc' => $this->num_doc,
            'razonSocial' => $this->razon_social,
            'direccion' => $this->direccion,
            'nombreComercial' => $this->nombre_comercial,
            'correo' => $this->correo,
            'telefono' => $this->telefono,
            'establecimientos' => EstablishmentResource::collection($this->whenLoaded('establishments')),
        ];
    }
}
