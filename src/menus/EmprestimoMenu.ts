import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoController } from "../controllers/EmprestimoController";
import { perguntar } from "../utils/input";

export class EmprestimoMenu{
    private emprestimoController: EmprestimoController;

    constructor() {
    this.emprestimoController = new EmprestimoController();
}

    async iniciar():Promise<void>{
        while(true){
            console.log('\n--- Menu de Emprestimos ---');
            console.log('1. Realizar empréstimo');
            console.log('2. Registrar devolução');
            console.log('3. Listar empréstimo');
            console.log('4. Buscar empréstimo por ID');
            console.log('0. Sair');

            const opcao = await perguntar('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    await this.cadastrarEmprestimo();
                    break;
                case '2':
                    await this.registrarDevolucao();
                    break;
                case '3':
                    await this.listarEmprestimos();
                    break;
                case '4':
                    await this.buscarEmprestimoPorId();
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

    async cadastrarEmprestimo(): Promise<void>{
         console.log('\n--- Realizar Empréstimo ---');

    try {
        const clienteIdInput = await perguntar('Digite o ID do cliente: ');
        const clienteId = Number(clienteIdInput);

        if (isNaN(clienteId)) {
            console.log('ID do cliente inválido.');
            return;
        }

        const livroIdInput = await perguntar('Digite o ID do livro: ');
        const livroId = Number(livroIdInput);

        if (isNaN(livroId)) {
            console.log('ID do livro inválido.');
            return;
        }

        const emprestimo = new Emprestimo(
            new Date(),
            clienteId,
            livroId
        );

        const emprestimoCadastrado =
            await this.emprestimoController.cadastrarEmprestimo(emprestimo);

        console.log('\nEmpréstimo realizado com sucesso!');
        console.log(`ID do empréstimo: ${emprestimoCadastrado.id}`);
        console.log(`Cliente ID: ${emprestimoCadastrado.clienteId}`);
        console.log(`Livro ID: ${emprestimoCadastrado.livroId}`);
        console.log(
            `Data do empréstimo: ${emprestimoCadastrado.dataEmprestimo.toLocaleDateString('pt-BR')}`
        );

        } catch (error) {
        if (error instanceof Error) {
            console.error(`Erro ao realizar empréstimo: ${error.message}`);
        } else {
            console.error('Erro desconhecido ao realizar empréstimo.');
        }
        }
    }

    async listarEmprestimos(): Promise<void>{
        console.log('\n--- Lista de Empréstimos ---');

         try {
        const emprestimos = await this.emprestimoController.listarEmprestimos();

        if (emprestimos.length === 0) {
            console.log('Nenhum empréstimo cadastrado.');
            return;
        }

        emprestimos.forEach(emprestimo => {
            console.log('\n-------------------------');
            console.log(`ID: ${emprestimo.id}`);
            console.log(`Cliente ID: ${emprestimo.clienteId}`);
            console.log(`Livro ID: ${emprestimo.livroId}`);
            console.log(
                `Data do empréstimo: ${emprestimo.dataEmprestimo.toLocaleDateString('pt-BR')}`
            );
            console.log(
                `Data da devolução: ${
                    emprestimo.dataDevolucao
                        ? emprestimo.dataDevolucao.toLocaleDateString('pt-BR')
                        : 'Em aberto'
                }`
            );
            console.log('-------------------------');
        });

         } catch (error) {
        if (error instanceof Error) {
            console.error(`Erro ao listar empréstimos: ${error.message}`);
         } else {
            console.error('Erro desconhecido ao listar empréstimos.');
         }
         }  
    }

    async buscarEmprestimoPorId(): Promise<void> {
    console.log('\n--- Buscar Empréstimo por ID ---');

    try {
        const idInput = await perguntar('Digite o ID do empréstimo: ');
        const id = Number(idInput);

        if (isNaN(id)) {
            console.log('ID inválido. Por favor, digite um número válido.');
            return;
        }

        const emprestimo =
            await this.emprestimoController.buscarEmprestimoPorId(id);

        if (!emprestimo) {
            console.log(`Empréstimo com ID ${id} não encontrado.`);
            return;
        }

        console.log('\n-------------------------');
        console.log(`ID: ${emprestimo.id}`);
        console.log(`Cliente ID: ${emprestimo.clienteId}`);
        console.log(`Livro ID: ${emprestimo.livroId}`);
        console.log(
            `Data do empréstimo: ${emprestimo.dataEmprestimo.toLocaleDateString('pt-BR')}`
        );
        console.log(
            `Data da devolução: ${
                emprestimo.dataDevolucao
                    ? emprestimo.dataDevolucao.toLocaleDateString('pt-BR')
                    : 'Em aberto'
            }`
        );
        console.log('-------------------------');

        } catch (error) {
        if (error instanceof Error) {
            console.error(`Erro ao buscar empréstimo: ${error.message}`);
        } else {
            console.error('Erro desconhecido ao buscar empréstimo.');
        }
        }   

    }

    async registrarDevolucao(): Promise<void> {
    console.log('\n--- Registrar Devolução ---');

    try {
        const idInput = await perguntar('Digite o ID do empréstimo: ');
        const id = Number(idInput);

        if (isNaN(id)) {
            console.log('ID inválido. Por favor, digite um número válido.');
            return;
        }

        const emprestimoExistente =
            await this.emprestimoController.buscarEmprestimoPorId(id);

        if (!emprestimoExistente) {
            console.log(`Empréstimo com ID ${id} não encontrado.`);
            return;
        }

        if (emprestimoExistente.dataDevolucao) {
            console.log('Este empréstimo já foi devolvido.');
            return;
        }

        console.log('\n-------------------------');
        console.log(`Cliente ID: ${emprestimoExistente.clienteId}`);
        console.log(`Livro ID: ${emprestimoExistente.livroId}`);
        console.log(
            `Data do empréstimo: ${emprestimoExistente.dataEmprestimo.toLocaleDateString('pt-BR')}`
        );
        console.log('-------------------------');

        const confirmacao = await perguntar(
            'Confirmar devolução? (Digite "s" para confirmar): '
        );

        if (confirmacao.trim().toLowerCase() !== 's') {
            console.log('Operação cancelada.');
            return;
        }

        const emprestimoAtualizado = new Emprestimo(
            emprestimoExistente.dataEmprestimo,
            emprestimoExistente.clienteId,
            emprestimoExistente.livroId,
            new Date(),
            emprestimoExistente.id
        );

        await this.emprestimoController.atualizarEmprestimo(
            emprestimoAtualizado
        );

        console.log('Devolução registrada com sucesso!');

         } catch (error) {
        if (error instanceof Error) {
            console.error(`Erro ao registrar devolução: ${error.message}`);
        } else {
            console.error('Erro desconhecido ao registrar devolução.');
        }
        }  
    }
}



