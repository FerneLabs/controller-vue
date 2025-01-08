window.WebGLMessage = (method, payload): void => {
    console.log("webgl message", method, payload);
    const parsedPayload = JSON.parse(payload);

    if (window.App && typeof window.App.handleWebGLMessage === "function") {
        window.App.handleWebGLMessage(method, parsedPayload);
    } else {
        console.warn("Vue app is not ready to handle Unity events.");
    }
}