import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/signin" className={styles.ctaLink}>
            Sign-in
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={styles.ctaLink}>
            Sign-up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
