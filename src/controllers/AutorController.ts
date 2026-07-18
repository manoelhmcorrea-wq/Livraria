import {Autor} from '../models/Autor';
import {AutorService} from '../services/AutorService';

export class AutorController {
    private autorService: AutorService;

    constructor() {
        this.autorService = new AutorService();
    }
    async cadastrarAutor(autor: Autor): Promise<Autor> {
        return await this.autorService.cadastrarAutor(autor);
    }

    async listarAutores(): Promise<Autor[]> {
        return await this.autorService.listarAutores();
    }

    async buscarAutorPorId(id: number): Promise<Autor | null> {
        return await this.autorService.buscarAutorPorId(id);
    }

    async atualizarAutor(autor: Autor): Promise<Autor | null> {
        return await this.autorService.atualizarAutor(autor);
    }

    async removerAutor(id: number): Promise<void> {
        await this.autorService.removerAutor(id);
    }
}