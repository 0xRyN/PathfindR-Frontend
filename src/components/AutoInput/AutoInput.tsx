import { useRef, useState } from "react";
import {
  Autocomplete,
  ComboboxItem,
  Loader,
  OptionsFilter,
} from "@mantine/core";
type Props = {
  label: string;
  placeholder: string;
  autocompleteData: string[];
  setCurrentData: (data: string) => void;
};

function normalizeString(string: string) {
  return string
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("-", "");
}

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const normalizedSearch = normalizeString(search);

  return (options as ComboboxItem[]).filter((option) => {
    const currentOption = normalizeString(option.value);
    const includes = currentOption.includes(normalizedSearch);
    return includes;
  });
};

export function AutoInput({
  label,
  placeholder,
  autocompleteData,
  setCurrentData,
}: Props) {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setCurrentData(val);

    if (val.trim().length === 0) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  };

  return (
    <Autocomplete
      size={'lg'}
      value={value}
      data={autocompleteData}
      filter={optionsFilter}
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      label={label}
      placeholder={placeholder}
      maxDropdownHeight={200}
    />
  );
}
