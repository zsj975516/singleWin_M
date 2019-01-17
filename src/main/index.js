import {app, BrowserWindow, ipcMain} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const isReadyClose = {}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    // minWidth: 710,
    // minHeight: 500,
    useContentSize: true,
    maximizable: false,
    resizable: false,
    show: false,
    frame: false
  })

  mainWindow.loadURL(winURL)
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on("close", event => {
    if (!isReadyClose.main) {
      event.preventDefault()
      mainWindow.webContents.send('questClose', 'main')
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('answerClose', (ev, arg) => {
  isReadyClose[arg.name] = arg.answerClose
  if (arg.answerClose) {
    if (arg.name === 'main') mainWindow.close()
  }
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
