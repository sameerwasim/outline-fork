import { observer } from "mobx-react";
import * as React from "react";

import { DocumentContextProvider } from "./DocumentContext";

type Props = {
  children?: React.ReactNode;
};

const AuthenticatedLayout: React.FC = ({ children }: Props) => {
  return <DocumentContextProvider>{children}</DocumentContextProvider>;
};

export default observer(AuthenticatedLayout);
