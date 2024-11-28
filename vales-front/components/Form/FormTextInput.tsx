import {
  Controller,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from "react-hook-form";
import type { FormInputProps } from "../types";
import { Form, FormControlProps, InputGroup } from "react-bootstrap";

const FormInput = <
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
  type,
  noValidate,
  leftBtn,
  rightBtn,
  ...other
}: FormInputProps<TFieldValues> & FormControlProps) => {
  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      control={control}
      defaultValue={"" as PathValue<TFieldValues, TName>}
      render={({ field, fieldState }) => (
        <Form.Group className={containerClass}>
          {label && (
            <Form.Label className={labelClassName}>
              <span>{label}</span>
              {other.required && <span className="text-danger"> (*)</span>}
            </Form.Label>
          )}
          <InputGroup hasValidation>
            {leftBtn && leftBtn}
            <Form.Control
              className={className}
              id={id ?? name}
              type={type}
              placeholder={placeholder}
              isInvalid={!noValidate && fieldState.error != null}
              {...other}
              {...field}
            />
            {rightBtn && rightBtn}
            {!noValidate && fieldState.error?.message && (
              <Form.Control.Feedback type="invalid" className="text-danger">
                {fieldState.error?.message}
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>
      )}
    />
  );
};

export default FormInput;
