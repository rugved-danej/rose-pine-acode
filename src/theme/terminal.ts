const terminal = window.acode.require("terminal");

export function registerTerminalTheme(themeId: string, p: any, pluginId: string) {
  if (terminal && terminal.themes) {
    terminal.themes.register(themeId, {
      background: p.base.hex,
      foreground: p.text.hex,
      cursor: p.text.hex,
      cursorAccent: p.muted.hex,
      selectionBackground: p.highlightMed.hex,
      selectionForeground: p.text.hex,

      black: p.overlay.hex,
      red: p.love.hex,
      green: p.pine.hex,
      yellow: p.gold.hex,
      blue: p.foam.hex,
      magenta: p.iris.hex,
      cyan: p.rose.hex,
      white: p.text.hex,

      brightBlack: p.subtle.hex,
      brightRed: p.love.hex,
      brightGreen: p.pine.hex,
      brightYellow: p.gold.hex,
      brightBlue: p.foam.hex,
      brightMagenta: p.iris.hex,
      brightCyan: p.rose.hex,
      brightWhite: p.text.hex,
    }, pluginId);
  }
}

export function unregisterTerminalTheme(themeId: string, pluginId: string) {
  if (terminal && terminal.themes) {
    terminal.themes.unregister(themeId, pluginId);
  }
}
