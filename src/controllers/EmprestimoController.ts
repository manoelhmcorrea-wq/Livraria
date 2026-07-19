import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoService } from "../services/EmprestimoService";

export class EmprestimoController{
    private emprestimoService: EmprestimoService;

    constructor() {
        this.emprestimoService = new EmprestimoService();
    }

    async cadastrarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
                return await this.emprestimoService.cadastrarEmprestimo(emprestimo);
            }
        
            async listarEmprestimos(): Promise<Emprestimo[]> {
                return await this.emprestimoService.listarEmprestimos();
            }
        
            async buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
                return await this.emprestimoService.buscarEmprestimoPorId(id);
            }
        
            async atualizarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
                return await this.emprestimoService.atualizarEmprestimo(emprestimo);
            }

}