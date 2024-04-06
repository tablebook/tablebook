import React, { createContext, useMemo, useState } from "react";

const EditorContext = createContext();

const initialState = {
  language: "EN",
  isSignatureModalOpen: false,
  isPreviewPrintPDFModalOpen: false,
  sharePopupAnchorElement: null,
};

export function EditorContextProvider({ children }) {
  const [editor, setEditor] = useState(() => {
    const storedEditorContext = localStorage.getItem("EditorContext");

    // if there is a stored context, initial state and the context are combined
    // because not everything from editorContext is stored there
    return storedEditorContext
      ? { ...initialState, ...JSON.parse(storedEditorContext) }
      : initialState;
  });

  const updateEditor = (newEditorData) => {
    setEditor((prevEditor) => {
      const newState = {
        ...prevEditor,
        ...newEditorData,
      };
      const { language } = newState;
      localStorage.setItem("EditorContext", JSON.stringify({ language }));
      return newState;
    });
  };

  const contextValues = useMemo(() => [editor, updateEditor], [editor]);

  return (
    <EditorContext.Provider value={contextValues}>
      {children}
    </EditorContext.Provider>
  );
}

export default EditorContext;
