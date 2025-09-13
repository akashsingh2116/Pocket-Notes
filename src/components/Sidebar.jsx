import React from "react";
import styles from "../styles/Sidebar.module.css";

// Utility: create initials (1 or 2 letters)
const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return words[0][0].toUpperCase();
};

const Sidebar = ({ groups, onAddClick, onSelectGroup, activeGroup }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>Pocket Notes</div>

      <div className={styles.groups}>
        {groups.map((group, i) => (
          <div
            key={i}
            className={`${styles.groupItem} ${
              activeGroup === group.name ? styles.active : ""
            }`}
            onClick={() => onSelectGroup(group.name)}
          >
            <div
              className={styles.circle}
              style={{ backgroundColor: group.color }}
            >
              {getInitials(group.name)}
            </div>
            <span>{group.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.addBtn} onClick={onAddClick}>
        +
      </div>
    </div>
  );
};

export default Sidebar;
