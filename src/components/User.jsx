import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    signout();
    navigate("/");
  }

  if (!user) return;

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={(e) => handleClick(e)}>Sign-out</button>
    </div>
  );
}

export default User;
