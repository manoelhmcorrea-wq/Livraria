import { pool } from "./database/connection";
import { MainMenu } from "./menus/MainMenu";

async function main() {
    try {
        await pool.query("SELECT 1");
        console.log("Banco de dados conectado com sucesso.");

        const mainMenu = new MainMenu();
        await mainMenu.iniciar();

    } finally {
        await pool.end();
    }
}

main().catch((error) => {
    console.error("Erro ao iniciar o programa:", error);
    process.exit(1);
});
