<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DocumentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Document $document): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        if($user->isUsuarioDependencia()) {
            return Response::allow();
        }
        if($user->isOperador()) {
            // Solo puede crear documento si no hay usuarios activos en las dependencias
            // de la entidad a la que pertenece
            if($user->entity->activeUsuariosDependencia()->count() > 0) {
                return Response::deny('No puede crear documentos porque hay usuarios activos en las dependencias de su entidad');
            }
            return Response::allow();
        }
        return Response::deny('No puede crear documentos');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Document $document): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Document $document): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Document $document): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Document $document): bool
    {
        return false;
    }

    public function approve(User $user, Document $document): bool
    {
        return true;
    }

    public function reject(User $user, Document $document): bool
    {
        return true;
    }

    public function nullify(User $user, Document $document): bool
    {
        return true;
    }
}
