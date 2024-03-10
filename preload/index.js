const { contextBridge, ipcRenderer } = require('electron')

const sendUrl = async url => {
    let res = await ipcRenderer.invoke('on-url-event', url)
    return res
}

const showDialog = async message => {
    let res = await ipcRenderer.invoke('show-dialog', message)
    return res
}

const showDialogConfirm = async message => {
    let res = await ipcRenderer.invoke('show-dialog-confirm', message)
    return res
}

const openUrlInGoogle = url => {
    ipcRenderer.invoke('open-url', url)
}

contextBridge.exposeInMainWorld('myApi', {
    sendUrl,
    showDialog,
    showDialogConfirm,
    openUrlInGoogle
})
