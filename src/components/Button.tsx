import Loader from "./Loader"

interface ButtonProps {
  type: "button" | "submit"
  label: string
  onClick?: () => void
  disabled?: boolean
  busy?: boolean
  red?: boolean
}

function Button({ type, label, onClick, disabled, busy, red }: ButtonProps) {
  return (
    <button
      className={`max-w-fit shadow border border-gray-300 rounded-md h-10 px-4 overflow-hidden flex items-center justify-center transition cursor-pointer ${red ? "bg-red-400 hover:bg-red-500 active:bg-red-600 text-white" : ""} ${disabled ? "text-gray-500 bg-gray-200" : "text-black"}`}
      type={type}
      onClick={onClick}
      disabled={disabled ?? busy}
    >
      {busy ? <Loader /> : label}
    </button>
  )
}

export default Button