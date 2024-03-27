import { createContext, useState } from "react";

const EditorContext = createContext();

export const EditorContextProvider = (props) => {
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
      {props.children}
    </EditorContext.Provider>
  );
};

export default EditorContext;
