const { app, BrowserWindow, globalShortcut } = require("electron");
const windowStateKeeper = require("electron-window-state");

let win;

function createWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 900,
    defaultHeight: 600,
  });

  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    backgroundColor: "#e8e7e6",
    title: "Learning Electron App",
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");

  // win.webContents.openDevTools();

  mainWindowState.manage(win);

  // globalShortcut.register("CommandOrControl+X", () => {
  //   console.log("CommandOrControl+X is pressed");
  //   win.reload();
  // });
}

// app.whenReady().then(createWindow)

app.on("ready", () => {
  createWindow();

  globalShortcut.register("CommandOrControl+X", () => {
    console.log("CommandOrControl+X is pressed after app is ready");
    win.reload();
  });
});

// app.on('before-quit', (e) => {
//   console.log('App is about to quit');
//   e.preventDefault();
// });

// app.on('will-quit', (e) => {
//   console.log('App will quit');
//   e.preventDefault();
// });

// app.on('browser-window-focus', () => {
//   console.log('Browser window focused');
// });

// app.on('browser-window-blur', () => {
//   console.log('Browser window blurred');
// });
