import React from "react";

export default function Switch({ label, onChange, value, title, small }: any) {
  return (
    <div
      className={`relative flex items-center justify-between switch ${
        small && "small"
      }`}
    >
      {label && <small className="relative -top-1">{label}</small>}
      <label className="form-switch relative inline-block cursor-pointer">
        <input
          id={title}
          checked={value}
          onChange={onChange}
          type="checkbox"
          className="absolute opacity-0 pointer-events-none"
        />
        <i
          className={`${
            small ? " w-9 h-5 small " : " w-11 h-6 "
          } relative inline-block bg-gray-100 rounded-3xl transition-all`}
        />
      </label>
    </div>
  );
}
