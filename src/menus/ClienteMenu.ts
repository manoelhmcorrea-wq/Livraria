import {Cliente} from "../models/Cliente"
import { ClienteController } from "../controllers/ClienteController"
import { perguntar } from "../utils/input"

export class ClienteMenu{
    private clienteController: ClienteController;

    constructor(){
        this.clienteController = new ClienteController();
    }

    async iniciar(): Promise<void> {
        while (true) {
            console.log('\n--- Menu de Clientes ---');
            console.log('1. Cadastrar Cliente');
            console.log('2. Listar Clientes');
            console.log('3. Buscar Cliente por ID');
            console.log('4. Atualizar Cliente');
            console.log('5. Remover Cliente');
            console.log('0. Sair');

            const opcao = await perguntar('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    await this.cadastrarCliente();
                    break;
                case '2':
                    await this.listarClientes();
                    break;
                case '3':
                    await this.buscarClientePorId();
                    break;
                case '4':
                    await this.atualizarCliente();
                    break;
                case '5':
                    await this.removerCliente();
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

        async cadastrarCliente(): Promise<void> {
                console.log('\n--- Cadastro de Cliente ---');
        
                try {
                    const nome = await perguntar('Digite o nome do cliente: ');
                    const email = await perguntar('Digite o email do cliente: ');
                    const cpf = await perguntar('Digite o cpf do cliente(Apenas os números)');
                    const telefone = await perguntar('Digite o telefone do cliente');
                    const ativoInput = await perguntar('O cliente está ativo? (s/n): ');
                    const ativo = ativoInput.toLowerCase() === 's';
                    
                    const cliente = new Cliente (nome, email, cpf, telefone, ativo);
                    const clienteCadastrado = await this.clienteController.cadastrarCliente(cliente);
                    console.log(`Cliente '${clienteCadastrado.nome}' cadastrado com sucesso! ID: ${clienteCadastrado.id}`);
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(`Erro ao cadastrar cliente: ${error.message}`);
                    } else {
                        console.error('Erro desconhecido ao cadastrar cliente');
                    }
                }
            }
        
            async listarClientes(): Promise<void> {
                console.log('\n--- Lista de Clientes ---');
        
                try {
                    const clientes = await this.clienteController.listarClientes();
                    if (clientes.length === 0) {
                        console.log('Nenhum cliente cadastrado.');
                    } else {
                        clientes.forEach(cliente => {
                            console.log('\n-------------------------');
                            console.log(`ID: ${cliente.id}`);
                            console.log(`Nome: ${cliente.nome}`);
                            console.log(`E-mail: ${cliente.email}`);
                            console.log(`CPF: ${cliente.cpf}`);
                            console.log(`Telefone: ${cliente.telefone}`);
                            console.log(`Ativo: ${cliente.ativo ? 'Sim' : 'Não'}`);
                            console.log(
                                `Criado em: ${cliente.criadoEm?.toLocaleString('pt-BR')}`);
                             });
                         }
                    }catch (error) {
                    if (error instanceof Error) {
                        console.error(`Erro ao listar clientes: ${error.message}`);
                    } else {
                        console.error('Erro desconhecido ao listar clientes');
                    }
                }
            }
             
             
        
            async buscarClientePorId(): Promise<void> {
                console.log('\n--- Buscar Cliente por ID ---');
        
                try {
                    const idInput = await perguntar('Digite o ID do cliente: ');
                    const id = Number(idInput);
                    if (isNaN(id)) {
                        console.log('ID inválido. Por favor, digite um número válido.');
                        return;
                    }
        
                    const cliente = await this.clienteController.buscarClientePorId(id);
        
                    if (!cliente) {
                        console.log(`Cliente com ID ${id} não encontrado.`);
                        return;
                    }
                    console.log('\n-------------------------');
                    console.log(`ID: ${cliente.id}`);
                    console.log(`Nome: ${cliente.nome}`);
                    console.log(`E-mail: ${cliente.email}`);
                    console.log(`CPF: ${cliente.cpf}`);
                    console.log(`Telefone: ${cliente.telefone}`);
                    console.log(`Ativo: ${cliente.ativo ? 'Sim' : 'Não'}`);
                    console.log(
                        `Criado em: ${cliente.criadoEm?.toLocaleString('pt-BR')}`
                    );
                    console.log('-------------------------');

                } catch (error) {
                    if (error instanceof Error) {
                        console.error(`Erro ao buscar cliente por ID: ${error.message}`);
                    } else {
                        console.error('Erro desconhecido ao buscar cliente por ID');
                    }
                }
            }
        
            async atualizarCliente(): Promise<void> {
                console.log('\n--- Atualizar Cliente ---');
        
                try {
                    const idInput = await perguntar('Digite o ID do cliente que deseja atualizar: ');
                    const id = Number(idInput);
                    if (isNaN(id)) {
                        console.log('ID inválido. Por favor, digite um número válido.');
                        return;
                    }
        
                    const clienteExistente = await this.clienteController.buscarClientePorId(id);
                    if (!clienteExistente) {
                        console.log(`Cliente com ID ${id} não encontrado.`);
                        return;
                    }

                    console.log(`Nome atual: ${clienteExistente.nome}`);
                    console.log(`E-mail atual: ${clienteExistente.email}`);
                    console.log(`CPF atual: ${clienteExistente.cpf}`);
                    console.log(`Telefone atual: ${clienteExistente.telefone}`);
                    console.log(`Ativo: ${clienteExistente.ativo ? 'Sim' : 'Não'}`);
                    console.log(
                        `Criado em: ${clienteExistente.criadoEm?.toLocaleString('pt-BR')}`
);
        
                    const novoNome = await perguntar('Novo nome (Enter mantém): ');
                    const novoEmail = await perguntar('Novo e-mail (Enter mantém): ');
                    const novoCpf = await perguntar('Novo CPF (Enter mantém): ');
                    const novoTelefone = await perguntar('Novo telefone (Enter mantém): ');
                    const novoAtivoInput = await perguntar('Cliente está ativo? (s/n, Enter mantém): ');
                    const novoAtivo = novoAtivoInput.toLowerCase() === 's'
                        ? true 
                        : novoAtivoInput.toLowerCase() === 'n'
                        ? false 
                        : clienteExistente.ativo;
                   const clienteAtualizado = new Cliente(
                    novoNome || clienteExistente.nome,
                    novoEmail || clienteExistente.email,
                    novoCpf || clienteExistente.cpf,
                    novoTelefone || clienteExistente.telefone,
                    novoAtivo,
                    clienteExistente.id,
                    clienteExistente.criadoEm
                );
                await this.clienteController.atualizarCliente(clienteAtualizado);

                console.log(`Cliente com ID ${id} atualizado com sucesso!`);
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(`Erro ao atualizar cliente: ${error.message}`);
                    } else {
                        console.error('Erro desconhecido ao atualizar cliente');
                    }
                }
            }
        
            async removerCliente(): Promise<void> {
                console.log('\n--- Remover Cliente ---');
        
                try {
                    const idRemover = await perguntar('Digite o ID do cliente a ser removido: ');
                    const id = Number(idRemover);
                    if (isNaN(id)) {
                        console.log('ID inválido. Por favor, digite um número válido.');
                        return;
                    }
                    const cliente = await this.clienteController.buscarClientePorId(id);
                    if (!cliente) {
                        console.log(`Cliente com ID ${id} não encontrado.`);
                        return;
                    }
                    console.log('\nCliente encontrado:');
                    console.log(`ID: ${cliente.id}`);
                    console.log(`Nome: ${cliente.nome}`);
                    console.log(`CPF: ${cliente.cpf}`);
        
                    const confirmacao = await perguntar(
                        'Deseja realmente remover? (Digite "s" para confirmar): '
                    );
        
                    if (confirmacao.trim().toLowerCase() !== 's') {
                        console.log('Operação cancelada.');
                        return;
                    }
                    await this.clienteController.removerCliente(id);
                    console.log(`Cliente com ID ${id} removido com sucesso!`);
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(`Erro ao remover cliente: ${error.message}`);
                    } else {
                        console.error('Erro desconhecido ao remover cliente');
                    }
                }
            }
    }    