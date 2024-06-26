import { GlobalContext } from "./global-context";
type Props = {
  children: React.ReactNode;
};

export function ContextConsumer({ children }: Props) {
  return <GlobalContext.Consumer>{() => children}</GlobalContext.Consumer>;
}
