import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function Layout({ children }: Props) {
  return <>{children}</>;
}
