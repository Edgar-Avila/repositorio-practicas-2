import { Control, FieldValues, Path } from "react-hook-form";
import SelectInput from "../SelectInput";
import { useQuery } from "@tanstack/react-query";
import contratoService from "@/common/services/contratoService";
import { Fragment } from "react/jsx-runtime";
import { TipoContrato } from "@/types/constants";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  entityId?: string;
  tipo?: TipoContrato;
}

export const ContratosPorEntidadSelect = <T extends FieldValues>({
  entityId,
  tipo,
  ...props
}: Props<T>) => {
  const { isLoading, data: res } = useQuery({
    queryKey: ["contratos-by-entidad-select", entityId, tipo],
    queryFn: () =>
      contratoService.getContratos({
        ...(entityId && { entidad: entityId }),
        ...(tipo && { tipo }),
        loadPrincipal: "true",
        loadComplementario: "true",
      }),
  });

  if (isLoading) return <div>Cargando...</div>;

  return (
    <SelectInput {...props}>
      <option value="">Seleccionar contrato</option>
      {res?.data?.map((contract: any) => (
        <Fragment key={contract.id}>
          <option key={contract.principal?.id} value={contract?.principal?.id}>
            {contract?.principal?.numero}
          </option>
          {contract.complementario && (
            <option
              key={contract.complementario?.id}
              value={contract?.complementario?.id}
            >
              {contract?.complementario?.numero}
            </option>
          )}
        </Fragment>
      ))}
    </SelectInput>
  );
};
