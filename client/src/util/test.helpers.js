export const mockMinutesContextState = {
  minutes: {
    name: "",
    colors: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
    segments: [
      {
        name: "Agenda",
        content: "Some content",
      },
      {
        name: "Decisions",
        content: "Some content",
      },
    ],
    startTime: null,
    signatures: [],
  },

  metadata: {
    writeAccess: true,
    writeToken: "writeaccesstoken",
    readToken: "readaccesstoken",
  },
};

export const mockEditorContextState = {
  language: "EN",
  isSignatureModalOpen: false,
  sharePopupAnchorElement: null,
};
