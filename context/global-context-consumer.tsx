import Loader from "@/components/loader/loader";
import { GlobalContext } from "./global-context";
type Props = {
  children: React.ReactNode;
};

export function ContextConsumer({ children }: Props) {
  return <GlobalContext.Consumer>{(data) => (data.loading ? <Loader /> : children)}</GlobalContext.Consumer>;
}
