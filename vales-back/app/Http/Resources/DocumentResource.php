<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
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
            'contractPartId' => $this->contract_part_id,
            'userId' => $this->user_id,
            'tipo' => $this->tipo,
            'vehiculo' => $this->vehiculo,
            'estado' => $this->estado,
            'ubigeoPartida' => $this->ubigeo_partida,
            'ubigeoDestino' => $this->ubigeo_destino,
            'motivoServicio' => $this->motivo_servicio,
            'observacion' => $this->observacion,
            'serie' => $this->serie,
            'correlativo' => $this->correlativo,
            'solicitante' => $this->solicitante,
            'lineas' => DocumentLineResource::collection($this->whenLoaded('lines')),
        ];
    }
}
