// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electron", {
//     store: {
//         get: (key) => ipcRenderer.invoke("store-get", key),
//         set: (key, value) => ipcRenderer.invoke("store-set", key, value),
//     },
// });

// contextBridge.exposeInMainWorld("rajit", {
//     doThing: () => console.log("rajit"),
// });

const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const Store = require("secure-electron-store").default;

// Create the electron store to be made available in the renderer process
let store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
    store: store.preloadBindings(ipcRenderer, fs),
});
