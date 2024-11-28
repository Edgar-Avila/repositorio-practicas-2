import dependenciaService from '@/common/services/dependenciaService'
import { PageBreadcrumb, Table } from '@/components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Button, ButtonGroup, Tab, Tabs } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { Column } from 'react-table'
import { toast } from 'sonner'
import DependencyTree from './partials/tree'
import { useConfirm } from '@/context/useConfirmContext'
import entidadService from '@/common/services/entidadService'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const ListaDependencias: React.FC<Props> = () => {
  const { entidadId: paramEntidadId } = useParams();
  const confirm = useConfirm();
  const entityId = paramEntidadId!;
	const [queryParams, _] = useState({
		page: `1`,
		perPage: `1000`,
    entityId,
	});

	const { data, isLoading: dependenciasLoading, isSuccess: dependenciasSuccess, refetch } = useQuery({
		queryKey: ['entidades', queryParams],
		queryFn: () => dependenciaService.getByEntidad(entityId, queryParams),
	})

  const { data: entidadData, isLoading: entidadLoading, isSuccess: entidadSuccess } = useQuery({
    queryKey: ['entidades', entityId],
    queryFn: () => entidadService.getEntidad(entityId)
  });

	const { mutate: deleteEntidad, isPending } = useMutation({
		mutationKey: ['deleteEntidad'],
		mutationFn: dependenciaService.deleteDependencia,
		onError: () => {
			toast.error('Error al eliminar la entidad')
		},
		onSuccess: () => {
			toast.success('Dependencia eliminada')
			refetch()
		},
	})

  const onDeleteClick = async (id: string) => {
    const confirmed = await confirm({
      title: "Eliminar dependencia",
      message: "¿Estás seguro de eliminar la dependencia?"
    })

    if(!confirmed) return;
    deleteEntidad(id)
  }

	const columns: Column[] = [
		{
			Header: 'Id',
			accessor: 'id',
		},
    {
      Header: 'Código',
      accessor: 'codigo',
    },
		{
			Header: 'Nombre',
			accessor: 'nombre',
		},
		{
			Header: 'Dirección',
			accessor: 'direccion',
		},
		{
			Header: 'Centro de Costo',
			accessor: 'centroCosto',
      Cell: ({ value }) => value ? 'Sí' : 'No',
		},
		{
			Header: 'Acciones',
			Cell: ({ row }) => (
				<ButtonGroup>
					<Button variant="info" size="sm">
						<FaEdit />
					</Button>
					<Button
						variant="danger"
						size="sm"
						disabled={isLoading || isPending}
						onClick={() => onDeleteClick((row.original as any).id)}>
						<FaTrash />
					</Button>
				</ButtonGroup>
			),
		},
	]

  const isLoading = dependenciasLoading || entidadLoading;
  const isSuccess = dependenciasSuccess && entidadSuccess && data?.data && entidadData?.data;

	return (
		<>
			<PageBreadcrumb title="Sistema" subName="Lista de Dependencias" />
			<Link to={`/sistema/entidades/${entityId}/dependencias/nuevo`} className="btn btn-primary mb-3">
        Nueva dependencia
			</Link>
			{isLoading && <p>Cargando...</p>}
			{isSuccess && (
				<>
          <Tabs defaultActiveKey="list" className="mb-2">
            <Tab eventKey="list" title="Lista">
              <Table columns={columns} data={data.data} />
            </Tab>
            <Tab eventKey="tree" title="Organigrama">
              <DependencyTree 
                dependencies={data.data} 
                entity={entidadData.data}
              />
            </Tab>
          </Tabs>
				</>
			)}
			{!isLoading && !isSuccess && (
				<p>No se pudo cargar la lista de entidades</p>
			)}
		</>
	)
}

export default ListaDependencias
