import {AutorMenu} from "./AutorMenu";
import {LivroMenu} from "./LivroMenu";
import { ClienteMenu } from "./ClienteMenu";
import {perguntar} from "../utils/input";

export class MainMenu {
    private autorMenu: AutorMenu;
    private livroMenu: LivroMenu;
    private clienteMenu: ClienteMenu;

    constructor() {
        this.autorMenu = new AutorMenu();
        this.livroMenu = new LivroMenu();
        this.clienteMenu = new ClienteMenu();
    }

    async iniciar(): Promise<void> {
        while (true) {
            console.log('\n--- Menu Principal ---');
            console.log('1. Gerenciar Autores');
            console.log('2. Gerenciar Livros');
            console.log('3. Gerenciar Clientes');
            console.log('0. Sair');
            const opcao = await perguntar('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    await this.autorMenu.iniciar();
                    break;
                case '2':
                    await this.livroMenu.iniciar();
                    break;
                case '3':
                    await this.clienteMenu.iniciar(); 
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