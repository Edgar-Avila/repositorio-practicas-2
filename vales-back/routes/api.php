<?php

use App\Http\Controllers\AdditionalController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\ContractPartController;
use App\Http\Controllers\DependencyController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    // *************************************************************************
    // User routes
    // *************************************************************************
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::get('/me', [UserController::class, 'me'])->name('me');
    Route::get('/users/cliente/select', [UserController::class, 'customerSelect'])->name('users.customer-select');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // *************************************************************************
    // Entity routes
    // *************************************************************************
    Route::get('entidades/mi-entidad', [EntityController::class, 'myEntity'])->name('my-entity');
    Route::resource('entidades', EntityController::class)->except(['create', 'edit'])->parameters([
        'entidades' => 'entity',
    ]);

    // *************************************************************************
    // Dependency routes
    // *************************************************************************
    Route::get('dependencias/por-entidad/{entity}', [DependencyController::class, 'byEntity'])->name('dependencies.by-entity');
    Route::resource('dependencias', DependencyController::class)->except(['create', 'edit']);

    // *************************************************************************
    // Product routes
    // *************************************************************************
    Route::resource('productos', ProductController::class)->except(['create', 'edit']);

    // *************************************************************************
    // Contract routes
    // *************************************************************************
    Route::resource('contratos/partes', ContractPartController::class)->only(['index', 'show'])->parameters([
        'partes' => 'contractPart',
    ]);

    Route::get('contratos/siguiente-numero/{tipo}', [ContractController::class, 'nextNumber'])->name('contratos.next-number');
    Route::get('contratos/de-mi-entidad', [ContractController::class, 'myEntityContracts'])->name('contratos.my-entity');
    Route::resource('contratos', ContractController::class)->except(['create', 'edit'])->parameters([
        'contratos' => 'contract',
    ]);

    // *************************************************************************
    // Document routes
    // *************************************************************************
    Route::put('documentos/{document}/aprobar', [DocumentController::class, 'approve'])->name('documentos.approve');
    Route::put('documentos/{document}/rechazar', [DocumentController::class, 'reject'])->name('documentos.reject');
    Route::put('documentos/{document}/anular', [DocumentController::class, 'nullify'])->name('documentos.nullify');
    Route::get('documentos/tipos-permitidos-entidad/{entity}', [DocumentController::class, 'allowedTypesForEntity'])->name('documentos.allowed-types-for-entity');
    Route::resource('documentos', DocumentController::class)->except(['create', 'edit'])->parameters([
        'documentos' => 'document',
    ]);

    // *************************************************************************
    // Vehicle routes
    // *************************************************************************
    Route::resource('vehiculos', VehicleController::class)->only(['index', 'store'])->parameters([
        'vehiculos' => 'vehicle',
    ]);

    // *************************************************************************
    // Company routes
    // *************************************************************************
    Route::get('empresa', [CompanyController::class, 'index'])->name('company.index');
    Route::post('empresa', [CompanyController::class, 'store'])->name('company.store');
    Route::put('empresa', [CompanyController::class, 'update'])->name('company.update');

    // *************************************************************************
    // Additional routes
    // *************************************************************************
    Route::resource('adicionales', AdditionalController::class)->only(['index'])->parameters([
        'adicionales' => 'additional',
    ]);

    // *************************************************************************
    // Sales routes
    // *************************************************************************
    Route::get('ventas/reportes/por-cliente', [SaleController::class, 'reportePorCliente'])->name('sales.reporte-por-cliente');
    Route::get('ventas/reportes/por-producto', [SaleController::class, 'reportePorProducto'])->name('sales.reporte-por-producto');
});
