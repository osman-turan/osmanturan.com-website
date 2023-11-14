"use client";

import styled from "styled-components";

export const Header = styled.div`
  background: linear-gradient(
    to bottom,
    var(--header-gradient-start) 0%,
    var(--header-gradient-end) 100%
  );
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: -75px;
  height: 100px;

  @media (min-width: 576px) {
    height: 150px;
  }

  @media (min-width: 768px) {
    height: 200px;
  }

  @media (min-width: 992px) {
    height: 260px;
  }

  @media (min-width: 1200px) {
    height: 320px;
  }
`;

export const Profile = styled.div`
  text-align: center;
`;

export const Bio = styled.div`
  padding-top: 15px;

  h1 {
    font-weight: 500;
    line-height: 1;
    margin-bottom: 15px;
  }

  p {
    color: var(--dark-text-secondary-color);
  }
`;

export const Section = styled.section.attrs({ className: "container" })`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;

  h2 {
    color: var(--dark-text-secondary-color);
    margin-bottom: 30px;
  }
`;
