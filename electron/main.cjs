const  { app, BrowserWindow } =require("electron")
const path = require("path")
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL("http://localhost:5173/");
}

app.whenReady().then(createWindow);



