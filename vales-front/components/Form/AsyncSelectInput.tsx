import type { FormInputProps } from '../types'
import {
	Controller,
	type FieldPath,
	type FieldValues,
	type PathValue,
} from 'react-hook-form'
import { Form } from 'react-bootstrap'
import SelectAsync, { AsyncProps } from 'react-select/async'
import { GroupBase } from 'react-select'

const AsyncSelectInput = <
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
	...other
}: FormInputProps<TFieldValues> &
	AsyncProps<OptionType, IsMulti, GroupType>) => {
	return (
		<Controller<TFieldValues, TName>
			control={control}
			defaultValue={'' as PathValue<TFieldValues, TName>}
			render={({ field, fieldState }) => {
				return (
					<Form.Group className={containerClass}>
						{label && (
							<Form.Label className={labelClassName}>{label}</Form.Label>
						)}
						<SelectAsync
							id={id ?? name}
							className={className}
							styles={{
								control: (styles) => ({
									...styles,
									borderColor: fieldState.error?.message
										? 'red'
										: styles.borderColor,
								}),
								menu: (styles) => ({
									...styles,
									zIndex: 9999,
								}),
							}}
							placeholder={placeholder}
							{...other}
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
			name={name as TName}
		/>
	)
}

export default AsyncSelectInput
