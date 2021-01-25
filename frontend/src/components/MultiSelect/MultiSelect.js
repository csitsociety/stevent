import React from 'react';
import { Field, useField } from 'formik';

import {
	InputContainer,
	StyledLabel,
	CheckboxWrapper,
	Checkbox,
	CheckboxLabel,
	InputError,
} from './multiSelectStyle.js';

const MultiSelect = ({
	label,
	required,
	options = [],
	...props
}) => {
	const [field, meta] = useField(props);

	return (
		<InputContainer>
			{label && (
				<StyledLabel
					required={required}
				>{label}</StyledLabel>
			)}
			{options.map(option => (
				<Field name={props.name} key={option}>
					{({field, form}) => (
						field.value ? (
							<CheckboxWrapper>
								<Checkbox
									type="checkbox"
									{...field}
									{...props}
									id={`${field.name}.${option}`}
									checked={field.value.includes(option)}
									onChange={() => {
										if (field.value.includes(option)) {
											const nextValue = field.value.filter(value => value !== option);
											form.setFieldValue(props.name, nextValue);
										} else {
											const nextValue = field.value.concat(option);
											form.setFieldValue(props.name, nextValue);
										}
									}}
								/>
								<CheckboxLabel htmlFor={`${field.name}.${option}`}>{option}</CheckboxLabel>
							</CheckboxWrapper>
						) : ''
					)}
				</Field>
			))}
			{meta.touched && meta.error && (
				<InputError>{meta.error}</InputError>
			)}
		</InputContainer>
	);
};

export default MultiSelect;
