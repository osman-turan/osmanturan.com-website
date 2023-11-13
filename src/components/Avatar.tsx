"use client";

import Image, { ImageProps } from "next/image";
import styled from "styled-components";

type AvatarProps = Pick<ImageProps, "src" | "width" | "height" | "priority">;

const StyledImage = styled(Image)`
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid var(--primary-color);
  width: 150px;
  height: 150px;
  background-color: var(--primary-color);
  object-fit: cover;
`;

export function Avatar(props: AvatarProps): JSX.Element {
  return <StyledImage {...props} alt="avatar" />;
}
