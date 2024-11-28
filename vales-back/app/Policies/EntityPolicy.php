<?php

namespace App\Policies;

use App\Models\Entity;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EntityPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function viewMyEntity(User $user): bool
    {
        return $user->rol === 'OPERADOR';
    }

    public function viewDependencies(User $user, Entity $entity): bool
    {
        if($user->rol === 'ADMIN') {
            return true;
        }
        if(($user->isOperador() || $user->isUsuarioDependencia()) && $user->entity_id === $entity->id) {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Entity $entity): bool
    {
        return $user->rol === 'ADMIN';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->rol === 'ADMIN';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Entity $entity): bool
    {
        return $user->rol === 'ADMIN';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Entity $entity): bool
    {
        return $user->rol === 'ADMIN';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Entity $entity): bool
    {
        return $user->rol === 'ADMIN';
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Entity $entity): bool
    {
        return $user->rol === 'ADMIN';
    }
}
