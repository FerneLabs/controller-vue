import type { AppConfig } from "vue";

const formatError = (err: unknown): { data: string } => {
    return {
        data: err instanceof Error
            ? err.message
            : typeof err === 'string'
                ? err
                : JSON.stringify(err),
    };
}

export const errorHandler: AppConfig['errorHandler'] = (err) => {
    const payload = formatError(err)
    window.VueMessage('DisplayError', JSON.stringify(payload))
    // const root = document.getElementById('app') ?? document.body
    // root.insertAdjacentHTML('beforeend', `
    //         <div>
    //             <p>An unhandled error occurred:</p>
    //             <blockquote>
    //                 <code>
    //                 ${error}
    //                 </code>
    //             </blockquote>
    //         </div>
    //     `)
}