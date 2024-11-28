import documentoService from '@/common/services/documentoService'
import { PageBreadcrumb, Table } from '@/components'
import { ServerPagination } from '@/components/table/ServerPagination'
import { useAuthContext } from '@/context'
import { useToggle } from '@/hooks'
import { truncateStr } from '@/utils/strings'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Column } from 'react-table'
import DocumentoModal from './partials/documentoModal'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const ListaDocumentos: React.FC<Props> = () => {
	const { user } = useAuthContext()
  const { isOpen: isSeeModalOpen, toggle: toggleSeeModal } = useToggle()
  const [selectedDocumento, setSelectedDocumento] = useState<any>(null)

	const [queryParams, setQueryParams] = useState({
		page: `1`,
		perPage: `10`,
    loadProducts: 'true',
    ...(user?.rol === 'USUARIO_DEPENDENCIA' && { creadoPor: `${user?.id}` }),
    ...(user?.rol === 'OPERADOR' && { estado: 'PENDIENTE,APROBADO,RECHAZADO' }),
	});

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['documentos', queryParams],
		queryFn: () => documentoService.getDocumentos(queryParams),
	})

  const onSeeClick = (doc: any) => {
    setSelectedDocumento(doc);
    toggleSeeModal();
  }

	const columns: Column[] = [
		{
			Header: 'Id',
			accessor: 'id',
		},
		{
			Header: 'Tipo',
			accessor: 'tipo',
		},
		{
			Header: 'Serie',
      accessor: 'serie',
		},
    {
      Header: 'Correlativo',
      accessor: 'correlativo',
    },
		{
			Header: 'Estado',
			accessor: 'estado',
		},
		{
			Header: 'Solicitante',
			accessor: 'solicitante',
      Cell: ({ value }) => truncateStr(value, 40),
		},
		{
			Header: 'Motivo de servicio',
			accessor: 'motivoServicio',
			Cell: ({ value }) => truncateStr(value, 40),
		},
		{
			Header: 'Observacion',
			accessor: 'observacion',
			Cell: ({ value }) => truncateStr(value, 40),
		},
		{
			Header: 'Acciones',
			Cell: ({ row }) => (
				<ButtonGroup>
					<Button variant="info" size="sm" onClick={() => onSeeClick(row.original)}>
						<FaEye />
					</Button>
				</ButtonGroup>
			),
		},
	]

	return (
		<>
			<PageBreadcrumb title="Sistema" subName="Lista de Documentos" />
      <Link to={'/sistema/documentos/emitir'}>
        <Button variant="primary">Agregar Documento</Button>
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
			{!isLoading && !isSuccess && (
				<p>No se pudo cargar la lista de documentos</p>
			)}
      <DocumentoModal
        show={isSeeModalOpen}
        onHide={toggleSeeModal}
        onApprove={refetch}
        onReject={refetch}
        onNullify={refetch}
        documento={selectedDocumento}
      />
		</>
	)
}

export default ListaDocumentos
