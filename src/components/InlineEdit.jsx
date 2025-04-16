import React, { useState } from "react";
import { Input } from "./Input";
export const InlineEdit = ({ key, width, content, transaction, onChange, onCancel, type = "date" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(transaction);

  //   const handleEditClick = () => {
  //     setIsEditing(true);
  //   };

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setEditedTransaction((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleCancelClick = () => {
  //     setEditedTransaction(transaction);
  //     onCancel();
  //     setIsEditing(false);
  //   };

  return (
    <>
      {isEditing ? (
        <div key={key} className={`flex ${width} px-4 py-2 border-b`}>
          <Input
            type={type}
            name={key}
            value={editedTransaction[key]}
            onChange={(e) => onChange(key, e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div key={key} className={`${width} px-4 py-2 border-b`} onClick={() => setIsEditing(true)}>
          {content}
        </div>
      )}
    </>
  );
};
