type TextInputProps = {
  value: string
  onChange: (string: string) => void
  placeholder: string
  disabled?: boolean
  label: string
}

function TextArea({ value, onChange, placeholder, disabled, label }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border border-gray-300 shadow min-h-40 rounded-md p-4 focus:outline-blue-300 ${disabled ? "bg-gray-100 text-gray-500 select-none" : ""}`}
        disabled={disabled}
      />
    </div>
  )
}

export default TextArea;
