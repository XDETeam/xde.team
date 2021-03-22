import React, { FC, CSSProperties, Key } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Controller, UseControllerOptions, UseFormMethods } from "react-hook-form";

type AutocompleteControllerProps = {
	name: string;
	label: string;
	defaultValue?: unknown;
	control: UseControllerOptions["control"];
	options: string[];
	register: UseFormMethods["register"];
	style?: CSSProperties;
	uniqueKey?: Key | null;
	multiple?: boolean;
};

const AutocompleteController: FC<AutocompleteControllerProps> = ({
	name,
	defaultValue,
	control,
	options,
	style,
	register,
	label,
	uniqueKey,
	multiple,
}) => {
	return (
		<Controller
			key={uniqueKey}
			name={name}
			render={(props) => (
				<Autocomplete
					{...props}
					autoComplete
					autoHighlight
					autoSelect
					disableClearable
					size="small"
					options={options}
					style={style}
					multiple={multiple}
					onChange={(_, data) => props.onChange(data)}
					// groupBy={(option) => option.firstLetter}
					// getOptionLabel={(option) => option.title}
					renderInput={(params) => (
						<TextField
							{...params}
							inputRef={register({
								required: true,
							})}
							name={name}
							label={label}
							variant="outlined"
						/>
					)}
				/>
			)}
			control={control}
			defaultValue={defaultValue}
		/>
	);
};

export default AutocompleteController;
