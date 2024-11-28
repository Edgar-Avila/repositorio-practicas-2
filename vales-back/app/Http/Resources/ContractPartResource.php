<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContractPartResource extends JsonResource
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
            'tipo' => $this->tipo,
            'fechaSubscripcion' => $this->fecha_subscripcion,
            'fechaNotificacion' => $this->fecha_notificacion,
            'fechaEmision' => $this->fecha_emision,
            'numero' => $this->numero,
            'parte' => $this->parte,
            'estado' => $this->estado,
            'lineas' => ContractPartLineResource::collection($this->whenLoaded('lines')),
        ];
    }
}
