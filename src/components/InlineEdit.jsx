import React, { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

import { Input } from "./Input";
export const InlineEdit = ({
  fieldKey,
  unEditableFields,
  width,
  content,
  transaction,
  onChange,
  onCancel,
  type = "date",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(transaction);

  const ref = useClickAway(() => {
    setIsEditing(false);
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
    const { value } = e.target;

    setEditedTransaction((prev) => ({ ...prev, [fieldKey]: value }));
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
            type={type}
            value={editedTransaction[fieldKey]}
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
