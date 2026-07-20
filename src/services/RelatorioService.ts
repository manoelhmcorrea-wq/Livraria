import { RelatorioRepository } from "../repositories/RelatorioRepository";
import { LivroPorAutor } from "../models/Relatorio";
import { Livro } from "../models/Livro";
import { QuantidadeEmprestimoLivro } from "../models/Relatorio";
import { ClienteEmprestimoAtivo } from "../models/Relatorio";

export class RelatorioService {

    private relatorioRepository: RelatorioRepository;

    constructor() {
        this.relatorioRepository = new RelatorioRepository();
    }

    async listarLivrosPorAutor(): Promise<LivroPorAutor[]> {
        return await this.relatorioRepository.listarLivrosPorAutor();
    }

    async listarLivrosDisponiveis(): Promise<Livro[]> {
        return await this.relatorioRepository.listarLivrosDisponiveis();
    }

    async listarLivrosEmprestados(): Promise<Livro[]> {
        return await this.relatorioRepository.listarLivrosEmprestados();
    }
    
    async listarQuantidadeEmprestimosPorLivro(): Promise<QuantidadeEmprestimoLivro[]> {
    return await this.relatorioRepository.listarQuantidadeEmprestimosPorLivro();
    }

    async listarClientesComEmprestimosAtivos(): Promise<ClienteEmprestimoAtivo[]> {
    return await this.relatorioRepository.listarClientesComEmprestimosAtivos();
}
}