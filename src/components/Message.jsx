import styles from "./Message.module.css";

function Message({ message, type }) {
  return <p className={styles[type]}>{message}</p>;
}

export default Message;
