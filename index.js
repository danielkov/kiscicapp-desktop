const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, icon: __dirname + 'public/img/thumbnail-cica.ico', frame: false});
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'public/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.setMenu(null);
  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
