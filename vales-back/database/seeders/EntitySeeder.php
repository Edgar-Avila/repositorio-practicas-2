<?php

namespace Database\Seeders;

use App\Models\Additional;
use App\Models\Contract;
use App\Models\ContractPart;
use App\Models\ContractPartLine;
use App\Models\Dependency;
use App\Models\Entity;
use App\Models\Product;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EntitySeeder extends Seeder
{
    private function genericEntities()
    {
        $entities = Entity::factory(5)->create();

        foreach ($entities as $entity) {
            User::factory()->create([
                'entity_id' => $entity->id,
                'rol' => 'OPERADOR',
            ]);

            $dependencies = Dependency::factory(2)->create([
                'entity_id' => $entity->id,
            ]);

            foreach ($dependencies as $dependency) {
                User::factory(2)->create([
                    'dependency_id' => $dependency->id,
                    'entity_id' => $entity->id,
                    'rol' => 'USUARIO_DEPENDENCIA',
                ]);

                $subdependencies = Dependency::factory(2)->create([
                    'dependency_id' => $dependency->id,
                    'entity_id' => $entity->id,
                ]);

                foreach ($subdependencies as $subdependency) {
                    User::factory(2)->create([
                        'dependency_id' => $subdependency->id,
                        'entity_id' => $entity->id,
                        'rol' => 'USUARIO_DEPENDENCIA',
                    ]);
                }
            }
        }
    }

    private function testEntities()
    {
        $testEntity = Entity::factory()->create([
            'razon_social' => 'Entidad S.A.C.',
            'emite_vale' => true,
            'emite_orden' => true,
        ]);

        Vehicle::factory(5)->for($testEntity)->create();
        $contracts = Contract::factory(5)->for($testEntity)->create();
        for($i = 0; $i < 5; $i++) {
            // Random part
            $tipos = ['CONTRATO', 'ORDEN_DE_COMPRA', 'ORDEN_DE_DESPACHO'];
            $tipo = $tipos[array_rand($tipos)];
            $principal = ContractPart::factory()->for($contracts[$i])->create([
                'parte' => 'PRINCIPAL',
                'tipo' => $tipo,
            ]);
            if($i % 2 == 0)
            {
                ContractPart::factory()->for($contracts[$i])->create([
                    'parte' => 'COMPLEMENTARIO',
                    'tipo' => $tipo,
                ]);
            }

            for($j = 0; $j < 3; $j++) {
                $lineas = ContractPartLine::factory()->for($principal)->create([
                    'product_id' => $j,
                ]);
                $lineas->each(function($linea) {
                    Additional::factory(2)->for($linea)->create();
                });
            }

        }

        User::factory()->testOperador($testEntity->id)->create();
        User::factory()->testCliente($testEntity->id)->create();


        $testDependencies = Dependency::factory(2)->create([
            'entity_id' => $testEntity->id,
        ]);

        User::factory()->testUsuarioDependencia($testEntity->id, $testDependencies[0]->id)->create();

        foreach ($testDependencies as $testDependency) {
            User::factory(2)->create([
                'dependency_id' => $testDependency->id,
                'entity_id' => $testEntity->id,
                'rol' => 'USUARIO_DEPENDENCIA',
            ]);

            $subdependencies = Dependency::factory(2)->create([
                'dependency_id' => $testDependency->id,
                'entity_id' => $testEntity->id,
            ]);

            foreach ($subdependencies as $subdependency) {
                User::factory(2)->create([
                    'dependency_id' => $subdependency->id,
                    'entity_id' => $testEntity->id,
                    'rol' => 'USUARIO_DEPENDENCIA',
                ]);
            }
        }
    }


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->genericEntities();
        $this->testEntities();
    }
}
