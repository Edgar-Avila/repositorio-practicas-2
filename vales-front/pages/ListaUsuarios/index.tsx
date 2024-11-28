import usuarioService from '@/common/services/usuarioService'
import { PageBreadcrumb, Table } from '@/components'
import { ServerPagination } from '@/components/table/ServerPagination'
import { snakeToCapitalizedWords } from '@/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Column } from 'react-table'
import { toast } from 'sonner'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Usuarios: React.FC<Props> = () => {
	const [queryParams, setQueryParams] = useState({
		page: `1`,
		perPage: `10`,
	})

	const { isLoading, data, isSuccess, refetch } = useQuery({
		queryKey: ['usuarios', queryParams],
		queryFn: () => usuarioService.getAll(queryParams),
	})

	const { mutate: deleteUser } = useMutation({
		mutationKey: ['deleteUser'],
		mutationFn: usuarioService.deleteUser,
		onError: (err) => {
			if (err instanceof AxiosError && err.response?.status == 403) {
				return toast.error('No tienes permisos para borrar este usuario')
			}
			return toast.error('Error al eliminar usuario')
		},
		onSuccess: () => {
			toast.success('Usuario eliminado')
			refetch()
		},
	})

	// Apellido paterno, apellido materno, nombres, dni, cargo, email, telefono, usuario
	const columns: Column[] = [
		{
			Header: 'Apellido paterno',
			accessor: 'apellidoPaterno',
		},
		{
			Header: 'Apellido materno',
			accessor: 'apellidoMaterno',
		},
		{
			Header: 'Nombres',
			accessor: 'nombres',
		},
		{
			Header: 'DNI',
			accessor: 'dni',
		},
		{
			Header: 'Rol',
			accessor: 'rol',
      Cell: ({ value }) => snakeToCapitalizedWords(value),
		},
		{
			Header: 'Email',
			accessor: 'email',
		},
		{
			Header: 'Telefono',
			accessor: 'telefono',
		},
		{
			Header: 'Usuario',
			accessor: 'usuario',
		},
		{
			Header: 'Acciones',
			accessor: 'id',
			Cell: ({ value }) => (
				<div className="btn-group">
					<button className="btn btn-sm btn-primary">
						<FaEdit />
					</button>
					<button
						className="btn btn-sm btn-danger"
						onClick={() => deleteUser(value)}>
						<FaTrash />
					</button>
				</div>
			),
		},
	]

	return (
		<>
			<PageBreadcrumb title="Sistema" subName="Usuarios" />
			<Link to="/sistema/usuarios/nuevo" className="btn btn-primary mb-3">
				Nuevo usuario
			</Link>
			{isLoading && <p>Cargando...</p>}
			{isSuccess && (
				<>
					<Table columns={columns} data={data.data} />
					<ServerPagination
						total={data.meta.total}
						activePage={Number(queryParams.page)}
						setActivePage={(page) =>
							setQueryParams({ ...queryParams, page: `${page}` })
						}
						setPageSize={(size) =>
							setQueryParams({ ...queryParams, perPage: `${size}` })
						}
						pageSize={Number(queryParams.perPage)}
					/>
				</>
			)}
		</>
	)
}

export default Usuarios
