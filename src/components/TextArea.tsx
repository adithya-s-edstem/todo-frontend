type TextInputProps = {
  value: string
  onChange: (string: string) => void
  placeholder: string
  disabled?: boolean
}

function TextArea({ value, onChange, placeholder, disabled }: TextInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border min-h-40 rounded-md p-4 focus:outline-blue-300 ${disabled ? "bg-gray-100 text-gray-500 select-none" : ""}`}
      disabled={disabled}
    />
  )
}

export default TextArea;
