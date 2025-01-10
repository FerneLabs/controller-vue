window.VueMessage = (method, payload): void => {
    const unityFrame = document.getElementById("webglFrame");
    const unityWindow = (unityFrame as HTMLIFrameElement)?.contentWindow;

    if (!unityWindow || !unityWindow?.gameInstance) {
        throw new Error("Game instance not initialized");
    }

    console.log(unityWindow.gameInstance);

    if (method === 'RegisterAccount' && payload) {
        unityWindow.gameInstance.SendMessage("JSMessenger", "RegisterAccount", payload);
    }

    if (method === 'UnregisterAccount') {
        unityWindow.gameInstance.SendMessage("JSMessenger", "UnregisterAccount");
    }

    if (method === 'DisplayError' && payload) {
        unityWindow.gameInstance.SendMessage("JSMessenger", "DisplayError", payload);
    }
}