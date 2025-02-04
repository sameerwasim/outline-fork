import * as React from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { SidebarContextType } from "~/components/Sidebar/components/SidebarContext";
import DataLoader from "./components/DataLoader";
import Document from "./components/Document";

type Params = {
  documentSlug: string;
  revisionId?: string;
  shareId?: string;
};

type LocationState = {
  title?: string;
  restore?: boolean;
  revisionId?: string;
  sidebarContext?: SidebarContextType;
};

type Props = RouteComponentProps<Params, StaticContext, LocationState>;

export default function DocumentScene(props: Props) {
  const { revisionId } = props.match.params;
  const documentSlug = "untitled-IPAKRNZdYo";

  const urlParts = documentSlug ? documentSlug.split("-") : [];
  const urlId = urlParts.length ? urlParts[urlParts.length - 1] : undefined;
  const key = [urlId, revisionId].join("/");

  return (
    <DataLoader
      key={key}
      match={{
        params: { documentSlug, revisionId, shareId: undefined },
        isExact: true,
        path: "/public",
        url: "/public",
      }}
      history={props.history}
      location={props.location}
    >
      {(rest) => {
        return <Document {...rest} />;
      }}
    </DataLoader>
  );
}
