import { Control, FieldValues, Path } from "react-hook-form";
import SelectInput from "../SelectInput";
import { useQuery } from "@tanstack/react-query";
import productoService from "@/common/services/productoService";
import { ChangeEvent } from "react";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  onProductoChange?: (value: any) => void;
}

export const ProductoSelect = <T extends FieldValues>({
  onProductoChange,
  onChange,
  ...props
}: Props<T>) => {
  const { isLoading, data: res } = useQuery({
    queryKey: ["selectProductos"],
    queryFn: () => productoService.getProductos({ perPage: "1000" }),
    staleTime: 1000 * 5, // Data will be considered fresh for 5 seconds
  });

  if (isLoading) return <div>Cargando...</div>;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (onProductoChange) {
      const selectedProducto = res?.data?.find(
        (item: any) => item.id == selectedId
      );
      onProductoChange(selectedProducto);
    }
  }

  return (
    <SelectInput onChange={handleChange} {...props}>
      <option value="">Seleccionar producto</option>
      {res?.data?.map((item: any) => (
        <option key={item.id} value={item.id}>
          {item.descripcion}
        </option>
      ))}
    </SelectInput>
  );
};
