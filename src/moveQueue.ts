import { execTransaction } from "./execTransaction";

let processing = false;
const moveQueue: { context: AccountContextType; direction: string }[] = [];

const processQueue = async (context: AccountContextType, direction: string) => {
    if (processing) return;

    processing = true
    while (moveQueue.length > 0) {
        const args = moveQueue.shift();
        if (args) {
            await execTransaction(args.context, 'move', [args.direction]);
        }
    }
    processing = false;
};

export const addToQueue = (context: AccountContextType, direction: string) => {
    moveQueue.push({ context, direction });

    if (!processing) {
        processQueue(context, direction);
    }
};