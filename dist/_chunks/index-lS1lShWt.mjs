import { useRef, useEffect } from "react";
import { useIntl } from "react-intl";
import { jsx } from "react/jsx-runtime";
import { TrendUp } from "@strapi/icons";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_DISPLAY_NAME = "Insights";
const PLUGIN_VERSION = "0.1.0";
const PLUGIN_ID = "strapi-plugin-insights";
const getTranslation = (id) => `${PLUGIN_ID}.${id}`;
const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  const { formatMessage } = useIntl();
  useEffect(() => {
    ref.current("strapi-plugin-insights");
  }, []);
  return formatMessage({
    id: getTranslation("plugin.name"),
    defaultMessage: "Insights"
  });
};
const PluginIcon = () => /* @__PURE__ */ jsx(TrendUp, {});
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_DISPLAY_NAME
      },
      Component: async () => {
        const { App } = await import("./App-CwjfIQ0x.mjs");
        return App;
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("./en-DpDXLHhC.mjs") }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
export {
  PLUGIN_ID as P,
  PLUGIN_VERSION as a,
  PluginIcon as b,
  index as i
};
