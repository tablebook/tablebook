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

export const mockGetMinutesResponse = {
  data: {
    colors: {
      primary: "#000000",
      secondary: "#000000",
    },
    name: "test minutes",
    segments: [
      {
        name: "test segment",
        content: "this is the first segment",
      },
    ],
    startTime: "2024-02-22T00:00:00.000Z",
    signatures: [
      {
        signer: "Test User",
        timestamp: "2024-02-22T00:00:00.000Z",
        image: "4rhcj2349rcym3498xfjxqm89324rcqo3m94trcq349",
      },
    ],
    id: "65f6c154ff6538a943282d8e",
  },
  writeAccess: true,
};

export const mockPostMinutesResponse = {
  data: {
    name: "test minutes",
    colors: {
      primary: "#000000",
      secondary: "#000000",
    },
    segments: [
      {
        name: "test segment",
        content: "this is the first segment",
      },
    ],
    startTime: "2024-02-22T00:00:00.000Z",
    signatures: [
      {
        signer: "Test User",
        timestamp: "2024-02-22T00:00:00.000Z",
        image: "4rhcj2349rcym3498xfjxqm89324rcqo3m94trcq349",
      },
    ],
    id: "65f6c154ff6538a943282d8e",
  },
  readToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjZjMTU0ZmY2NTM4YTk0MzI4MmQ4ZSIsIndyaXRlQWNjZXNzIjpmYWxzZSwiaWF0IjoxNzEwNjcwMTY0fQ.6QjvITaXY69dwpT8Eb4--VjXYCaJ4cPpMO4P4jdgySQ",
  writeToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjZjMTU0ZmY2NTM4YTk0MzI4MmQ4ZSIsIndyaXRlQWNjZXNzIjp0cnVlLCJpYXQiOjE3MTA2NzAxNjR9.t9CXPTAAFA8F-kR2ktOcs5ERVXxIoYSxAHLi2itCH14",
};
