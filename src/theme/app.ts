const themes = window.acode.require("themes");
const ThemeBuilder = window.acode.require("themeBuilder");

export function registerAppTheme(name: string, type: "dark" | "light", themeId: string, p: any) {
  const appTheme = new ThemeBuilder(name, type, "free");

  appTheme.primaryColor = p.base.hex;
  // @ts-ignore
  appTheme.darkenedPrimaryColor = p.base.hex;
  appTheme.primaryTextColor = p.text.hex;
  appTheme.secondaryColor = p.surface.hex;
  appTheme.secondaryTextColor = p.subtle.hex;
  appTheme.activeColor = p.rose.hex;
  appTheme.activeIconColor = p.rose.hex;
  appTheme.linkTextColor = p.iris.hex;
  appTheme.borderColor = p.highlightLow.hex;

  appTheme.popupIconColor = p.text.hex;
  appTheme.popupBackgroundColor = p.surface.hex;
  appTheme.popupTextColor = p.text.hex;
  appTheme.popupActiveColor = p.rose.hex;
  appTheme.popupBorderColor = p.highlightMed.hex;

  appTheme.boxShadowColor = p.overlay.hex;
  appTheme.buttonBackgroundColor = p.rose.hex;
  appTheme.buttonTextColor = p.base.hex;
  appTheme.buttonActiveColor = p.love.hex;
  appTheme.activeTextColor = p.base.hex;
  appTheme.errorTextColor = p.love.hex;
  appTheme.dangerColor = p.love.hex;
  appTheme.scrollbarColor = p.highlightMed.hex;

  appTheme.preferredEditorTheme = themeId;
  // @ts-ignore
  appTheme.preferredTerminalTheme = themeId;

  themes.add(appTheme);

  const existingAppTheme = themes.get(appTheme.id);
  if (existingAppTheme) {
    existingAppTheme.preferredEditorTheme = themeId;
    // @ts-ignore
    existingAppTheme.preferredTerminalTheme = themeId;
  }
}
