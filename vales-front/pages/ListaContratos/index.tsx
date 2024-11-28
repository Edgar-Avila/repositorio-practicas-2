import contratoService from "@/common/services/contratoService";
import { PageBreadcrumb, Table } from "@/components";
import { ServerPagination } from "@/components/table/ServerPagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaFile, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { toast } from "sonner";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const ListaContratos: React.FC<Props> = () => {
  const [queryParams, setQueryParams] = useState({
    page: `1`,
    perPage: `10`,
    loadPrincipal: "true",
    loadComplementario: "true",
  });
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["contratos", queryParams],
    queryFn: () => contratoService.getContratos(queryParams),
  });

  const { mutate: deleteContrato, isPending } = useMutation({
    mutationKey: ["deleteContrato"],
    mutationFn: contratoService.deleteContrato,
    onError: () => {
      toast.error("Error al eliminar el contrato");
    },
    onSuccess: () => {
      toast.success("Contrato eliminado");
      refetch();
    },
  });

  const columns: Column[] = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Estado",
      accessor: "estado",
    },
    {
      Header: "Tipo",
      accessor: "principal.tipo",
    },
    {
      Header: "Descripción",
      accessor: "principal.numero",
    },
    {
      Header: "Complementario",
      accessor: "complementario.numero",
      Cell: ({ value }) => (value ? value : "Sin complementario"),
    },
    {
      Header: "Acciones",
      Cell: ({ row }) => (
        <ButtonGroup>
          <Link
            className="btn btn-sm btn-secondary"
            title="Ficha de contrato"
            to={`/sistema/contratos/${(row.original as any).id}/ficha`}
          >
            <FaFile />
          </Link>
          <Button
            variant="danger"
            size="sm"
            disabled={isLoading || isPending}
            onClick={() => deleteContrato((row.original as any).id)}
          >
            <FaTrash />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <>
      <PageBreadcrumb title="Sistema" subName="Lista de Contratos" />
      <Link to={"/sistema/contratos/agregar"}>
        <Button variant="primary">Agregar Contrato</Button>
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
        <p>No se pudo cargar la lista de contratos</p>
      )}
    </>
  );
};

export default ListaContratos;
