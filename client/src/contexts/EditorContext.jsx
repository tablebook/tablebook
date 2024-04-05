import React, { createContext, useMemo, useState } from "react";

const EditorContext = createContext();

const initialState = {
  language: "EN",
  isSignatureModalOpen: false,
  sharePopupAnchorElement: null,
};

export function EditorContextProvider({ children }) {
  const [editor, setEditor] = useState(() => {
    const storedEditorContext = localStorage.getItem("EditorContext");

    if (storedEditorContext !== null) {
      const parsedStoredContext = JSON.parse(storedEditorContext);
      return {
        ...initialState,
        ...parsedStoredContext,
      };
    }

    // returning the initial state if there is no storedEditorContext
    return initialState;
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
