import * as React from "react";
import { Switch } from "react-router-dom";
import DelayedMount from "~/components/DelayedMount";
import FullscreenLoading from "~/components/FullscreenLoading";
import Route from "~/components/ProfiledRoute";
import lazyWithRetry from "~/utils/lazyWithRetry";
import { observer } from "mobx-react";
import WebsocketProvider from "~/components/WebsocketProvider";
import { DocumentContextProvider } from "~/components/DocumentContext";

const Document = lazyWithRetry(() => import("~/scenes/Document"));

function Routes() {
  return (
    <WebsocketProvider>
      <DocumentContextProvider>
        <React.Suspense
          fallback={
            <DelayedMount delay={2000}>
              <FullscreenLoading />
            </DelayedMount>
          }
        >
          <Switch>
            <Route path="/public" component={Document} />
          </Switch>
        </React.Suspense>
      </DocumentContextProvider>
    </WebsocketProvider>
  );
}

export default observer(Routes);
