import {createInterface} from "node:readline/promises";
import {stdin as input, stdout as output} from "node:process";

const rl = createInterface({input, output});

export async function perguntar(pergunta: string): Promise<string> {
    return await rl.question(pergunta);
}

export function fecharPerguntas(): void {
    rl.close();
}