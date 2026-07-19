import {Cliente} from "../models/Cliente";
import {ClienteRepository} from "../repositories/ClienteRepository";

export class ClienteService {
    private clienteRepository: ClienteRepository;

    constructor() {
         this.clienteRepository = new ClienteRepository();
}
    async cadastrarCliente(cliente: Cliente): Promise<Cliente> {
        if (!cliente.nome.trim() || !cliente.email.trim() || !cliente.cpf.trim() || !cliente.telefone.trim()) {
            throw new Error('Todos os campos são obrigatórios.');
        }

        if (!/^\d{11}$/.test(cliente.cpf)){
            throw new Error('CPF deve conter exatamente 11 números')
        }

        if (!/^\d+$/.test(cliente.telefone)) {
            throw new Error('Telefone deve conter apenas números.');
        }

        if (!cliente.email.includes("@") || !cliente.email.includes(".") ) {
            throw new Error("E-mail inválido.")
        }
        const clienteExistente = await this.clienteRepository.buscarPorCpf(cliente.cpf);
        if (clienteExistente) {
            throw new Error('Cliente já cadastrado.');
        }
        
        const emailExistente = await this.clienteRepository.buscarPorEmail(cliente.email);
        if (emailExistente) {
            throw new Error('Email já cadastrado.');
        }

        return await this.clienteRepository.criar(cliente);
    }

    async listarClientes(): Promise<Cliente[]> {
        return await this.clienteRepository.listar();
    }

    async buscarClientePorId(id: number): Promise<Cliente | null> {
        return await this.clienteRepository.buscarPorId(id);
    }

    async atualizarCliente(cliente: Cliente): Promise<Cliente> {

            if (cliente.id === undefined) {
                throw new Error('ID do cliente é obrigatório para atualização.');
            }

            const clienteExistente = await this.clienteRepository.buscarPorId(cliente.id);
            if (!clienteExistente) {
                throw new Error('Cliente não encontrado.');
            }

            if (!cliente.nome.trim() || !cliente.email.trim() || !cliente.cpf.trim() || !cliente.telefone.trim()) {
            throw new Error('Todos os campos são obrigatórios.');
             }
            
            if (!cliente.email.includes("@") || !cliente.email.includes(".") ) {
            throw new Error("E-mail inválido.")
            }

            if (!/^\d{11}$/.test(cliente.cpf)){
            throw new Error('CPF deve conter exatamente 11 números')
            }

            if (!/^\d+$/.test(cliente.telefone)) {
            throw new Error('Telefone deve conter apenas números.');
            }
    
            const cpfExistente = await this.clienteRepository.buscarPorCpf(cliente.cpf);
            if (cpfExistente && cpfExistente.id !== cliente.id) {
                throw new Error("CPF já cadastrado.");
            }

            const emailExistente = await this.clienteRepository.buscarPorEmail(cliente.email);
            if (emailExistente && emailExistente.id !== cliente.id) {
                throw new Error("E-mail já cadastrado.");
            }

            return await this.clienteRepository.atualizar(cliente);
    }
    
    async removerCliente(id: number): Promise<void> {
            const clienteExistente = await this.clienteRepository.buscarPorId(id);
            if (!clienteExistente) {
                throw new Error('Cliente não encontrado.');
            }
            await this.clienteRepository.remover(id);
    }
}
