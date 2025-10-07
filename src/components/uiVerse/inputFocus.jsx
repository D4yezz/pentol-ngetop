export default function InputFocus({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  type,
  required = true,
  icon,
}) {
  return (
    <>
        <div class="flex items-center w-full">
          <div class="relative">
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-red-800 transition-colors focus:outline-none peer bg-inherit"
            />
            <label
              for={id}
              className="absolute -top-4 text-xs left-0 flex items-center gap-2 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-red-800 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
            >
              {icon}
              {label}
            </label>
          </div>
        </div>
    </>
  );
}
