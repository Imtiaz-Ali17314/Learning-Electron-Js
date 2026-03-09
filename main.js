const {
  app,
  BrowserWindow,
  globalShortcut,
  dialog,
  Tray,
  Menu,
} = require("electron");
const windowStateKeeper = require("electron-window-state");

let win;
let tray;

//  Menu Template
let isMac = process.platform === "darwin";
let temaplate = [
  isMac ? { role: "appMenu" } : { label: "Blog" },
  {
    label: "File",
    submenu: [
      {
        label: "Save",
        click: () => {
          console.log("Save menu item clicked");
        },
      },
      {
        label: "Save As",
        click: () => {
          console.log("Save As menu item clicked");
        },
      },
      {
        label: "Exit",
        click: () => {
          console.log("Exit menu item clicked");
        },
      },
      {
        label: "Reload",
        click: () => {
          console.log("Reload menu item clicked");
        },
      },
    ],
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Cut",
        click: () => {
          console.log("Cut menu item clicked");
        },
      },
      {
        label: "Copy",
        click: () => {
          console.log("Copy menu item clicked");
        },
      },
      {
        label: "Paste",
        click: () => {
          console.log("Paste menu item clicked");
        },
      },
    ],
  },
  {
    label: "Help",
    click: () => {
      console.log("Help menu item clicked");
    },
  },
];

const menu = Menu.buildFromTemplate(temaplate);

Menu.setApplicationMenu(menu);  // Top Manu Bar

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 900,
    defaultHeight: 600,
  });

  // Create the browser window.
  win = new BrowserWindow({
    // browser window size and position
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,

    backgroundColor: "#e8e7e6", // background color
    title: "Learning Electron App", // title of the window
    // frame: false,  -->  // to remove the default frame of the window
    webPreferences: {  // to connect the main process with the renderer process
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html"); // load the html file into the window

  win.webContents.openDevTools(); // open the DevTools.
  win.webContents.on("context-menu", () => {  // to show the context menu (right click menu)
    menu.popup();
  });

  mainWindowState.manage(win); // manage the window state (size and position)

  globalShortcut.register("shift+o", () => {  // to register the global shortcut
    dialog
      .showOpenDialog({
        defaultPath: app.getPath("videos"),
        buttonLabel: "Select file",
      })
      .then((result) => {
        console.log(result.filePaths);
      });
  });

  // Tray (The Icon which is shown in the right bottom corner of the screen)
  tray = new Tray("eleApp.png");
  tray.setToolTip("This is my electron learning application.");
  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
  });
  let template = [
    {
      label: "Show App",
      click: () => {
        win.isVisible() ? win.hide() : win.show();
      },
      cursor: "pointer",
    },
    {
      label: "Exit",
      click: () => {
        app.quit();
      },
    },
  ];
  tray.setContextMenu(Menu.buildFromTemplate(template));
}

// app.whenReady().then(createWindow)

app.on("ready", () => {
  createWindow();

  globalShortcut.register("CommandOrControl+X+Z", () => {
    console.log("CommandOrControl+X+Z is pressed after app is ready");
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
