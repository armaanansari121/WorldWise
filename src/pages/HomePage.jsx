import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import CityList from "../components/CityList";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      {/* <CityList /> */}
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/signin" className="cta">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}
