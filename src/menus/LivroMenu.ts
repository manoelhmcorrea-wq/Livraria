import {Livro} from "../models/Livro";
import { LivroController } from "../controllers/LivroController";
import { perguntar } from "../utils/input";

export class LivroMenu {
    private livroController: LivroController;

    constructor() {
        this.livroController = new LivroController();
    }

    async iniciar(): Promise<void> {
        while (true) {
            console.log('\n--- Menu de Livros ---');
            console.log('1. Cadastrar Livro');
            console.log('2. Listar Livros');
            console.log('3. Buscar Livro por ID');
            console.log('4. Atualizar Livro');
            console.log('5. Remover Livro');
            console.log('0. Sair');

            const opcao = await perguntar('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    await this.cadastrarLivro();
                    break;
                case '2':
                    await this.listarLivros();
                    break;
                case '3':
                    await this.buscarLivroPorId();
                    break;
                case '4':
                    await this.atualizarLivro();
                    break;
                case '5':
                    await this.removerLivro();
                    break;
                case '0':
                    console.log('Voltando ao menu principal...');
                    return;
                default:
                    console.log('Opção inválida.Por favor, escolha uma opção válida.');
            }

            await perguntar('\nPressione Enter para continuar...');
        }
    }

    async cadastrarLivro(): Promise<void> {
        console.log('\n--- Cadastro de Livro ---');

        try {
            const titulo = await perguntar('Digite o título do livro: ');
            const categoria = await perguntar('Digite a categoria do livro: ');
            const disponivelInput = await perguntar('O livro está disponível? (s/n): ');
            const disponivel = disponivelInput.toLowerCase() === 's';
            const anoPublicacaoInput = await perguntar('Digite o ano de publicação do livro: ');
            const anoPublicacao = parseInt(anoPublicacaoInput);
            const autorIdInput = await perguntar('Digite o ID do autor do livro: ');
            const autorId = parseInt(autorIdInput);
             if (isNaN(anoPublicacao) || isNaN(autorId)) {
                console.error('Ano de publicação e ID do autor devem ser números válidos.');
                return;
            }
            const livro = new Livro(titulo, categoria, disponivel, anoPublicacao, autorId);
            const livroCadastrado = await this.livroController.cadastrarLivro(livro);
            console.log(`Livro '${livroCadastrado.titulo}' cadastrado com sucesso! ID: ${livroCadastrado.id}`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao cadastrar livro: ${error.message}`);
            } else {
                console.error('Erro desconhecido ao cadastrar livro');
            }
        }
    }

    async listarLivros(): Promise<void> {
        console.log('\n--- Lista de Livros ---');

        try {
            const livros = await this.livroController.listarLivros();
            if (livros.length === 0) {
                console.log('Nenhum livro cadastrado.');
            } else {
                livros.forEach(livro => {
                    console.log('\n-------------------------');
                    console.log(`ID: ${livro.id}`);
                    console.log(`Título: ${livro.titulo}`);
                    console.log(`Categoria: ${livro.categoria}`);
                    console.log(`Disponível: ${livro.disponivel ? 'Sim' : 'Não'}`);
                    console.log(`Ano de Publicação: ${livro.anoPublicacao}`);
                    console.log(`ID do Autor: ${livro.autorId}`);
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao listar livros: ${error.message}`);
            } else {
                console.error('Erro desconhecido ao listar livros');
            }
        }
    }

    async buscarLivroPorId(): Promise<void> {
        console.log('\n--- Buscar Livro por ID ---');

        try {
            const idInput = await perguntar('Digite o ID do livro: ');
            const id = Number(idInput);
            if (isNaN(id)) {
                console.log('ID inválido. Por favor, digite um número válido.');
                return;
            }

            const livro = await this.livroController.buscarLivroPorId(id);

            if (!livro) {
                console.log(`Livro com ID ${id} não encontrado.`);
                return;
            }
            console.log('\n-------------------------');
            console.log(`ID: ${livro.id}`);
            console.log(`Título: ${livro.titulo}`);
            console.log(`Categoria: ${livro.categoria}`);
            console.log(`Disponível: ${livro.disponivel ? 'Sim' : 'Não'}`);
            console.log(`Ano de Publicação: ${livro.anoPublicacao}`);
            console.log(`ID do Autor: ${livro.autorId}`);
            console.log('\n-------------------------');
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao buscar livro por ID: ${error.message}`);
            } else {
                console.error('Erro desconhecido ao buscar livro por ID');
            }
        }
    }

    async atualizarLivro(): Promise<void> {
        console.log('\n--- Atualizar Livro ---');

        try {
            const idInput = await perguntar('Digite o ID do livro que deseja atualizar: ');
            const id = Number(idInput);
            if (isNaN(id)) {
                console.log('ID inválido. Por favor, digite um número válido.');
                return;
            }

            const livroExistente = await this.livroController.buscarLivroPorId(id);
            if (!livroExistente) {
                console.log(`Livro com ID ${id} não encontrado.`);
                return;
            }

            console.log(`Título atual: ${livroExistente.titulo}`);
            console.log(`Categoria atual: ${livroExistente.categoria}`);
            console.log(`Disponível atual: ${livroExistente.disponivel ? 'Sim' : 'Não'}`);
            console.log(`Ano de Publicação atual: ${livroExistente.anoPublicacao}`);
            console.log(`ID do Autor atual: ${livroExistente.autorId}`);

            const novoTitulo = await perguntar('Novo título (Enter mantém): ');
            const novaCategoria = await perguntar('Nova categoria (Enter mantém): ');
            const novoDisponivelInput = await perguntar('Novo status de disponibilidade (s/n, Enter mantém): ');
            const novoDisponivel = novoDisponivelInput.toLowerCase() === 's' ? true : (novoDisponivelInput.toLowerCase() === 'n' ? false : livroExistente.disponivel);
            const novoAnoPublicacaoInput = await perguntar('Novo ano de publicação (Enter mantém): ');
            const novoAnoPublicacao = novoAnoPublicacaoInput ? parseInt(novoAnoPublicacaoInput) : livroExistente.anoPublicacao;
                if (isNaN(novoAnoPublicacao)) {
                console.log('Ano de publicação inválido. Por favor, digite um número válido.');
                return;
            }
            const novoAutorIdInput = await perguntar('Novo ID do autor (Enter mantém): ');
            const novoAutorId = novoAutorIdInput ? parseInt(novoAutorIdInput) : livroExistente.autorId;
                if (isNaN(novoAutorId)) {
                console.log('ID do autor inválido. Por favor, digite um número válido.');
                return;
            }

            const livroAtualizado = new Livro(
                novoTitulo || livroExistente.titulo,
                novaCategoria || livroExistente.categoria,
                novoDisponivel,
                novoAnoPublicacao,
                novoAutorId,
                livroExistente.id
                
            );

            await this.livroController.atualizarLivro(livroAtualizado);

            console.log(`Livro com ID ${id} atualizado com sucesso!`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao atualizar livro: ${error.message}`);
            } else {
                console.error('Erro desconhecido ao atualizar livro');
            }
        }
    }

    async removerLivro(): Promise<void> {
        console.log('\n--- Remover Livro ---');

        try {
            const idRemover = await perguntar('Digite o ID do livro a ser removido: ');
            const id = Number(idRemover);
            if (isNaN(id)) {
                console.log('ID inválido. Por favor, digite um número válido.');
                return;
            }
            const livro = await this.livroController.buscarLivroPorId(id);
            if (!livro) {
                console.log(`Livro com ID ${id} não encontrado.`);
                return;
            }
            console.log(
                `Livro encontrado: ${livro.titulo} - ${livro.categoria}`
            );

            const confirmacao = await perguntar(
                'Deseja realmente remover? (Digite "s" para confirmar): '
            );

            if (confirmacao.trim().toLowerCase() !== 's') {
                console.log('Operação cancelada.');
                return;
            }
            await this.livroController.removerLivro(id);
            console.log(`Livro com ID ${id} removido com sucesso!`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao remover livro: ${error.message}`);
            } else {
                console.error('Erro desconhecido ao remover livro');
            }
        }
    }
}