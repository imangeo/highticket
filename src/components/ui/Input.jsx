export default function Input({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  required = false,
  error,
  disabled,
}) {
  return (
    <div className="flex flex-col gap-2 w-full text-left mb-4">
      {label && (
        <label className="text-xs font-black uppercase tracking-widest">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full bg-white border-3 ${
          error ? "border-red-600" : "border-ink"
        } rounded-2xl px-5 py-4 font-bold text-ink placeholder:text-ink/30 outline-none focus:shadow-hard-sm transition-shadow`}
      />
      {error && <span className="text-red-600 text-xs font-bold">{error}</span>}
    </div>
  );
}
