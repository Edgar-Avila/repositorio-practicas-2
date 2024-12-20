<?php

namespace App\Policies;

use App\Models\Dependency;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DependencyPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->rol === 'ADMIN';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Dependency $dependency): bool
    {
        if ($user->rol === 'ADMIN') {
            return true;
        }
        if ($user->rol === 'OPERADOR' && $user->entity_id === $dependency->entity_id) {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Dependency $dependency): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Dependency $dependency): bool
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Dependency $dependency): bool
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Dependency $dependency): bool
    {
        return true;
    }
}
