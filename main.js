const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
    backgroundColor: "#e8e7e6",
    title: "Learning Electron App",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
}

// app.whenReady().then(createWindow)

app.on('ready', () => {
  createWindow();
});

// app.on('before-quit', (e) => {
//   console.log('App is about to quit');
//   e.preventDefault();
// });

app.on('will-quit', (e) => {
  console.log('App will quit');
  e.preventDefault();
});

app.on('browser-window-focus', () => {
  console.log('Browser window focused');
});

app.on('browser-window-blur', () => {
  console.log('Browser window blurred');
});