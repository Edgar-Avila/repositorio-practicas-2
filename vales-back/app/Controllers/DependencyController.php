<?php

namespace App\Http\Controllers;

use App\Models\Dependency;
use App\Http\Requests\StoreDependencyRequest;
use App\Http\Requests\UpdateDependencyRequest;
use App\Http\Resources\DependencyResource;
use App\Models\Entity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DependencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Dependency::class);
        $query = Dependency::query();
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $sort = $request->input('sort', 'id');
        $sortDir = $request->input('sortDir', 'asc');
        $query->orderBy($sort, $sortDir);
        $dependencies = $query->paginate(page: $page, perPage: $perPage);
        return DependencyResource::collection($dependencies);
    }

    public function byEntity(Request $request, Entity $entity)
    {
        Gate::authorize('viewDependencies', $entity);
        $query = Dependency::query();
        $query->where('entity_id', '=', $entity->id);
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $sort = $request->input('sort', 'id');
        $sortDir = $request->input('sortDir', 'asc');
        $query->orderBy($sort, $sortDir);
        $dependencies = $query->paginate(page: $page, perPage: $perPage);
        return DependencyResource::collection($dependencies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDependencyRequest $request)
    {
        // Authorized in form request
        $data = $request->validated();
        $dependency = Dependency::create($data);
        return new DependencyResource($dependency);
    }

    /**
     * Display the specified resource.
     */
    public function show(Dependency $dependency)
    {
        Gate::authorize('view', $dependency);
        return new DependencyResource($dependency);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDependencyRequest $request, Dependency $dependency)
    {
        $dependency->update($request->all());
        return new DependencyResource($dependency);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dependency = Dependency::findOrFail($id);
        Gate::authorize('delete', $dependency);
        $dependency->delete();
        return response()->json(['success' => true], 200);
    }
}
