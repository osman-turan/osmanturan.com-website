import { useMemo } from "react";
import { Avatar } from "@/components/Avatar";
import { Bio, Header, Profile, Section } from "@/components/Profile";
import { SocialMediaList } from "@/components/SocialMediaList";

const CODING_START_YEAR = 1996;

export default function Home() {
  const codingYears = useMemo(
    () => new Date().getUTCFullYear() - CODING_START_YEAR,
    []
  );

  return (
    <>
      <Header />

      <Profile>
        <Avatar
          src="/assets/images/osman.png"
          width="250"
          height="240"
          priority
        />
        <Bio>
          <h1>Osman Turan</h1>
          <p>Software Developer, Electrical-Electronics Engineer</p>
        </Bio>
      </Profile>
      <Section>
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
      </Section>
      <Section>
        <h2>Contact</h2>
        <SocialMediaList />
      </Section>
    </>
  );
}
