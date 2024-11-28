import { PageBreadcrumb, Table } from '@/components'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const ListaVentas: React.FC<Props> = () => {
  const columns: Column[] = [
    {
      Header: 'Código',
      accessor: 'codigo',
    },
    {
      Header: 'Razón Social',
      accessor: 'razonSocial',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Acciones',
      accessor: 'acciones',
    },
  ];
  const data: any[] = [];
	return (
		<>
			<PageBreadcrumb title="Sistema" subName="Lista de Ventas" />
      <Link to={"/sistema/venta/registro-ventas"}>
      <Button variant="primary">Agregar Venta</Button>
      </Link>
			<Table columns={columns} data={data} />
		</>
	)
}

export default ListaVentas
