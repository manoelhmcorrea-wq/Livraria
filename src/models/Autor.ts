export interface IAutor {
    nome: string;
    nacionalidade: string;  
    id?: number;
}

export class Autor implements IAutor {
    
    nome: string;
    nacionalidade: string;
    id?: number;

    constructor(nome: string, nacionalidade: string, id?: number) {
        this.nome = nome;
        this.nacionalidade = nacionalidade;

        if  (id !== undefined) {
            this.id = id;
        }
    }
}