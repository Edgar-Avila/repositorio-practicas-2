import { Control, FieldValues, Path } from "react-hook-form";
import SelectInput from "../SelectInput";
import { snakeToCapitalizedWords } from "@/utils";
import { estadosEntidad } from "@/types/constants";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  required?: boolean;
}

export const EstadosEntidadSelect = <T extends FieldValues>({
  ...props
}: Props<T>) => {

  return (
    <SelectInput {...props}>
      <option value="">Seleccionar estado</option>
      {estadosEntidad.map((estado) => (
        <option value={estado} key={estado}>
          {snakeToCapitalizedWords(estado)}
        </option>
      ))}
    </SelectInput>
  );
};
