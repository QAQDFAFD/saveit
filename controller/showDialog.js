const { ipcMain, dialog } = require('electron')

ipcMain.handle('show-dialog', async (event, arg) => {
    const res = await dialog.showMessageBox({
        type: 'info',
        message: arg,
        buttons: ['OK']
    })
    return res
})

// 两个按钮，一个确定，一个取消
ipcMain.handle('show-dialog-confirm', async (event, arg) => {
    const res = await dialog.showMessageBox({
        type: 'info',
        message: arg,
        buttons: ['取消', '确定']
    })
    return res
})
