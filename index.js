const { app, BrowserWindow, ipcMain } = require("electron");
const keytar = require("keytar");
const path = require("path");

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.loadFile("index.html");
	win.webContents.openDevTools();
}

ipcMain.handle("getPassword", () => {
	return Promise.all([
		new Promise((res) => res("SKIPPED")),
		// keytar.getPassword("test-electron-app", "test-preload"),
		keytar.getPassword("test-electron-app", "test-user"),
	]);
});

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
