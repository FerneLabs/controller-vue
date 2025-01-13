window.WebGLMessage = (method, payload): void => {
    if (window.App && typeof window.App.handleWebGLMessage === "function") {
        window.App.handleWebGLMessage(method, payload);
    } else {
        console.warn("[WebGLMessage] Vue app is not ready to handle Unity events.");
    }
}