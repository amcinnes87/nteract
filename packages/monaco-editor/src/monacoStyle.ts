import { createGlobalStyle } from "styled-components";

/*
For the following components, we use the inherited width values from monaco-container.
On resizing the browser, the width of monaco-container will be calculated
and we just use the calculated width for the following components
So we don't need to use Monaco editor's layout() function which is expensive operation and causes performance issues on resizing.
*/

export default createGlobalStyle`
  .monaco-container .monaco-editor {
    width: inherit !important;
  }

  .monaco-container .monaco-editor .overflow-guard {
    width: inherit !important;
  }

  /* 26px is the left margin for .monaco-scrollable-element  */
  .monaco-container .monaco-editor .monaco-scrollable-element.editor-scrollable.vs {
    width: calc(100% - 26px) !important;
  }
`;