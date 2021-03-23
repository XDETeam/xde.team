import React, { FC, CSSProperties, Dispatch, SetStateAction, useMemo, useState } from "react";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { aspectEditingAdd } from "../store/actions/aspect.actions";
import { FilterOptionsState } from "@material-ui/lab/useAutocomplete";

const filter = createFilterOptions();

type AutocompleteControllerProps = {
	name: string;
	label: string;
	defaultValue?: unknown;
	options: string[];
	style?: CSSProperties;
	multiple?: boolean;
	setOnBlur: Dispatch<SetStateAction<any>>;
	allowCustomOption?: boolean;
};

const AutocompleteController: FC<AutocompleteControllerProps> = ({
	name,
	defaultValue,
	options,
	style,
	label,
	multiple,
	setOnBlur,
	allowCustomOption,
}) => {
	const dispatch = useDispatch();
	const def = useMemo(
		() =>
			multiple
				? Array.isArray(defaultValue)
					? defaultValue
					: [defaultValue ?? ""]
				: Array.isArray(defaultValue)
				? defaultValue[0] ?? ""
				: defaultValue ?? "",
		[defaultValue, multiple]
	);
	const [value, setValue] = useState<any>();

	return (
		<Autocomplete
			autoComplete={!allowCustomOption}
			autoHighlight={!allowCustomOption}
			autoSelect={!allowCustomOption}
			disableClearable
			getOptionLabel={(option) => String(option)}
			size="small"
			options={options}
			style={style}
			multiple={multiple}
			selectOnFocus={allowCustomOption}
			clearOnBlur={allowCustomOption}
			handleHomeEndKeys={allowCustomOption}
			onBlur={(e) => {
				setOnBlur(value);
				dispatch(aspectEditingAdd(value));
			}}
			onChange={(_, val) => {
				setValue(val);
				if (multiple) {
					setOnBlur(val);
					dispatch(aspectEditingAdd(val[val.length - 1]));
				}
			}}
			filterOptions={
				allowCustomOption
					? (options: unknown[], params: FilterOptionsState<unknown>) => {
							const filtered = filter(options, params);

							if (
								params.inputValue !== "" &&
								filtered.indexOf(params.inputValue) === -1
							) {
								filtered.push(params.inputValue);
							}

							return filtered;
					  }
					: undefined
			}
			freeSolo={allowCustomOption}
			defaultValue={def}
			renderInput={(params) => (
				<TextField {...params} name={name} label={label} variant="outlined" />
			)}
		/>
	);
};

export default AutocompleteController;
