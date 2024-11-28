import usuarioService from "@/common/services/usuarioService";
import { PageBreadcrumb, Table } from "@/components";
import { ServerPagination } from "@/components/table/ServerPagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Column } from "react-table";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const ListaClientes: React.FC<Props> = () => {
  const [queryParams, setQueryParams] = useState({
    page: `1`,
    perPage: `10`,
    rol: "CLIENTE",
  });

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["clientes", queryParams],
    queryFn: () => usuarioService.getAll(queryParams),
  });

  const columns: Column[] = [
    {
      Header: "DNI",
      accessor: "dni",
    },
    {
      Header: "Nombre",
      accessor: "nombres",
    },
    {
      Header: "Apellido paterno",
      accessor: "apellidoPaterno",
    },
    {
      Header: "Apellido materno",
      accessor: "apellidoMaterno",
    },
    {
      Header: 'RUC',
      accessor: 'entity.ruc',
    },
    {
      Header: 'Razon social',
      accessor: 'entity.razonSocial',
    }
  ];

  return (
    <>
      <PageBreadcrumb title="Sistema" subName="Lista de clientes" />
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
  );
};

export default ListaClientes;
