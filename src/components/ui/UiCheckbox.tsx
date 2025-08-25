interface Option {
  label: string
  value: string
}

interface UiCheckboxProps {
  options: Option[]
  value: string[]
  required?: boolean
  disabled?: boolean
  onChange: (val: string[] | []) => void
}

export default function UiCheckbox({
  options,
  value,
  onChange,
  required = false,
  disabled = false,
}: UiCheckboxProps) {
  const handleToggle = (val: string) => {
    if (disabled) return

    let newValue: string[]
    if (value.includes(val)) {
      newValue = value.filter((v) => v !== val)
    } else {
      newValue = [...value, val]
    }

    if (required && newValue.length === 0) return

    onChange(newValue)
  }

  return (
    <div className="flex flex-col gap-4">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`inline-flex items-center gap-2 cursor-pointer ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={value.includes(opt.value)}
            onChange={() => handleToggle(opt.value)}
            disabled={disabled}
            className="h-5 w-5 cursor-pointer disabled:cursor-not-allowed"
          />
          <span className="text-secondary font-medium text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}
