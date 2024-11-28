import { Control, FieldValues, Path } from "react-hook-form";
import SelectInput from "../SelectInput";
import { useQuery } from "@tanstack/react-query";
import dependenciaService from "@/common/services/dependenciaService";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  entidadId?: number;
}

export const EntidadDependenciasSelect = <T extends FieldValues>({
  entidadId,
  ...props
}: Props<T>) => {
  const { isLoading, data: res } = useQuery({
    queryKey: ["dependenciasEntidad", entidadId],
    queryFn: () =>
      dependenciaService.getByEntidad(`${entidadId}`, { perPage: "1000" }),
  });

  if (isLoading) return <div>Cargando...</div>;

  return (
    <SelectInput {...props}>
      <option value="">Seleccionar dependencia</option>
      {res?.data?.map((dependencia: any) => (
        <option key={dependencia.id} value={dependencia.id}>
          {dependencia.nombre}
        </option>
      ))}
    </SelectInput>
  );
};
