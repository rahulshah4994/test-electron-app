const keytar = require("keytar");
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", async () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector);
		if (element) element.innerText = text;
	};

	try {
		const [preload, user] = await ipcRenderer.invoke("getPassword");
		replaceText("preload", preload);
		replaceText("user", user);
	} catch (err) {
		console.log(err);
	}
});
