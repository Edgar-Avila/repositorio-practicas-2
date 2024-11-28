import productoService from '@/common/services/productoService'
import { PageBreadcrumb, Table } from '@/components'
import { ServerPagination } from '@/components/table/ServerPagination'
import { useToggle } from '@/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Button, ButtonGroup, Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { FaEdit, FaImage, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Column } from 'react-table'
import { toast } from 'sonner'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Productos: React.FC<Props> = () => {
	const { isOpen: isImageModalOpen, toggle: toggleImageModal } = useToggle()
	const [modalImgUrl, setModalImgUrl] = useState<string>('')
	const [queryParams, setQueryParams] = useState({
		page: `1`,
		perPage: `10`,
	})

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['productos', queryParams],
		queryFn: () => productoService.getProductos(queryParams),
	})

	const { mutate: deleteProducto, isPending } = useMutation({
		mutationKey: ['deleteProducto'],
		mutationFn: productoService.deleteProducto,
		onSuccess: () => {
			toast.success('Producto eliminado')
			refetch()
		},
	})

	const columns: Column[] = [
		{
			Header: 'Id',
			accessor: 'id',
		},
		{
			Header: 'Descripcion',
			accessor: 'descripcion',
		},
		{
			Header: 'Unidad',
			accessor: 'unidadMedida',
		},
		{
			Header: 'Precio Unitario',
			accessor: 'precio',
		},
		{
			Header: 'Acciones',
			Cell: ({ row }) => (
				<ButtonGroup>
					<Button
						variant="secondary"
						size="sm"
						onClick={() => {
							setModalImgUrl((row.original as any).imagenUrl)
							toggleImageModal()
						}}>
						<FaImage />
					</Button>
					<Button variant="info" size="sm">
						<FaEdit />
					</Button>
					<Button
						variant="danger"
						size="sm"
						disabled={isLoading || isPending}
						onClick={() => deleteProducto((row.original as any).id)}>
						<FaTrash />
					</Button>
				</ButtonGroup>
			),
		},
	]

	return (
		<>
			<PageBreadcrumb title="Sistema" subName="Productos" />
			<Link to={'/sistema/productos/agregar'}>
				<Button>Agregar Producto</Button>
			</Link>
			{isLoading && <p>Cargando...</p>}
			{isSuccess && (
				<>
					<Modal
						show={isImageModalOpen}
						onHide={toggleImageModal}
						className="fade"
						tabIndex={-1}
						role="dialog"
						aria-labelledby="exampleModalScrollableTitle"
						aria-hidden="true">
						<ModalHeader closeButton>
							<h6 className='modal-title m-0 text-white'>Imagen del producto</h6>
						</ModalHeader>
						<ModalBody>
							<img src={modalImgUrl} alt="Imagen del producto" className='img-fluid' />
						</ModalBody>
					</Modal>
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
			{!isLoading && !isSuccess && <p>Error al cargar los datos</p>}
		</>
	)
}

export default Productos
