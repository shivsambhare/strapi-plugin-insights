"use strict";
const react = require("react");
const reactIntl = require("react-intl");
const jsxRuntime = require("react/jsx-runtime");
const icons = require("@strapi/icons");
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
const PLUGIN_VERSION = "0.2.0";
const DEFAULT_RANGE = "30d";
const RANGE_OPTIONS = [
  { value: "7d", label: "7 days", days: 7 },
  { value: "30d", label: "30 days", days: 30 },
  { value: "90d", label: "90 days", days: 90 },
  { value: "all", label: "All time", days: null }
];
function getRangeOption(value = DEFAULT_RANGE) {
  return RANGE_OPTIONS.find((option) => option.value === value) || RANGE_OPTIONS[1];
}
const PLUGIN_ID = "strapi-plugin-insights";
const getTranslation = (id) => `${PLUGIN_ID}.${id}`;
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  const { formatMessage } = reactIntl.useIntl();
  react.useEffect(() => {
    ref.current("strapi-plugin-insights");
  }, []);
  return formatMessage({
    id: getTranslation("plugin.name"),
    defaultMessage: "Insights"
  });
};
const PluginIcon = () => /* @__PURE__ */ jsxRuntime.jsx(icons.TrendUp, {});
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
        const { App } = await Promise.resolve().then(() => require("./App-GYYm-B9F.js"));
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
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("./en-YIUqAQs0.js")) }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
exports.DEFAULT_RANGE = DEFAULT_RANGE;
exports.PLUGIN_ID = PLUGIN_ID;
exports.PLUGIN_VERSION = PLUGIN_VERSION;
exports.PluginIcon = PluginIcon;
exports.RANGE_OPTIONS = RANGE_OPTIONS;
exports.getRangeOption = getRangeOption;
exports.index = index;
