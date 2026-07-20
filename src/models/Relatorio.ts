export interface LivroPorAutor{
    autor: string;
    titulo:string;
}

export interface QuantidadeEmprestimoLivro {
    titulo: string;
    quantidade: number;
}

export interface ClienteEmprestimoAtivo {
    cliente: string;
    livro: string;
    dataEmprestimo: Date;
}