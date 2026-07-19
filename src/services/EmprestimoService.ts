import { Emprestimo } from "../models/Emprestimo"
import { LivroRepository } from "../repositories/LivroRepository"
import { ClienteRepository } from "../repositories/ClienteRepository"
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";

export class EmprestimoService {

    private emprestimoRepository: EmprestimoRepository;
    private clienteRepository: ClienteRepository;
    private livroRepository: LivroRepository;

    constructor() {
        this.emprestimoRepository = new EmprestimoRepository();
        this.clienteRepository = new ClienteRepository();
        this.livroRepository = new LivroRepository();
    }


    async cadastrarEmprestimo(emprestimo:Emprestimo): Promise<Emprestimo>{
        const cliente= await this.clienteRepository.buscarPorId(
            emprestimo.clienteId
        );

        if (!cliente){
            throw new Error("Cliente não encontrado.")
        }

        const livro = await this.livroRepository.buscarPorId(
            emprestimo.livroId
        );

        if (!livro){
            throw new Error("Livro não encontrado.")
        }

        if (!livro.disponivel){
            throw new Error("Livro indisponível para empréstimo.");
        }

        const novoEmprestimo = await this.emprestimoRepository.criar(emprestimo);

        await this.livroRepository.atualizarDisponibilidade(
            livro.id!,
            false
        );

        return novoEmprestimo;
    }

    async listarEmprestimos():Promise<Emprestimo[]> {
        return await this.emprestimoRepository.listar();
    }

    async buscarEmprestimoPorId(id:number):Promise<Emprestimo | null> {
        return await this.emprestimoRepository.buscarPorId(id);
    }

    async atualizarEmprestimo(emprestimo:Emprestimo):Promise<Emprestimo>{
        if (emprestimo.id === undefined) {
            throw new Error("ID do empréstimo é obrigatório")
        }

            const emprestimoExistente = await this.emprestimoRepository.buscarPorId(emprestimo.id);
            if (!emprestimoExistente){
                throw new Error("Empréstimo não encontrado.")
            }
          
            if(emprestimoExistente.dataDevolucao) {
                throw new Error ("Este empréstimo já foi devolvido.")
            }

            const emprestimoAtualizado = await this.emprestimoRepository.atualizar(emprestimo);

            await this.livroRepository.atualizarDisponibilidade(
                emprestimoExistente.livroId,
                true
            );

            return emprestimoAtualizado
        }
 }
    
