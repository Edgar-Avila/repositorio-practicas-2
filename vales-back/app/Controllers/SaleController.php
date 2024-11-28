<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReportePorClienteResource;
use App\Http\Resources\ReportePorProductoResource;
use App\Models\User;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function reportePorCliente(Request $request) {
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $dni = $request->input('dni');
        $nombre = $request->input('nombre');
        $q = User::query();
        $q->with('entity');
        $q->where('rol', 'CLIENTE');
        if($dni) {
            $q->where('dni', 'like', "%$dni%");
        }
        if($nombre) {
            $q->where('concat(nombres, apellido_paterno, apellido_materno)', 'like', "%$nombre%");
        }
        $data = $q->paginate(page: $page, perPage: $perPage);

        return ReportePorClienteResource::collection($data);
    }

    public function reportePorProducto(Request $request) {
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $data = User::where('rol', 'CLIENTE')
            ->with('entity')
            ->paginate(page: $page, perPage: $perPage);
        return ReportePorProductoResource::collection($data);
    }
}
