export const interceptConsole = () => {
	const unityFrame = document.getElementById('webglFrame')
	const unityWindow = (unityFrame as HTMLIFrameElement)?.contentWindow

	if (!unityWindow) return

	const consoleInterceptor = `
		(function() {
				const originalLog = console.log;
				console.log = function(...args) {
						originalLog.apply(console, args); // Preserve the original log behavior
						window.parent.window.WebGLMessage("WebGLLog", JSON.stringify(args));
						// window.parent.postMessage({ type: 'unityLog', payload: args }, '*'); // Send logs to parent
				};
		})();
	`;

	const script = unityWindow.document.createElement('script');
	script.textContent = consoleInterceptor;
	unityWindow.document.body.appendChild(script);
}
