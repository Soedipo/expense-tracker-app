// src/components/Input.jsx
export const Input = ({ type = "text", placeholder, value, onChange, ...props }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-zinc-700 rounded w-full px-1 -ml-1 bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-500"
        {...props}
      />
    );
  };
  