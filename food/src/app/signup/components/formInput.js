export const FormInput = (props) => {
  const { handleChange, name, value, errors, errorsMess, place } = props;
  return (
    <div className=" flex flex-col gap-2 justify-center">
      <input
        className="  w-[416px] h-11 rounded-lg p-3 border border-gray-300 cursor-pointer bg-white text-white "
        onChange={handleChange}
        name={name}
        value={value === undefined ? "" : value}
        placeholder={place}
        style={{
          borderColor: errors ? "#e14942" : "lightgray",
          color: errors ? "#e14942" : "black",
        }}
      />
      {errors && <div style={{ color: "#e14942" }}>{errorsMess}</div>}
    </div>
  );
};
