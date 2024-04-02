const Inputbox = ({ label, placeholder, type, onChange }) => {
  return (
    <div className="flex flex-col font-mono">
      <label className="font-semibold text-lg">{label}</label>
      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        onChange={onChange}
        className="outline-none p-2 w-full rounded-md bg-white focus:border-4 border-blue-300 "
      />
    </div>
  );
};

export default Inputbox;
