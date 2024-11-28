<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportePorClienteResource extends JsonResource
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
            'dni' => $this->dni,
            'nombreCompleto' => $this->nombres . ' ' . $this->apellido_paterno . ' ' . $this->apellido_materno,
            'ruc' => $this->whenLoaded('entity', fn() => $this->entity->ruc),
            'razonSocial' => $this->whenLoaded('entity', fn() => $this->entity->razon_social),
            'tipoCliente' => $this->tipo_cliente,
            'puntosDisponibles' => $this->puntos_disponibles,
            'puntosCanjeados' => $this->puntos_canjeados,
            'puntosTotales' => $this->puntos_disponibles + $this->puntos_canjeados,
            'montoAcumulado' => $this->monto_acumulado,
            'nivel' => $this->nivel,
        ];
    }
}
