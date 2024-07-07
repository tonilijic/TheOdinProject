/* eslint-disable react/prop-types */

function TextInputField({ value, updateValue, label }) {
  return (
    <div className="my-10 w-96 flex flex-col">
      <label className="text-gray-400 mb-2 font-normal text-sm">{label}</label>
      <input
        className=" bg-gray-50 border-solid border-2 border-gray-100 hover:border-gray-200 outline-gray-300 rounded-md h-10 px-2 transitione ease-in duration-150"
        type="text"
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      />
    </div>
  );
}

export default TextInputField;
