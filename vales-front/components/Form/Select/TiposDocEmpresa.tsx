import { Control, FieldValues, Path } from "react-hook-form";
import SelectInput from "../SelectInput";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  required?: boolean;
  readOnly?: boolean;
}

export const TiposDocEmpresaSelect = <T extends FieldValues>({
  ...props
}: Props<T>) => {

  return (
    <SelectInput {...props}>
      <option value="">Seleccionar tipo de documento</option>
      <option value="RUC">RUC</option>
    </SelectInput>
  );
};
