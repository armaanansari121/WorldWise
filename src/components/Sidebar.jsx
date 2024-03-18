import React from "react";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
