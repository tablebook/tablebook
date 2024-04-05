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
    return storedEditorContext !== null
      ? JSON.parse(storedEditorContext)
      : initialState;
  });

  const updateEditor = (newEditorData) => {
    setEditor((prevEditor) => {
      const newState = {
        ...prevEditor,
        ...newEditorData,
      };
      localStorage.setItem("EditorContext", JSON.stringify(newState));
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
