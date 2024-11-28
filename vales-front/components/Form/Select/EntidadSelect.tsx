import { Control, FieldValues, Path } from "react-hook-form";
import SelectInput from "../SelectInput";
import { useQuery } from "@tanstack/react-query";
import entidadService from "@/common/services/entidadService";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  required?: boolean;
}

export const EntidadSelect = <T extends FieldValues>({
  ...props
}: Props<T>) => {
  const { isLoading, data: res } = useQuery({
    queryKey: ["entidades"],
    queryFn: () => entidadService.getEntidades({ perPage: "1000" }),
    staleTime: 1000 * 5, // Data will be considered fresh for 5 seconds
  });

  if (isLoading) return <div>Cargando...</div>;

  return (
    <SelectInput {...props}>
      <option value="">Seleccionar entidad</option>
      {res?.data?.map((entidad: any) => (
        <option key={entidad.id} value={entidad.id}>
          {entidad.razonSocial}
        </option>
      ))}
    </SelectInput>
  );
};
