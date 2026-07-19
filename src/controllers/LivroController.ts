import {Livro} from "../models/Livro";
import {LivroService} from "../services/LivroService";

export class LivroController {
    private livroService: LivroService;

    constructor() {
        this.livroService = new LivroService();
    }

    async cadastrarLivro(livro: Livro): Promise<Livro> {
        return await this.livroService.cadastrarLivro(livro);
    }

    async listarLivros(): Promise<Livro[]> {
        return await this.livroService.listarLivros();
    }

    async buscarLivroPorId(id: number): Promise<Livro | null> {
        return await this.livroService.buscarLivroPorId(id);
    }

    async atualizarLivro(livro: Livro): Promise<Livro> {
        return await this.livroService.atualizarLivro(livro);
    }

    async removerLivro(id: number): Promise<void> {
        await this.livroService.removerLivro(id);
    }
}

