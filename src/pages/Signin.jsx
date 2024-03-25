import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Signin.module.css";
import { useEffect, useState } from "react";
import Message from "../components/Message";

export default function Signin() {
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signinError } = useAuth();
  // console.log(authError);

  useEffect(
    function () {
      if (isAuthenticated)
        navigate("/app", {
          replace: true,
        });
    },
    [isAuthenticated, navigate]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      await signin(email, password);
    }
  }

  return (
    <main className={styles.signin}>
      <PageNav />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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

        {signinError ? <Message message={signinError} type={"error"} /> : null}

        <div>
          <Button type="primary">Sign-in</Button>
        </div>
      </form>
    </main>
  );
}
