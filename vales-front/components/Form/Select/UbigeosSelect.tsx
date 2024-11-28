import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Select from "react-select";
import ubigeos from "@/data/ubigeos.json";
import { Form } from "react-bootstrap";
import { useMemo } from "react";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: any) => void;
  required?: boolean;
}

export const UbigeosSelect = <T extends FieldValues>({
  control,
  label,
  name,
  ...props
}: Props<T>) => {

  const ubigeosOptions = useMemo(() => {
    return ubigeos.map((ubigeo) => ({
      value: ubigeo.ubigeo_inei as string,
      label: `${ubigeo.ubigeo_inei} - ${ubigeo.distrito} - ${ubigeo.provincia} -  ${ubigeo.departamento}`,
    }));
  }, [])

  return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value, ...field }, fieldState }) => {
        const selectVal = ubigeosOptions.find((option: any) => option.value == value);
				return (
					<Form.Group>
						{label && (
							<Form.Label>{label}</Form.Label>
						)}
						<Select
              menuPosition="fixed"
							styles={{
								control: (styles) => ({
									...styles,
									borderColor: fieldState.error?.message
										? 'red'
										: styles.borderColor,
								}),
							}}
              options={ubigeosOptions as any}
              onChange={(value: any) => {
                onChange(value?.value);
                props.onChange?.(value?.value);
              }}
              value={selectVal}
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
