export interface ICliente {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    ativo: boolean;
    id?: number;
    criadoEm?: Date;
}

export class Cliente implements ICliente {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    ativo: boolean;
    id?: number;
    criadoEm?: Date;

    constructor(nome: string, email: string, cpf: string, telefone: string, ativo: boolean, id?: number, criadoEm?: Date) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.ativo = ativo; 

        if (id !== undefined) {
            this.id = id;
        }   

        if (criadoEm !== undefined) {
            this.criadoEm = criadoEm;
        }   
    }
}
