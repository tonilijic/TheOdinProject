import TextInputField from "./input fields/TextInputField";
import DescriptionInputField from "./input fields/DescriptionInputField";
import { useState } from "react";
import DefaultButton from "./Button";

function Form() {
  const initialInputValues = {
    name: "",
    bio: "",
  };

  const inputFieldConfig = [
    { id: "name", label: "Name", type: "text" },
    { id: "bio", label: "Bio", type: "textarea" },
  ];

  const [inputValues, setInputValues] = useState(initialInputValues);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (fieldId, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { ...inputValues };
    setSubmittedData(formData);
    setIsSubmitted(true);
    console.log(formData);
  };

  const clearValues = (e) => {
    e.preventDefault();
    setInputValues(initialInputValues);
    setSubmittedData(null);
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col h-auto">
      {!isSubmitted ? (
        <>
          <button
            type="button"
            className="bg-slate-100 px-2 py-1 rounded-md ml-auto mb-6"
            onClick={clearValues}
          >
            Reset
          </button>
          <form className="" onSubmit={handleSubmit}>
            <div className="mb-10">
              {inputFieldConfig.map((field) => (
                <div key={field.id}>
                  {field.type === "textarea" ? (
                    <DescriptionInputField
                      label={field.label}
                      value={inputValues[field.id]}
                      updateValue={(value) =>
                        handleInputChange(field.id, value)
                      }
                    />
                  ) : (
                    <TextInputField
                      label={field.label}
                      value={inputValues[field.id]}
                      updateValue={(value) =>
                        handleInputChange(field.id, value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            <DefaultButton />
          </form>
        </>
      ) : (
        submittedData && (
          <div className="mt-4">
            {inputFieldConfig.map((field) => (
              <p
                key={field.id}
                className={`mb-2 ${
                  field.type === "text"
                    ? "font-bold text-base text-black"
                    : "text-sm text-gray-600"
                }`}
              >
                {submittedData[field.id]}
              </p>
            ))}
            <button
              type="button"
              className="bg-slate-100 px-2 py-1 rounded-md mt-4"
              onClick={() => {
                if (isSubmitted) {
                  setIsSubmitted(false);
                } else {
                  setIsSubmitted(true);
                }
              }}
            >
              Edit
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Form;
