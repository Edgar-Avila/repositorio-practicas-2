<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EntityResource extends JsonResource
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
            'razonSocial' => $this->razon_social,
            'nombreComercial' => $this->nombre_comercial,
            'ruc' => $this->ruc,
            'direccion' => $this->direccion,
            'dniRepresentante' => $this->dni_representante,
            'nombreRepresentante' => $this->nombre_representante,
            'departamento' => $this->departamento,
            'provincia' => $this->provincia,
            'distrito' => $this->distrito,
            'estado' => $this->estado,
            'emiteVale' => $this->emite_vale,
            'emiteOrden' => $this->emite_orden,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
