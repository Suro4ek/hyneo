import React from "react";

const InputLabel = ({actionData, defaultvalue, name, value, type}:{actionData: any, defaultvalue: string,
                    name: string, value: string, type: "text"|"password"}) => {
    
    React.useEffect(() => {
        if (actionData?.errors?.[value]) {
            nameRef.current?.focus();
        }
    }, [actionData]);
    const nameRef = React.useRef<HTMLInputElement>(null);
    return(
        <div className="mb-6">
        <label htmlFor={value} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{name}</label>
        <input
            ref={nameRef}
            id={value}
            required
            autoFocus={true}
            defaultValue={defaultvalue}
            name={value}
            type={type}
            autoComplete={value}
            aria-invalid={actionData?.errors?.[value] ? true : undefined}
            aria-describedby={`${value}-error`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {actionData?.errors?.[value] && (
            <div className="pt-1 text-red-700" id="username-error">
                {actionData?.errors[value]}
            </div>
        )}

    </div>
    )
}

export default InputLabel;