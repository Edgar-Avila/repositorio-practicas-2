import type { FormInputProps } from "../types";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from "react-hook-form";
import { Form } from "react-bootstrap";
import Select, { Props } from "react-select";
import { GroupBase } from "react-select";
import { useState } from "react";

const SearchableSelect = <
  OptionType,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  control,
  id,
  label,
  name,
  containerClass,
  placeholder,
  labelClassName,
  className,
  onChange: otherOnChange,
  ...other
}: FormInputProps<TFieldValues> &
  Props<OptionType, IsMulti, GroupType> & {
    onChange?: (value: any) => any;
  }) => {
  return (
    <Controller<TFieldValues, TName>
      control={control}
      defaultValue={"" as PathValue<TFieldValues, TName>}
      render={({ field: { onChange, value, ...field }, fieldState }) => {
        const selectedOption =
          other.options?.find((option: any) => option.value == value) || null;
        return (
          <Form.Group className={containerClass}>
            {label && (
              <Form.Label className={labelClassName}>{label}</Form.Label>
            )}
            <Select
              id={id ?? name}
              menuPosition="fixed"
              className={className}
              styles={{
                control: (styles) => ({
                  ...styles,
                  borderColor: fieldState.error?.message
                    ? "red"
                    : styles.borderColor,
                }),
                menu: (styles) => ({
                  ...styles,
                  zIndex: 9999,
                  color: "#000",
                }),
              }}
              placeholder={placeholder}
              onChange={(opt: any) => {
                onChange(opt?.value);
                otherOnChange?.(opt?.value);
              }}
              value={selectedOption as OptionType}
              {...other}
              {...field}
            />
            {fieldState.error?.message && (
              <Form.Control.Feedback
                type="invalid"
                className="text-danger d-block"
              >
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

export default SearchableSelect;
