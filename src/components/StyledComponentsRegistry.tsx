"use client";

import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useState } from "react";
import {
  ServerStyleSheet,
  StyleSheetManager,
  createGlobalStyle,
} from "styled-components";
import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap-grid.css";

const GlobalStyle = createGlobalStyle`
    :root {
        --primary-color: #293133;
        --header-gradient-start: #070809; /* darken(--primary-color, 15%) */
        --header-gradient-end: #4b5a5d; /* lighten(--primary-color, 15%) */

        --dark-text-primary-color: rgba(0, 0, 0, 0.87);
        --dark-text-secondary-color: rgba(0, 0, 0, 0.7);
    }

    h1 {
        font-size: 2.5rem;
    }

    h2 {
        font-size: 2rem;
    }

    h1, h2 {
        font-weight: 500;
        line-height: 1.2;
    }

    body {
        color: var(--dark-text-primary-color);
        font-family: "Helvetica Neue", "Calibri Light", Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        letter-spacing: 0.02em;
    }
`;

interface StyledComponentsRegistryProps {
  children: ReactNode;
}

export function StyledComponentsRegistry({
  children,
}: StyledComponentsRegistryProps) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styleSheet.getStyleElement();
    styleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styleSheet.instance}>
      <GlobalStyle />
      <>{children}</>
    </StyleSheetManager>
  );
}
