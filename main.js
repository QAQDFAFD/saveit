const { create } = require('domain')
const { app, BrowserWindow, shell, ipcMain, Tray, Menu } = require('electron')
const path = require('path')
require('./controller/getSource')
require('./controller/showDialog')
;('')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload/index.js')
        },
        autoHideMenuBar: true,
        title: '网页收藏'
    })

    win.loadURL('http://localhost:5173/')

    win.webContents.openDevTools()

    win.on('ready-to-show', () => {
        win.show()
    })

    win.on('close', e => {
        e.preventDefault()
        win.hide()
    })

    let tray = null

    const iconPath = path.join(__dirname, 'icons', 'icon.png')
    tray = new Tray(iconPath)

    const contextMenu = Menu.buildFromTemplate([
        {
            label: '退出',
            click: () => {
                win.destroy()
                app.quit()
            }
        }
    ])

    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)

    tray.on('click', event => {
        win.show()
    })
}

app.whenReady().then(() => {
    createWindow()
    // createTray()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

const openUrlInGoogle = url => {
    // const googleSearchUrl = `https://www.google.com/search?q=${url}`
    shell.openExternal(url)
}

ipcMain.handle('open-url', (event, url) => {
    openUrlInGoogle(url)
})
