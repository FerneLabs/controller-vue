import type { AppConfig } from "vue";

const formatError = (err: unknown): { message: string } => {
    return {
        message: err instanceof Error
            ? err.message
            : typeof err === 'string'
                ? err
                : JSON.stringify(err),
    };
}

export const errorHandler: AppConfig['errorHandler'] = (err) => {
    const payload = formatError(err)
    window.VueMessage('DisplayError', JSON.stringify(payload))
}