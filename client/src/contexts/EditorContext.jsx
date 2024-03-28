import React, { createContext, useMemo, useState } from "react";

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

  const contextValues = useMemo(() => [editor, updateEditor], [editor]);

  return (
    <EditorContext.Provider value={contextValues}>
      {children}
    </EditorContext.Provider>
  );
}

export default EditorContext;
