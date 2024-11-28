import { Control, FieldValues, Path } from "react-hook-form";
import SelectInput from "../SelectInput";
import { useQuery } from "@tanstack/react-query";
import documentoService from "@/common/services/documentoService";
import { snakeToCapitalizedWords } from "@/utils";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  entityId: string;
}

export const TiposDocPermitidosEntidadSelect = <T extends FieldValues>({
  entityId,
  ...props
}: Props<T>) => {
  const { isLoading, data: res } = useQuery({
    queryKey: ["tiposDocPermitidos", entityId],
    queryFn: () => documentoService.tiposPermitidosParaEntidad(entityId),
  });

  if (isLoading) return <div>Cargando...</div>;

  return (
    <SelectInput {...props}>
      <option value="">Seleccionar tipo</option>
      {res?.map((tipo: any) => (
        <option key={tipo} value={tipo}>
          {snakeToCapitalizedWords(tipo)}
        </option>
      ))}
    </SelectInput>
  );
};
