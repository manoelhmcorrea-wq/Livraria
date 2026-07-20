import { RelatorioController } from "../controllers/RelatorioController";
import { perguntar } from "../utils/input";

export class RelatorioMenu {

    private relatorioController: RelatorioController;

    constructor() {
        this.relatorioController = new RelatorioController();
    }


         async iniciar(): Promise<void> {

            while (true) {

            console.log('\n--- Menu de Relatórios ---');
            console.log('1. Livros cadastrados por autor');
            console.log('2. Livros disponíveis');
            console.log('3. Livros emprestados');
            console.log('4. Quantidade de empréstimo por livro')
            console.log('5. Clientes com empréstimos ativos')
            console.log('0. Voltar ao menu principal');

            const opcao = await perguntar('Escolha uma opção: ');


            switch (opcao) {

                case '1':
                    await this.listarLivrosPorAutor();
                    break;
                case '2':
                    await this.listarLivrosDisponiveis()
                    break;
                case '3':
                    await this.listarLivrosEmprestados();
                    break;
                case '4':
                    await this.listarQuantidadeEmprestimosPorLivro();
                    break;
                case '5':
                    await this.listarClientesComEmprestimosAtivos();
                    break
                case '0':
                    return;

                default:
                    console.log('Opção inválida.');
            }
            }
        }

        async listarLivrosPorAutor(): Promise<void> {

        console.log('\n--- Livros cadastrados por autor ---');

        try {

            const livros =
                await this.relatorioController.listarLivrosPorAutor();


            if (livros.length === 0) {
                console.log('Nenhum livro encontrado.');
                return;
            }


            livros.forEach(livro => {

                console.log('\n-------------------------');
                console.log(`Autor: ${livro.autor}`);
                console.log(`Livro: ${livro.titulo}`);

            });

            console.log('-------------------------');


        } catch (error) {

            if (error instanceof Error) {
                console.error(
                    `Erro ao gerar relatório: ${error.message}`
                );
            } else {
                console.error(
                    'Erro desconhecido ao gerar relatório.'
                );
            }
        }
    }

    async listarLivrosDisponiveis(): Promise<void> {

    console.log('\n--- Livros Disponíveis ---');

    try {

        const livros =
            await this.relatorioController.listarLivrosDisponiveis();


        if (livros.length === 0) {
            console.log('Nenhum livro disponível.');
            return;
        }


        livros.forEach(livro => {

            console.log('\n-------------------------');
            console.log(`ID: ${livro.id}`);
            console.log(`Título: ${livro.titulo}`);
            console.log(`Categoria: ${livro.categoria}`);
            console.log(`Ano: ${livro.anoPublicacao}`);
            console.log(`Autor ID: ${livro.autorId}`);

        });

        console.log('-------------------------');


        } catch(error) {

        if (error instanceof Error) {
            console.error(
                `Erro ao listar livros disponíveis: ${error.message}`
            );
        } else {
            console.error(
                'Erro desconhecido.'
            );
        }
        }
    }

    async listarLivrosEmprestados(): Promise<void> {

        console.log('\n--- Livros Emprestados ---');

        try {

        const livros =
            await this.relatorioController.listarLivrosEmprestados();


        if (livros.length === 0) {
            console.log('Nenhum livro emprestado.');
            return;
        }


        livros.forEach(livro => {

            console.log('\n-------------------------');
            console.log(`ID: ${livro.id}`);
            console.log(`Título: ${livro.titulo}`);
            console.log(`Categoria: ${livro.categoria}`);
            console.log(`Ano de publicação: ${livro.anoPublicacao}`);
            console.log(`Autor ID: ${livro.autorId}`);

        });

        console.log('-------------------------');


        } catch(error) {

        if (error instanceof Error) {
            console.error(
                `Erro ao listar livros emprestados: ${error.message}`
            );
        } else {
            console.error(
                'Erro desconhecido.'
            );
        }
        }   
    }

    async listarQuantidadeEmprestimosPorLivro(): Promise<void> {

        console.log('\n--- Quantidade de empréstimos por livro ---');

        try {

        const livros =
            await this.relatorioController.listarQuantidadeEmprestimosPorLivro();

        livros.forEach(livro => {
            console.log('\n-------------------------');
            console.log(`Livro: ${livro.titulo}`);
            console.log(`Quantidade de empréstimos: ${livro.quantidade}`);
        });

        console.log('-------------------------');

        } catch(error) {
        if(error instanceof Error){
            console.error(error.message);
        }
        }
    }

    async listarClientesComEmprestimosAtivos(): Promise<void> {

    console.log('\n--- Clientes com Empréstimos Ativos ---');

    try {

        const emprestimos =
            await this.relatorioController.listarClientesComEmprestimosAtivos();

        if (emprestimos.length === 0) {
            console.log('Nenhum empréstimo ativo encontrado.');
            return;
        }

        emprestimos.forEach(emprestimo => {

            console.log('\n-------------------------');
            console.log(`Cliente: ${emprestimo.cliente}`);
            console.log(`Livro: ${emprestimo.livro}`);
            console.log(
                `Data do empréstimo: ${new Date(emprestimo.dataEmprestimo).toLocaleDateString('pt-BR')}`
            );

        });

        console.log('-------------------------');

    } catch (error) {

        if (error instanceof Error) {
            console.error(
                `Erro ao gerar relatório: ${error.message}`
            );
        } else {
            console.error(
                'Erro desconhecido ao gerar relatório.'
            );
        }
    }
}
}
