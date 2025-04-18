// src/components/Input.jsx
export const Input = ({ id, type = "text", placeholder, value, onChange, options = [], ...props }) => {
  props.className = !props.className
    ? "border border-zinc-700 rounded w-full px-1 -ml-1 bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-500"
    : props.className;

  switch (type) {
    case "text":
    case "number":
    case "date":
      return <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} {...props} />;
    case "select-option":
      if (options.length === 0) {
        return console.warn("No options provided for select input.");
      }
      return (
        <select id={id} value={value} onChange={onChange} {...props}>
          <option value="" disabled>
            Select Option
          </option>
          {options.map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
      );
    default:
      return <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} {...props} />;
  }
};
