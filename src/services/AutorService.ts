import {AutorRepository} from '../repositories/AutorRepository';
import { Autor } from '../models/Autor';

export class AutorService {
    private autorRepository: AutorRepository;

    constructor() {
        this.autorRepository = new AutorRepository();
    }

    async cadastrarAutor(autor: Autor) {
        if (!autor.nome.trim() || !autor.nacionalidade.trim()) {
            throw new Error('Nome e nacionalidade são obrigatórios.');
        }

        const autorExistente = await this.autorRepository.buscarPorNome(autor.nome);

        if (autorExistente) {
            throw new Error('Autor já cadastrado.');
        } 
        return await this.autorRepository.criar(autor);
        
    }

    async listarAutores(): Promise<Autor[]> {
        return await this.autorRepository.listar();
    }

    async buscarAutorPorId(id: number): Promise<Autor | null> {
        return await this.autorRepository.buscarPorId(id);
    }

    async atualizarAutor(autor: Autor): Promise<Autor> {
        if (autor.id === undefined) {
            throw new Error('ID do autor é obrigatório para atualização.');
        }
        const autorExistente = await this.autorRepository.buscarPorId(autor.id);
        if (!autorExistente) {
            throw new Error('Autor não encontrado.');
        }
        return await this.autorRepository.atualizar(autor);
    }

    async removerAutor(id: number): Promise<void> {
        const autorExistente = await this.autorRepository.buscarPorId(id);
        if (!autorExistente) {
            throw new Error('Autor não encontrado.');
        }
        await this.autorRepository.remover(id);
    }

}
