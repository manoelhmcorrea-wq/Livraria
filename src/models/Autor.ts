//adicionado id opcional para permitir a criação de novos autores sem precisar passar o id, que será gerado pelo banco de dados
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