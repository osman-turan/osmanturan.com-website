import { useMemo } from "react";
import { Avatar } from "@/components/Avatar";

const CODING_START_YEAR = 1996;

export default function Home() {
  const codingYears = useMemo(
    () => new Date().getUTCFullYear() - CODING_START_YEAR,
    []
  );

  return (
    <>
      <header></header>

      <div className="profile">
        <Avatar
          src="/assets/images/osman.png"
          width="250"
          height="240"
          priority
        />
        <div className="bio">
          <h1>Osman Turan</h1>
          <p>Software Developer, Electrical-Electronics Engineer</p>
        </div>
      </div>
      <section className="container">
        <h2>About</h2>

        <p>
          Coding over {codingYears} years since age 11. Full stack developer
          with engineering background with thorough hands-on experience from
          low-level kernel programming to single-page web applications,
          socket-level networking to computer generated graphics, desktop
          applications to distributed systems with help of Agile methodologies
          and full lifecycle management. Enjoys automating some mundane tasks -
          including playing video games! Loves to optimize his algorithms with
          Genetic Algorithms. Reverse-engineering is his last trump card for
          undocumented behaviors and APIs.
        </p>
      </section>
      <section className="container">
        <h2>Contact</h2>
        <ul className="contact-channels row">
          <li className="col">
            <a href="https://twitter.com/theosmanturan" target="_blank">
              <i className="icon-twitter"></i>Twitter
            </a>
          </li>
          <li className="col">
            <a href="https://github.com/osman-turan" target="_blank">
              <i className="icon-github"></i>GitHub
            </a>
          </li>
          <li className="col">
            <a href="https://codepen.io/osmanturan" target="_blank">
              <i className="icon-codepen"></i>Codepen
            </a>
          </li>
          <li className="col">
            <a
              href="https://www.linkedin.com/in/osman-turan-360043a8/"
              target="_blank"
            >
              <i className="icon-linkedin"></i>Linkedin
            </a>
          </li>
          <li className="col">
            <a href="https://www.instagram.com/theosmanturan/" target="_blank">
              <i className="icon-instagram"></i>Instagram
            </a>
          </li>
          <li className="col">
            <a
              href="https://stackoverflow.com/users/1113866/osman-turan"
              target="_blank"
            >
              <i className="icon-stackoverflow"></i>Stack Overflow
            </a>
          </li>
          <li className="col">
            <a href="https://www.hackerrank.com/osmanturan" target="_blank">
              <i className="icon-hackerrank"></i>HackerRank
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
