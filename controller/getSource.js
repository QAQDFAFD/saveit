const { ipcMain, BrowserWindow } = require('electron')

const getSource = url => {
    return new Promise((resolve, reject) => {
        const win = new BrowserWindow({
            width: 500,
            height: 500,
            show: false,
            webPreferences: {
                offscreen: true
            }
        })
        win.loadURL(url)

        win.webContents.on('did-finish-load', async () => {
            let title = win.getTitle()

            try {
                let image = await win.webContents.capturePage()
                let screenshot = image.toDataURL()

                resolve({
                    title,
                    screenshot,
                    url
                })
            } catch (error) {
                reject(error)
            }
        })
    })
}

ipcMain.handle('on-url-event', async (event, url) => {
    let res = await getSource(url)
    return res
})
