import { Control, FieldValues, Path } from "react-hook-form";
import SelectInput from "../SelectInput";
import { snakeToCapitalizedWords } from "@/utils";
import { tiposCliente } from "../../../types/constants";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  containerClass?: string;
  onChange?: (value: any) => void;
}

export const TiposClienteSelect = <T extends FieldValues>({
  ...props
}: Props<T>) => {
  return (
    <SelectInput {...props}>
      <option value="">Seleccionar tipo</option>
      {tiposCliente?.map((tipo: any) => (
        <option key={tipo} value={tipo}>
          {snakeToCapitalizedWords(tipo)}
        </option>
      ))}
    </SelectInput>
  );
};
