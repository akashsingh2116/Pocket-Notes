import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/NotesArea.module.css";
import illustration from "../assets/illustration.svg";

const EmptyGroupPlaceholder = ({ text }) => (
  <div className={styles.emptyCenter}>
    <img
      src={illustration}
      alt="illustration"
      className={styles.smallIllustration}
    />
    <h3>{text}</h3>
    <p className={styles.subText}>
      Send messages to this group. They will be saved locally.
    </p>
  </div>
);

const NotesArea = ({ group, onSendMessage, onBack, isMobile = false }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessage("");
    if (inputRef.current) inputRef.current.focus();
  }, [group]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [group?.messages?.length]);

  const submit = () => {
    const trimmed = message.trim();
    if (!trimmed || !group) return;
    onSendMessage(group.name, trimmed);
    setMessage("");
    if (inputRef.current) inputRef.current.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  if (!group) {
    return (
      <div className={styles.landing}>
        <div className={styles.centerContent}>
          <img
            src={illustration}
            alt="Pocket Notes"
            className={styles.heroIllustration}
          />
          <h1 className={styles.title}>Pocket Notes</h1>
          <p className={styles.lead}>
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
        <div className={styles.footer}>
          <span className={styles.lock}>🔒</span>
          <span className={styles.footerText}>end-to-end encrypted</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.groupPage}>
      <div className={styles.groupHeader}>
        {isMobile && (
          <button className={styles.backBtn} onClick={onBack}>
            ←
          </button>
        )}
        <div
          className={styles.groupBadge}
          style={{ backgroundColor: group.color }}
        >
          {group.name
            .split(" ")
            .map((w) => w[0] || "")
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>
        <div className={styles.groupTitle}>{group.name}</div>
      </div>

      <div className={styles.messagesArea}>
        {!group.messages || group.messages.length === 0 ? (
          <EmptyGroupPlaceholder text="No messages yet — say something!" />
        ) : (
          group.messages.map((m) => (
            <div key={m.id} className={styles.messageCard}>
              <div className={styles.messageText}>{m.text}</div>
              <div className={styles.messageMeta}>
                {new Date(m.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputBar}>
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`Enter your text here... #${group.name}`}
          rows={1}
          className={styles.textarea}
        />
        <button
          className={`${styles.sendBtn} ${
            message.trim() ? styles.sendEnabled : ""
          }`}
          onClick={submit}
          disabled={!message.trim()}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default NotesArea;
