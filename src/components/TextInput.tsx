type TextInputProps = {
  type: "text" | "textarea"
  value: string
  onChange: (string: string) => void
  placeholder: string
  disabled?: boolean
}

function TextInput({ type, value, onChange, placeholder, disabled }: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border rounded-md px-4 focus:outline-blue-300 ${disabled ? "bg-gray-100 text-gray-500 select-none" : ""}`}
      disabled={disabled}
    />
  )
}

export default TextInput;
