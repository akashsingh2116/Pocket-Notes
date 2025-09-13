import React, { useState } from "react";
import styles from "../styles/GroupModal.module.css";

const colors = [
  "#FF5733", // orange-red
  "#33C1FF", // sky blue
  "#28A745", // green
  "#FFC300", // yellow
  "#9B59B6", // purple
  "#E67E22", // orange
];


export default function CreateGroupModal({ onClose, onCreate }) {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleSubmit = () => {
    if (groupName.trim().length < 2) {
      alert("Group name must be at least 2 characters.");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
    onCreate({ name: groupName, color: selectedColor });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
      >
        <h2 className={styles.header}>Create New Group</h2>

        <div className={styles.field}>
          <label>Group Name:</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
        </div>

        <div className={styles.field}>
          <label>Choose Color:</label>
          <div className={styles.colorOptions}>
            {colors.map((c, i) => (
              <span
                key={i}
                className={`${styles.colorCircle} ${
                  selectedColor === c ? styles.active : ""
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setSelectedColor(c)}
              />
            ))}
          </div>
        </div>

        <button className={styles.createBtn} onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}
