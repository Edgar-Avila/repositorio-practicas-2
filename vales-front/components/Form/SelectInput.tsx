import type { FormInputProps } from "../types";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from "react-hook-form";
import { Form, type FormSelectProps } from "react-bootstrap";

const SelectInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  id,
  label,
  name,
  containerClass,
  placeholder,
  labelClassName,
  className,
  children,
  onChange,
  ...other
}: FormInputProps<TFieldValues> & FormSelectProps) => {
  return (
    <Controller<TFieldValues, TName>
      control={control}
      defaultValue={"" as PathValue<TFieldValues, TName>}
      render={({ field: { onChange: fieldChange, ...field }, fieldState }) => {
        if (other.multiple) {
          field.value = [field.value] as any;
        }
        return (
          <Form.Group className={containerClass}>
            {label && (
              <Form.Label className={labelClassName}>
                <span>{label}</span>
                {other.required && <span className="text-danger"> (*)</span>}
              </Form.Label>
            )}
            <Form.Select
              id={id ?? name}
              className={className}
              // placeholder={placeholder}
              isInvalid={fieldState.error != null}
              onChange={(e) => {
                fieldChange(e);
                if (onChange) onChange(e);
              }}
              {...field}
              {...other}
            >
              {children}
            </Form.Select>
            {fieldState.error?.message && (
              <Form.Control.Feedback type="invalid" className="text-danger">
                {fieldState.error?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      }}
      name={name as TName}
    />
  );
};

export default SelectInput;
