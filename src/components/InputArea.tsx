import React from "react";
import { FormControl, TextField, FormHelperText } from "@mui/material";

interface InputAreaProps {
  label: string;
  error: boolean;
  errorMsg: string;
  onChange: (value: string) => void;
  value: string;
  type: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

const InputArea: React.FC<InputAreaProps> = ({
  label,
  error,
  onChange,
  value,
  type = "text",
  multiline,
  rows,
  placeholder,
  errorMsg,
}) => {
  return (
    <FormControl
      fullWidth
      margin="normal"
      error={error}>
      <TextField
        label={label}
        multiline={type === "text" && multiline}
        type={type}
        rows={type === "text" && rows ? rows : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
        placeholder={placeholder}
      />
      {error && <FormHelperText>{errorMsg}</FormHelperText>}
    </FormControl>
  );
};

export default InputArea;
