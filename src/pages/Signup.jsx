import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import Message from "../components/Message";
import styles from "./Signup.module.css";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signupMessage, signupError } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (name && email && password) {
      await signup(name, email, password);
    }
  }

  return (
    <main className={styles.signup}>
      <PageNav />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          {signupMessage ? (
            <Message message={signupMessage} type={"message"} />
          ) : (
            <Button type="primary">Sign-up</Button>
          )}
        </div>
        {signupError ? <Message message={signupError} type={"error"} /> : null}
      </form>
    </main>
  );
}
