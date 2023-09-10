import { useEffect, useRef } from "react";
import styles from "../styles/TextArea.module.css";
const TextArea = ({ message, setMessage, onkeydown }) => {
  const ref = useRef();

  // This only tracks the auto-sized height so we can tell if the user has manually resized
  const autoHeight = useRef();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (
      autoHeight.current !== undefined &&
      ref.current.style.height !== autoHeight.current
    ) {
      // don't auto size if the user has manually changed the height
      return;
    }

    ref.current.style.height = "auto";
    ref.current.style.overflow = "hidden";
    const next = `${ref.current.scrollHeight}px`;
    ref.current.style.height = next;
    autoHeight.current = next;
    ref.current.style.overflow = "auto";
  }, [message, ref, autoHeight]);

  return (
    <textarea
      className={styles.textArea}
      ref={ref}
      style={{
        resize: "none",
        minHeight: "20px",
      }}
      placeholder="Start typing..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyDown={onkeydown}
    />
  );
};

export default TextArea;
