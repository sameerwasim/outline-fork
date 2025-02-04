// eslint-disable-next-line import/no-unresolved
import "vite/modulepreload-polyfill";
import { Provider } from "mobx-react";
import * as React from "react";
import { render } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "react-router-dom";
import stores from "~/stores";
import Theme from "~/components/Theme";
import env from "~/env";
import { initI18n } from "~/utils/i18n";
import Routes from "./routes";
import { PluginManager } from "./utils/PluginManager";
import history from "./utils/history";
import { initSentry } from "./utils/sentry";

// Load plugins as soon as possible
void PluginManager.loadPlugins();

initI18n(env.DEFAULT_LANGUAGE);
const element = window.document.getElementById("root");

if (env.SENTRY_DSN) {
  initSentry(history);
}

if (element) {
  const App = () => (
    <React.StrictMode>
      <HelmetProvider>
        <Provider {...stores}>
          <Theme>
            <Router history={history}>
              <Routes />
            </Router>
          </Theme>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>
  );

  render(<App />, element);
}
