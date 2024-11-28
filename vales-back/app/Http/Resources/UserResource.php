<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'apellidoPaterno' => $this->apellido_paterno,
            'apellidoMaterno' => $this->apellido_materno,
            'nombres' => $this->nombres,
            'dni' => $this->dni,
            'telefono' => $this->telefono,
            'usuario' => $this->usuario,
            'rol' => $this->rol,
            'estado' => $this->estado,
            'email' => $this->email,
            'entityId' => $this->entity_id,
            'dependencyId' => $this->dependency_id,
            'emailVerifiedAt' => $this->email_verified_at,
            'rememberToken' => $this->remember_token,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'tipoCliente' => $this->tipo_cliente,
            'montoAcumulado' => $this->monto_acumulado,
            'puntosDisponibles' => $this->puntos_disponibles,
            'puntosCanjeados' => $this->puntos_canjeados,
            'nivel' => $this->nivel,
            'vehicles' => new VehicleResource($this->whenLoaded('vehicles')),
            'entity' => new EntityResource($this->whenLoaded('entity')),
        ];
    }
}
