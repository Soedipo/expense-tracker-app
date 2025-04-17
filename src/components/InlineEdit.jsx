import React, { useState } from "react";
import { Input } from "./Input";
export const InlineEdit = ({ fieldKey, width, content, transaction, onChange, onCancel, type = "date" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(transaction);
  const unEditableFields = ["pick", "delete"];
  const isUnEditable = unEditableFields.includes(fieldKey);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { fieldKey, value } = e.target;
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
          {/* <Input type={type} name={key} value={editedTransaction[key]} onChange={(e) => handleInputChange(e)} /> */}
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
