const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
let mainWindow;
const Store = require("secure-electron-store").default;
const fs = require("fs");

function createMainWindow() {
    const store = new Store({
        path: app.getPath("userData"),
    });
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            enableRemoteModule: true,
            additionalArguments: [`--storePath=${store.sanitizePath(app.getPath("userData"))}`],
            nodeIntegrationInWorker: true,
            webSecurity: false,
        },
    });
    const dev = process.env.NODE_ENV !== "production";
    const url = dev ? "http://localhost:3000" : `file://${path.join(__dirname, ".next/server/pages/index.html")}`;
    store.mainBindings(ipcMain, mainWindow, fs);
    mainWindow.loadURL(url);
    if (dev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}
app.on("ready", createMainWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});
