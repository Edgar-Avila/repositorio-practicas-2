import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { Form } from "react-bootstrap";
import debounce from "debounce-promise";
import usuarioService from "../../../common/services/usuarioService";
import { useState } from "react";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  required?: boolean;
	onClienteChange?: (value: any) => void;
}

export const ClienteSelect = <T extends FieldValues>({
  control,
  label,
  name,
	onClienteChange,
  ...props
}: Props<T>) => {
  const [selected, setSelected] = useState<any>(null);

  const getClientes = async (busqueda: string) => {
    const response = await usuarioService.customerSelect({ busqueda });
    return response.data.map((cliente: any) => ({
      value: cliente.id,
      label: `${cliente.dni} - ${cliente.nombres} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`,
			fullData: cliente,
    }));
  }

  return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value, ...field }, fieldState }) => {
				return (
					<Form.Group>
						{label && (
							<Form.Label>{label}</Form.Label>
						)}
						<AsyncSelect
              menuPosition="fixed"
							styles={{
								control: (styles) => ({
									...styles,
									borderColor: fieldState.error?.message
										? 'red'
										: styles.borderColor,
								}),
							}}
              loadOptions={debounce(getClientes, 500)}
              onChange={(value: any) => {
                onChange(value?.value);
                props.onChange?.(value?.value);
								if(onClienteChange) {
									onClienteChange(value?.fullData);
								}
                setSelected(value);
              }}
              value={selected}
							{...props}
              {...field}
						/>
						{fieldState.error?.message && (
							<Form.Control.Feedback
								type="invalid"
								className="text-danger d-block">
								{fieldState.error?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>
				)
			}}
		/>
  );
};
