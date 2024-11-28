import entidadService from '@/common/services/entidadService'
import { PageBreadcrumb, Table } from '@/components'
import { ServerPagination } from '@/components/table/ServerPagination'
import { useConfirm } from '@/context/useConfirmContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FaBuilding, FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Column } from 'react-table'
import { toast } from 'sonner'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const ListaEntidades: React.FC<Props> = () => {
  const confirm = useConfirm();
	const [queryParams, setQueryParams] = useState({
		page: `1`,
		perPage: `10`
	});
	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['entidades', queryParams],
		queryFn: () => entidadService.getEntidades(queryParams),
	})

	const { mutate: deleteEntidad, isPending } = useMutation({
		mutationKey: ['deleteEntidad'],
		mutationFn: entidadService.deleteEntidad,
		onError: () => {
			toast.error('Error al eliminar la entidad')
		},
		onSuccess: () => {
			toast.success('Entidad eliminada')
			refetch()
		},
	})

  const onDeleteClick = async (id: number) => {
    const confirmed = await confirm({
      title: 'Eliminar Entidad',
      message: '¿Estás seguro de eliminar esta entidad?',
    });
    if(!confirmed) return;
    deleteEntidad(id);
  }

	const columns: Column[] = [
		{
			Header: 'Id',
			accessor: 'id',
		},
		{
			Header: 'Razón Social',
			accessor: 'razonSocial',
		},
		{
			Header: 'Nombre comercial',
			accessor: 'nombreComercial',
		},
		{
			Header: 'RUC',
			accessor: 'ruc',
		},
		{
			Header: 'DNI Representante',
			accessor: 'dniRepresentante',
		},
		{
			Header: 'Nombre Representante',
			accessor: 'nombreRepresentante',
		},
		{
			Header: 'Emite Vale',
			accessor: 'emiteVale',
		},
		{
			Header: 'Emite Orden',
			accessor: 'emiteOrden',
		},
		{
			Header: 'Estado',
			accessor: 'estado',
		},
		{
			Header: 'Acciones',
			Cell: ({ row }) => (
				<ButtonGroup>
          <Link 
            to={`/sistema/entidades/${(row.original as any).id}/dependencias`} 
            className='btn btn-secondary btn-sm' 
            title="Dependencias"
          >
            <FaBuilding />
					</Link>
          <Link 
            className='btn btn-info btn-sm' 
            to={`/sistema/entidades/editar/${(row.original as any).id}`}
          >
            <FaEdit />
          </Link>
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

	return (
		<>
			<PageBreadcrumb title="Sistema" subName="Lista de Entidades" />
			<Link to={'/sistema/registro-entidad'}>
				<Button variant="primary">Agregar Entidad</Button>
			</Link>
			{isLoading && <p>Cargando...</p>}
			{isSuccess && (
				<>
					<Table columns={columns} data={data.data} />
					<ServerPagination
						total={data.meta.total}
						activePage={Number(queryParams.page)}
						setActivePage={(page) => setQueryParams({ ...queryParams, page: `${page}` })}
						setPageSize={(size) => setQueryParams({ ...queryParams, perPage: `${size}` })}
						pageSize={Number(queryParams.perPage)}
					/>
				</>
			)}
			{!isLoading && !isSuccess && (
				<p>No se pudo cargar la lista de entidades</p>
			)}
		</>
	)
}

export default ListaEntidades
