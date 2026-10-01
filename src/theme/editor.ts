const editorThemes = window.acode.require("editorThemes");
const cmLanguage = window.acode.require("@codemirror/language");
const t = window.acode.require("@lezer/highlight").tags;

export function registerEditorTheme(themeId: string, name: string, isDawn: boolean, p: any) {
  if (editorThemes) {
    const highlightStyle = cmLanguage.HighlightStyle.define([
      { tag: t.keyword, color: p.pine.hex },
      { tag: [t.name, t.deleted, t.character, t.macroName], color: p.text.hex },
      { tag: [t.propertyName, t.labelName], color: p.text.hex },
      { tag: [t.variableName], color: p.text.hex, fontStyle: "italic" },
      { tag: [t.function(t.variableName), t.function(t.propertyName)], color: p.rose.hex },
      { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: p.pine.hex },
      { tag: [t.definition(t.name)], color: p.rose.hex },
      { tag: [t.typeName, t.className, t.namespace], color: p.foam.hex },
      { tag: t.operator, color: p.subtle.hex },
      { tag: t.url, color: p.iris.hex },
      { tag: [t.escape, t.regexp], color: p.pine.hex },
      { tag: [t.meta, t.punctuation, t.separator], color: p.subtle.hex },
      { tag: t.comment, color: p.muted.hex, fontStyle: "italic" },
      { tag: t.strong, fontWeight: "bold" },
      { tag: t.emphasis, fontStyle: "italic" },
      { tag: t.strikethrough, textDecoration: "line-through" },
      { tag: t.link, color: p.iris.hex, textDecoration: "underline" },
      { tag: t.heading, fontWeight: "bold", color: p.text.hex },
      { tag: [t.bool, t.number], color: p.rose.hex },
      { tag: [t.processingInstruction, t.string, t.inserted], color: p.gold.hex },
      { tag: t.invalid, color: p.love.hex },
    ]);

    editorThemes.register({
      id: themeId,
      caption: name,
      dark: !isDawn,
      extensions: [
        editorThemes.createTheme({
          dark: !isDawn,
          styles: {
            "&": {
              color: p.text.hex,
              backgroundColor: p.base.hex
            },
            ".cm-content": {
              caretColor: p.text.hex
            },
            "&.cm-focused .cm-cursor": {
              borderLeftColor: p.text.hex
            },
            "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
              backgroundColor: p.highlightMed.hex
            },
            ".cm-activeLine": {
              backgroundColor: p.highlightLow.hex
            },
            ".cm-gutters": {
              backgroundColor: p.base.hex,
              color: p.muted.hex,
              border: "none"
            },
            ".cm-activeLineGutter": {
              backgroundColor: p.highlightLow.hex,
              color: p.text.hex
            },
            ".cm-selectionMatch": {
              backgroundColor: p.highlightLow.hex
            },
            ".cm-searchMatch": {
              backgroundColor: p.highlightLow.hex,
              outline: `1px solid ${p.highlightMed.hex}`
            },
            ".cm-searchMatch.cm-searchMatch-selected": {
              backgroundColor: p.highlightMed.hex,
              outline: `1px solid ${p.highlightHigh.hex}`
            },
            "&.cm-focused .cm-matchingBracket, .cm-matchingBracket": {
              backgroundColor: "rgba(235, 111, 146, 0.2)",
              color: p.gold.hex,
              fontWeight: "bold"
            },
            "&.cm-focused .cm-nonmatchingBracket, .cm-nonmatchingBracket": {
              backgroundColor: "rgba(235, 111, 146, 0.2)",
              color: p.love.hex
            },
            ".cm-tooltip": {
              border: `1px solid ${p.highlightMed.hex}`,
              backgroundColor: p.surface.hex,
              color: p.text.hex
            },
            ".cm-tooltip-autocomplete": {
              // @ts-ignore
              "& > ul > li[aria-selected]": {
                backgroundColor: p.highlightLow.hex,
                color: p.rose.hex
              }
            }
          }
        }),
        cmLanguage.syntaxHighlighting(highlightStyle)
      ]
    });
  }
}

export function unregisterEditorTheme(themeId: string) {
  if (editorThemes && editorThemes.unregister) {
    editorThemes.unregister(themeId);
  }
}
