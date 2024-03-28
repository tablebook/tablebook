import React, { createContext, useState } from "react";

const EditorContext = createContext();

export function EditorContextProvider({ children }) {
  const [editor, setEditor] = useState({
    language: "EN",
    isSignatureModalOpen: false,
    sharePopupAnchorElement: null,
  });

  const updateEditor = (newEditorData) => {
    setEditor((prevEditor) => ({
      ...prevEditor,
      ...newEditorData,
    }));
  };

  return (
    <EditorContext.Provider value={[editor, updateEditor]}>
      {children}
    </EditorContext.Provider>
  );
}

export default EditorContext;
