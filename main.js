const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#e8e7e6",
    title: "Learning Electron App",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
