import { Cliente } from "../models/Cliente";
import { ClienteService } from "../services/ClienteService";

export class ClienteController{
    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

     async cadastrarCliente(cliente: Cliente): Promise<Cliente> {
            return await this.clienteService.cadastrarCliente(cliente);
        }
    
        async listarClientes(): Promise<Cliente[]> {
            return await this.clienteService.listarClientes();
        }
    
        async buscarClientePorId(id: number): Promise<Cliente | null> {
            return await this.clienteService.buscarClientePorId(id);
        }
    
        async atualizarCliente(cliente: Cliente): Promise<Cliente> {
            return await this.clienteService.atualizarCliente(cliente);
        }
    
        async removerCliente(id: number): Promise<void> {
            await this.clienteService.removerCliente(id);
        }
}
