import React, { useState } from "react";
import { useFirebaseUpdateDoc } from "../hooks/firebaseHooks";
import { useClickAway } from "@uidotdev/usehooks";
import { useSanitize } from "../hooks/useSanitize";
import { Input } from "./Input";

export const InlineEdit = ({
  fieldKey,
  unEditableFields,
  width,
  content,
  data,
  path,
  type = "string",
  options = [],
}) => {
  const { firebaseUpdateDoc } = useFirebaseUpdateDoc();
  const { trimLeadingZeros } = useSanitize();
  const id = data.id;
  const prevValue = data[fieldKey];
  const [inputValue, setInputValue] = useState(prevValue);
  const [isEditing, setIsEditing] = useState(false);

  const ref = useClickAway(() => {
    if (isEditing) {
      if (inputValue === prevValue) {
        setIsEditing(false);
        return;
      }

      firebaseUpdateDoc(path, id, { [fieldKey]: type === "number" ? parseFloat(inputValue) : inputValue })
        .then(() => {
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
          setInputValue(prevValue); // Reset to previous value on error
        });
      setIsEditing(false);
    }
  });

  // const enter = useKeypress("Enter");
  // const esc = useKeypress("Escape");

  // const onEnter = useCallback(() => {
  //   if (enter) {
  //     onSetText(inputValue);
  //     setIsInputActive(false);
  //   }
  // }, [enter, inputValue, onSetText]);

  // const onEsc = useCallback(() => {
  //   if (esc) {
  //     setInputValue(props.text);
  //     setIsInputActive(false);
  //   }
  // }, [esc, props.text]);

  const isUnEditable = unEditableFields.includes(fieldKey);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const value = type === "number" ? e.target.value.toString() : e.target.value;
    setInputValue(type === "number" ? trimLeadingZeros(value) || 0 : e.target.value);
  };

  //   const handleCancelClick = () => {
  //     setEditedTransaction(transaction);
  //     onCancel();
  //     setIsEditing(false);
  //   };

  return (
    <>
      {isEditing && !isUnEditable ? (
        <div key={fieldKey} className={`flex ${width} px-4 py-2 border-b`}>
          <Input
            ref={ref}
            type={type}
            value={inputValue}
            options={options}
            onChange={(e) => handleInputChange(e)}
            onBlur={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div key={fieldKey} className={`${width} px-4 py-2 border-b`} onClick={() => handleEditClick()}>
          {content}
        </div>
      )}
    </>
  );
};
