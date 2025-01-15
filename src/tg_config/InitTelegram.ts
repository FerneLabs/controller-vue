import {
    backButton,
    viewport,
    themeParams,
    miniApp,
    initData,
    swipeBehavior,
    $debug,
    init as initSDK,
} from '@telegram-apps/sdk-vue';

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
    $debug.set(debug);
    initSDK();

    // Check if all required components are supported.
    if (!backButton.isSupported() || !miniApp.isSupported()) {
        throw new Error('ERR_NOT_SUPPORTED');
    }

    // Mount all components used in the project.
    swipeBehavior.mount();
    backButton.mount();
    miniApp.mount();
    themeParams.mount();
    initData.restore();
    void viewport.mount().catch(e => {
        console.error('[initTelegram] Something went wrong mounting the viewport', e);
    }).then(() => {
        viewport.bindCssVars();
    });

    swipeBehavior.disableVertical();
    miniApp.bindCssVars();
    themeParams.bindCssVars();
}