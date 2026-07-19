import {Livro} from "../models/Livro";
import {LivroRepository} from "../repositories/LivroRepository";
import { AutorRepository } from "../repositories/AutorRepository";

export class LivroService {
    private livroRepository: LivroRepository;
    private autorRepository: AutorRepository;

    constructor() {
        this.livroRepository = new LivroRepository();
        this.autorRepository = new AutorRepository();
    }

    async cadastrarLivro(livro: Livro): Promise<Livro> {
        if (!livro.titulo.trim() || !livro.categoria.trim() || livro.disponivel === undefined || livro.anoPublicacao === undefined || livro.autorId === undefined) {
            throw new Error('Todos os campos são obrigatórios.');
        }
        const livroExistente = await this.livroRepository.buscarPorTitulo(livro.titulo);
        
        if (livroExistente) {
            throw new Error('Livro já cadastrado.');
        }

        const autorExistente = await this.autorRepository.buscarPorId(livro.autorId);
        if (!autorExistente) {
            throw new Error('Autor não encontrado.');
        }

        return await this.livroRepository.criar(livro);
    }

    async listarLivros(): Promise<Livro[]> {
        return await this.livroRepository.listar();
    }

    async buscarLivroPorId(id: number): Promise<Livro | null> {
        return await this.livroRepository.buscarPorId(id);
    }

    async atualizarLivro(livro: Livro): Promise<Livro> {
        if (livro.id === undefined) {
            throw new Error('ID do livro é obrigatório para atualização.');
        }
        const livroExistente = await this.livroRepository.buscarPorId(livro.id);
        if (!livroExistente) {
            throw new Error('Livro não encontrado.');
        }
        const autorExistente = await this.autorRepository.buscarPorId(livro.autorId);
        if (!autorExistente) {
            throw new Error('Autor não encontrado.');
        }   
        return await this.livroRepository.atualizar(livro);
    }

    async removerLivro(id: number): Promise<void> {
        const livroExistente = await this.livroRepository.buscarPorId(id);
        if (!livroExistente) {
            throw new Error('Livro não encontrado.');
        }
        await this.livroRepository.remover(id);
    }
}