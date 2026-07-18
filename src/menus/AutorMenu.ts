import { Autor } from "../models/Autor";
import { AutorController } from "../controllers/AutorController";
import { perguntar } from "../utils/input";

export class AutorMenu {
    private autorController: AutorController;

    constructor() {
        this.autorController = new AutorController();
    }

    async iniciar():Promise<void> {

        while (true) {
            console.log('\n--- Menu de Autores ---');
            console.log('1. Cadastrar Autor');
            console.log('2. Listar Autores');
            console.log('3. Buscar Autor por ID');
            console.log('4. Atualizar Autor');
            console.log('5. Remover Autor');
            console.log('0. Voltar ao menu principal');
           const opcao = await perguntar('Escolha uma opção: ');
            switch (opcao) {
                case '1':
                    await this.cadastrarAutor();
                    break;
                case '2':
                    await this.listarAutores();
                    break;
                case '3':
                    await this.buscarAutorPorId();
                    break;
                case '4':
                    await this.atualizarAutor();
                    break;
                case '5':
                    await this.removerAutor();
                    break;
                case '0':
                    console.log('Voltando ao menu principal...');
                    return;
                default:
                    console.log('Opção inválida. Por favor, escolha uma opção válida.');
            }

           await perguntar('\nPressione Enter para continuar...');
        }
    }

    async cadastrarAutor(): Promise<void> {
        console.log('\n--- Cadastro de Autor ---');

        try {
            const nome = await perguntar('Digite o nome do autor: ');
            const nacionalidade = await perguntar('Digite a nacionalidade do autor: ');
            const autor = new Autor(nome, nacionalidade);
            const autorCadastrado = await this.autorController.cadastrarAutor(autor);
            console.log(`'Autor ${autorCadastrado.nome} cadastrado com sucesso! ID: ${autorCadastrado.id}'`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao cadastrar autor: ${error.message}`);
            } else {
                console.error('Erro desconhecido ao cadastrar autor');
            }
        }
    }

    async listarAutores(): Promise<void>{
        console.log('\n--- Lista de Autores ---');

        try {
            const autores = await this.autorController.listarAutores();
            if (autores.length === 0) {
            console.log('Nenhum autor cadastrado.');
            return;
            } else {
            autores.forEach((autor) => {
                console.log(`ID: ${autor.id}, Nome: ${autor.nome}, Nacionalidade: ${autor.nacionalidade}`);
            });
        }
        } catch (error) {
            if (error instanceof Error) {
            console.error(`Erro ao listar autores: ${error.message}`);
            } else {
            console.error('Erro desconhecido ao listar autores');
            }
        }
    }

    async buscarAutorPorId():Promise<void> {
        console.log('\n--- Buscar Autor por ID ---');

        try {
            const idTexto = await perguntar('Digite o ID do autor: ');
            const id = Number(idTexto);
            if (isNaN(id)) {
                console.log('ID inválido. Por favor, digite um número válido.');
                return;
            }

            const autor = await this.autorController.buscarAutorPorId(id);

            if (!autor) {
                console.log(`Autor com ID ${id} não encontrado.`);
                return;
            }
            console.log(`Autor encontrado: ID: ${autor.id}, Nome: ${autor.nome}, Nacionalidade: ${autor.nacionalidade}`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao buscar autor: ${error.message}`);
            } else {
                console.error('Erro desconhecido ao buscar autor');
            }
        }
    }

    async atualizarAutor():Promise<void> {
        console.log('\n--- Atualizar Autor ---');

        try {
            const idAtualizar = await perguntar('Digite o ID do autor a ser atualizado: ');
            const id = Number(idAtualizar);
            if (isNaN(id)) {
                console.log('ID inválido. Por favor, digite um número válido.');
                return;
            }

            const autor = await this.autorController.buscarAutorPorId(id);

            if (!autor) {
                console.log(`Autor com ID ${id} não encontrado.`);
                return;
            }

        console.log(`Nome atual: ${autor.nome}`);
        console.log(`Nacionalidade atual: ${autor.nacionalidade}`);

        const novoNome = await perguntar('Novo nome (Enter mantém): ');
        const novaNacionalidade = await perguntar('Nova nacionalidade (Enter mantém): ');

        const nomeAtualizado = novoNome.trim() !== ''
            ? novoNome
            : autor.nome;

        const nacionalidadeAtualizada = novaNacionalidade.trim() !== ''
            ? novaNacionalidade
            : autor.nacionalidade;

        const autorAtualizado = new Autor(
            nomeAtualizado,
            nacionalidadeAtualizada,
            id
        );

        await this.autorController.atualizarAutor(autorAtualizado);

        console.log('Autor atualizado com sucesso!');
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao atualizar autor: ${error.message}`);
            } else {
                console.error('Erro desconhecido ao atualizar autor');
            }
        }
    }

    async removerAutor():Promise<void> {
        console.log('\n--- Remover Autor ---');

        try {
            const idRemover = await perguntar('Digite o ID do autor a ser removido: ');
            const id = Number(idRemover);
            if (isNaN(id)) {
                console.log('ID inválido. Por favor, digite um número válido.');
                return;
            }
            const autor = await this.autorController.buscarAutorPorId(id);
            if (!autor) {
                console.log(`Autor com ID ${id} não encontrado.`);
                return;
            }
            console.log(
            `Autor encontrado: ${autor.nome} - ${autor.nacionalidade}`
        );

        const confirmacao = await perguntar(
            'Deseja realmente remover? (Digite "s" para confirmar): '
        );

        if (confirmacao.trim().toLowerCase() !== 's') {
            console.log('Operação cancelada.');
            return;
        }
            await this.autorController.removerAutor(id);
            console.log(`Autor com ID ${id} removido com sucesso!`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao remover autor: ${error.message}`);
            } else {
                console.error('Erro desconhecido ao remover autor');
            }
        }
    }
}