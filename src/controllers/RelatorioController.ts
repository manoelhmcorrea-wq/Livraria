import { RelatorioService } from "../services/RelatorioService";
import { LivroPorAutor } from "../models/Relatorio";
import { Livro } from "../models/Livro";
import { QuantidadeEmprestimoLivro } from "../models/Relatorio";
import { ClienteEmprestimoAtivo } from "../models/Relatorio";

export class RelatorioController {

    private relatorioService: RelatorioService;

    constructor() {
        this.relatorioService = new RelatorioService();
    }

    async listarLivrosPorAutor(): Promise<LivroPorAutor[]> {
        return await this.relatorioService.listarLivrosPorAutor();
    }

    async listarLivrosDisponiveis(): Promise<Livro[]> {
        return await this.relatorioService.listarLivrosDisponiveis();
    }

    async listarLivrosEmprestados(): Promise<Livro[]> {
        return await this.relatorioService.listarLivrosEmprestados();
    }

    async listarQuantidadeEmprestimosPorLivro(): Promise<QuantidadeEmprestimoLivro[]> {
        return await this.relatorioService.listarQuantidadeEmprestimosPorLivro();
    }

    async listarClientesComEmprestimosAtivos(): Promise<ClienteEmprestimoAtivo[]> {
    return await this.relatorioService.listarClientesComEmprestimosAtivos();
}
}