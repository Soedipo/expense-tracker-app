import React, { useState } from "react";
import { useFirebaseUpdateDoc } from "../hooks/firebaseHooks";
import { useClickAway } from "@uidotdev/usehooks";
import { Input } from "./Input";

export const InlineEdit = ({ fieldKey, unEditableFields, width, content, data, path, type = "string", options = [] }) => {
  const { firebaseUpdateDoc } = useFirebaseUpdateDoc();
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

      firebaseUpdateDoc(path, id, { [fieldKey]: inputValue });
      setIsEditing(false);
    }
  });

  // const enter = useKeypress("Enter");
  // const esc = useKeypress("Escape");

  // // check to see if the user clicked outside of this component
  // useOnClickOutside(wrapperRef, () => {
  //   if (isInputActive) {
  //     onSetText(inputValue);
  //     setIsInputActive(false);
  //   }
  // });

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
    setInputValue(type === "number" ? parseFloat(e.target.value || 0) : e.target.value);
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
