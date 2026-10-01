const themes = window.acode.require("themes");
const settings = window.acode.require("settings");
const toast = window.acode.require("toast");

export function revertToDefaults() {
  let reverted = false;

  if (settings && settings.value.appTheme && settings.value.appTheme.startsWith("rosé pine")) {
    settings.update({ appTheme: "dark" }, false, false);
    
    const darkTheme = themes.get("dark");
    if (darkTheme) {
      document.body.setAttribute("theme-type", darkTheme.type);
      const $style = document.head.querySelector("style#app-theme");
      if ($style) $style.textContent = darkTheme.css;
      // @ts-ignore
      if (window.system && window.system.setUiTheme) {
        // @ts-ignore
        window.system.setUiTheme(darkTheme.primaryColor, darkTheme.toJSON("hex"));
      }
    }
    reverted = true;
  }
  
  if (settings && settings.value.editorTheme && settings.value.editorTheme.startsWith("rosePine")) {
    settings.update({ editorTheme: "one_dark" }, false, false);
    // @ts-ignore
    if (window.editorManager && window.editorManager.editor) {
      // @ts-ignore
      window.editorManager.editor.setTheme("one_dark");
    }
    reverted = true;
  }
  
  // @ts-ignore
  if (settings && settings.value.terminalSettings && settings.value.terminalSettings.theme && settings.value.terminalSettings.theme.startsWith("rosePine")) {
    // @ts-ignore
    const termSettings = settings.value.terminalSettings;
    termSettings.theme = "dark";
    // @ts-ignore
    settings.update({ terminalSettings: termSettings } as any, false, false);
    reverted = true;
  }

  if (reverted) {
    if (toast) toast("Rosé Pine uninstalled. Switched back to defaults.", 3000);
  }
}
