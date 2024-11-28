import { Control, FieldValues, Path } from "react-hook-form";
import SelectInput from "../SelectInput";
import { useQuery } from "@tanstack/react-query";
import vehiculoService from "@/common/services/vehiculoService";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  userId?: number;
}

export const VehiculosClienteSelect = <T extends FieldValues>({
  userId,
  ...props
}: Props<T>) => {
  const { isLoading, data: res } = useQuery({
    queryKey: ["vehiculosSelect", userId],
    queryFn: () =>
      vehiculoService.getVehiculos({ perPage: "1000", userId: `${userId}` }),
  });

  if (isLoading) return <div>Cargando...</div>;

  return (
    <SelectInput {...props}>
      <option value="">Seleccionar vehículo</option>
      {res?.data?.map((vehiculo: any) => (
        <option key={vehiculo.id} value={vehiculo.id}>
          {vehiculo.placa}
        </option>
      ))}
    </SelectInput>
  );
};
