import plugin from "../plugin.json";
import { variants } from "@rose-pine/palette";
import styles from "./styles/main.scss";

import { registerAppTheme } from "./theme/app";
import { registerTerminalTheme, unregisterTerminalTheme } from "./theme/terminal";
import { registerEditorTheme, unregisterEditorTheme } from "./theme/editor";
import { revertToDefaults } from "./utils/cleanup";

class RosePineTheme {
  // @ts-ignore
  baseUrl: string;
  $style!: HTMLStyleElement;

  async init() {
    this.$style = document.createElement("style");
    this.$style.id = "rose-pine-plugin-css";
    this.$style.innerHTML = styles;
    document.head.append(this.$style);

    for (const [flavorName, flavorData] of Object.entries(variants)) {
      const themeId = `rosePine${flavorName.charAt(0).toUpperCase() + flavorName.slice(1)}`;
      const isDawn = flavorName === "dawn";
      const name = isDawn ? "Rosé Pine Dawn" : flavorName === "moon" ? "Rosé Pine Moon" : "Rosé Pine";
      
      registerAppTheme(name, isDawn ? "light" : "dark", themeId, flavorData);
      registerTerminalTheme(themeId, flavorData, plugin.id);
      registerEditorTheme(themeId, name, isDawn, flavorData);
    }
  }

  async destroy() {
    if (this.$style) {
      this.$style.remove();
    }
    
    for (const flavorName of Object.keys(variants)) {
      const themeId = `rosePine${flavorName.charAt(0).toUpperCase() + flavorName.slice(1)}`;
      unregisterTerminalTheme(themeId, plugin.id);
      unregisterEditorTheme(themeId);
    }
    
    revertToDefaults();
  }
}

if (window.acode) {
  const acodePlugin = new RosePineTheme();
  window.acode.setPluginInit(
    plugin.id,
    async (baseUrl: string) => {
      if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
      }
      acodePlugin.baseUrl = baseUrl;
      await acodePlugin.init();
    }
  );
  window.acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
