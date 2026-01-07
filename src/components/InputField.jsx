export const InputField = ({
    label,
    name,
    register,
    errors,
    placeholder,
    type = "text",
    options = [],
  }) => (
    <div className="grid grid-cols-13 items-center gap-x-9">
      <label className="col-span-5 text-sm font-medium">{label}</label>
  
      {type === "select" ? (
        <select
          defaultValue=""
          {...register(name)}
          className={`col-span-8 border border-input-bordergrey rounded-lg outline-none py-3 pl-2 text-xs font-light 
          ${errors[name] ? "border-red-500" : ""}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          {...register(name)}
          className={`col-span-8 border border-input-bordergrey rounded-lg outline-none py-2 px-2 placeholder:text-xs placeholder:font-light
          ${errors[name] ? "border-red-500" : ""}`}
          rows={4}
        />
      )  : (
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`col-span-8 border border-input-bordergrey rounded-lg outline-none py-2 px-2 placeholder:text-xs placeholder:font-light
          ${errors[name] ? "border-red-500" : ""}`}
        />
      )}
  
      {errors[name] && (
        <p className="text-red-500 text-xs col-span-13 pt-1.5 text-end">
          {errors[name].message}
        </p>
      )}
    </div>
  );