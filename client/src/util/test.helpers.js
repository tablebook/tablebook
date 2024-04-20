export const mockMinutesContextState = {
  minutes: {
    name: "",
    colors: {
      primary: "#0000FF",
      secondary: "#FF00FF",
    },
    segments: [
      {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        name: "Agenda",
        content: "Some content",
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Decisions",
        content: "Some content",
      },
    ],
    startTime: null,
    signatures: [
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        signer: "Test User",
        timestamp: "2024-03-30T00:00:00.000Z",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAB7CAYAAACb4F7QAAAAAXNSR0I",
      },
      {
        id: "55e3b7e7-9fbf-4f69-b633-8a1a8c03dde2",
        signer: "",
        timestamp: null,
        image: null,
      },
    ],
  },

  metadata: {
    writeAccess: true,
    writeToken: "writeaccesstoken",
    readToken: "readaccesstoken",
  },
};

export const mockEditorContextState = {
  language: "en",
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
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "test segment",
        content: "this is the first segment",
      },
    ],
    startTime: "2024-02-22T00:00:00.000Z",
    signatures: [
      {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        signer: "Test User",
        timestamp: "2024-02-22T00:00:00.000Z",
        image: "4rhcj2349rcym3498xfjxqm89324rcqo3m94trcq349",
      },
    ],
  },
  writeToken: "writeaccesstoken",
  readToken: "readaccesstoken",
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
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        name: "test segment",
        content: "this is the first segment",
      },
    ],
    startTime: "2024-02-22T00:00:00.000Z",
    signatures: [
      {
        id: "55e3b7e7-9fbf-4f69-b633-8a1a8c03dde2",
        signer: "Test User",
        timestamp: "2024-02-22T00:00:00.000Z",
        image: "4rhcj2349rcym3498xfjxqm89324rcqo3m94trcq349",
      },
    ],
  },
  readToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjZjMTU0ZmY2NTM4YTk0MzI4MmQ4ZSIsIndyaXRlQWNjZXNzIjpmYWxzZSwiaWF0IjoxNzEwNjcwMTY0fQ.6QjvITaXY69dwpT8Eb4--VjXYCaJ4cPpMO4P4jdgySQ",
  writeToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjZjMTU0ZmY2NTM4YTk0MzI4MmQ4ZSIsIndyaXRlQWNjZXNzIjp0cnVlLCJpYXQiOjE3MTA2NzAxNjR9.t9CXPTAAFA8F-kR2ktOcs5ERVXxIoYSxAHLi2itCH14",
};
