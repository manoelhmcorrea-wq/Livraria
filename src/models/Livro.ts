export interface ILivro {
    titulo: string;
    categoria: string;
    disponivel: boolean;
    anoPublicacao: number;
    autorId: number;
    id?: number;
}

export class Livro implements ILivro {
    titulo: string;
    categoria: string;
    disponivel: boolean;
    anoPublicacao: number;
    autorId: number;
    id?: number;

    constructor(titulo: string, categoria: string, disponivel: boolean, anoPublicacao: number, autorId: number, id?: number) {
        this.titulo = titulo;
        this.categoria = categoria;
        this.disponivel = disponivel;
        this.anoPublicacao = anoPublicacao;
        this.autorId = autorId;

        if (id !== undefined) {
            this.id = id;
        }
    }
}