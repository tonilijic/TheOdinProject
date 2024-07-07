/* eslint-disable react/prop-types */

function DescriptionInputField({ value, updateValue, label }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-400 mb-2 font-normal text-sm">{label}</label>
      <textarea
        maxLength={200}
        className=" bg-gray-50 border-solid border-2 border-gray-100 hover:border-gray-200 outline-gray-300 rounded-md px-2 transitione ease-in duration-150 w-96 h-[120px]"
        type="text"
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      ></textarea>
    </div>
  );
}

export default DescriptionInputField;
