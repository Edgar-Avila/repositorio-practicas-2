<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $entityId = $request->input('entidadId');
        $userId = $request->input('userId');
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $sort = $request->input('sort', 'id');
        $sortDir = $request->input('sortDir', 'asc');
        $query = Vehicle::query();
        $query->orderBy($sort, $sortDir);
        if ($entityId) {
            $query->where('entity_id', $entityId);
        }
        if($userId) {
            $query->where('user_id', $userId);
        }
        $vehicles = $query->paginate(page: $page, perPage: $perPage);
        return VehicleResource::collection($vehicles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        // Authorized in form request
        $data = $request->all();
        $vehicle = Vehicle::create($data);
        return new VehicleResource($vehicle);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        //
    }
}
