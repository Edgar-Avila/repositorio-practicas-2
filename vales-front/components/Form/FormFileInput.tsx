import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'

interface FormFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	containerClass?: string
	labelClassName?: string
	className?: string
	errMsg?: string
}

const FormFileInput = forwardRef<HTMLInputElement, FormFileInputProps>(
	(
		{
			id,
			label,
			name,
			containerClass,
			labelClassName,
			type = 'file',
			className,
			errMsg,
			...other
		},
		ref
	) => {
		return (
			<div className={clsx('form-group', containerClass)}>
				{label && (
					<label htmlFor="" className={clsx('form-label', labelClassName)}>
            <span>{label}</span>
            {other.required && <span className="text-danger">{" "}(*)</span>}
					</label>
				)}
				<input
					ref={ref}
					className={clsx('form-control', errMsg && "border-danger", className)}
					id={id ?? name}
          name={name}
					aria-describedby="helpId"
					type={type}
					{...other}
				/>
				{errMsg && <div className="invalid-feedback d-block">{errMsg}</div>}
			</div>
		)
	}
)

export default FormFileInput
