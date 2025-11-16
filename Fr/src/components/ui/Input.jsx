// components/ui/Input.jsx
import React from "react";

const Input = React.forwardRef(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm text-gray-300">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full p-3 rounded-lg bg-black/40 text-gray-200 border ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-purple-500"
            } focus:outline-none focus:ring-2 transition ${
              icon ? "pl-10" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;