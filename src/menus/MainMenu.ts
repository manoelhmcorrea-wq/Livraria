import {AutorMenu} from "./AutorMenu";
import {perguntar} from "../utils/input";

export class MainMenu {
    private autorMenu: AutorMenu;

    constructor() {
        this.autorMenu = new AutorMenu();
    }

    async iniciar(): Promise<void> {
        while (true) {
            console.log('\n--- Menu Principal ---');
            console.log('1. Gerenciar Autores');
            console.log('0. Sair');
            const opcao = await perguntar('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    await this.autorMenu.iniciar();
                    break;
                case '0':
                    console.log('Saindo...');
                    return;
                default:
                    console.log('Opção inválida. Por favor, escolha uma opção válida.');
            }
        }
    }
}