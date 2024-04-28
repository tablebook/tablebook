import React, { createContext, useMemo, useState } from "react";

const EditorContext = createContext();

const initialState = {
  language: "en",
  isSignatureModalOpen: false,
  signatureIndex: null,
  isPreviewPrintPDFModalOpen: false,
  sharePopupAnchorElement: null,
  reloadPopupAnchorElement: null,
  languagePopupAnchorElement: null,
  colorSettingsPopupAnchorElement: null,
  colorPickerPopupAnchorElement: null,
  colorPickerPopupColor: null,
};

export function EditorContextProvider({ children }) {
  const [editor, setEditor] = useState(() => {
    const sessionData = sessionStorage.getItem("EditorContext");
    const localData = localStorage.getItem("EditorContext");

    // if there is a stored context, initial state and the context are combined
    // because not everything from editorContext is stored there
    if (sessionData) {
      return { ...initialState, language: sessionData };
    }
    if (localData) {
      return { ...initialState, language: localData };
    }
    return initialState;
  });

  const updateEditor = (newEditorData) => {
    setEditor((prevEditor) => {
      const newState = {
        ...prevEditor,
        ...newEditorData,
      };
      const { language } = newState;
      sessionStorage.setItem("EditorContext", language);
      localStorage.setItem("EditorContext", language);
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
