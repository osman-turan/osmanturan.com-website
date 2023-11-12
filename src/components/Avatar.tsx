import Image, { ImageProps } from "next/image";

type AvatarProps = Pick<ImageProps, "src" | "width" | "height" | "priority">;

export function Avatar(props: AvatarProps): JSX.Element {
  return <Image {...props} className="avatar" alt="avatar" />;
}
