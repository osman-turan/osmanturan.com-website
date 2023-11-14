"use client";

import styled from "styled-components";
import { TwitterIcon } from "./icons/TwitterIcon";
import { GitHubIcon } from "./icons/GitHubIcon";
import { CodepenIcon } from "./icons/CodepenIcon";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { StackOverflowIcon } from "./icons/StackOverflowIcon";
import { InstagramIcon } from "./icons/InstagramIcon";
import { HackerRankIcon } from "./icons/HackerRankIcon";

interface SocialMediaInfo {
  name: string;
  url: string;
  icon: React.FC;
}

const SOCIAL_MEDIA_INFO_LIST: SocialMediaInfo[] = [
  {
    name: "Twitter",
    url: "https://twitter.com/theosmanturan",
    icon: TwitterIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/osman-turan",
    icon: GitHubIcon,
  },
  {
    name: "Codepen",
    url: "https://codepen.io/osmanturan",
    icon: CodepenIcon,
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/osman-turan-360043a8/",
    icon: LinkedinIcon,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/theosmanturan/",
    icon: InstagramIcon,
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com/users/1113866/osman-turan",
    icon: StackOverflowIcon,
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/osmanturan",
    icon: HackerRankIcon,
  },
];

const Container = styled.div.attrs({ className: "row" })`
  justify-content: center;
  padding: 0;
  margin-bottom: 0;
`;

const SocialMedia = styled.div.attrs({ className: "col" })`
  margin-bottom: 30px;
  text-align: center;
  list-style: none;

  & > a {
    display: inline-block;
  }

  .svg-icon {
    display: block;
    margin: 0 auto 8px auto;
    width: 48px;
    height: 48px;
  }
`;

export function SocialMediaList(): JSX.Element {
  return (
    <Container>
      {SOCIAL_MEDIA_INFO_LIST.map(({ name, url, icon: Icon }) => (
        <SocialMedia key={name}>
          <a href={url} target="_blank">
            <Icon />
            <span>{name}</span>
          </a>
        </SocialMedia>
      ))}
    </Container>
  );
}
