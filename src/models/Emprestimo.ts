export interface IEmprestimo{
    dataEmprestimo: Date;
    clienteId:number;
    livroId: number;
    dataDevolucao?: Date;
    id?:number
}

export class Emprestimo implements IEmprestimo{
    dataEmprestimo: Date;
    clienteId:number;
    livroId: number;
    dataDevolucao?: Date;
    id?:number;

    constructor(
    dataEmprestimo: Date,
    clienteId:number,
    livroId: number,
    dataDevolucao?: Date,
    id?:number
){
    this.dataEmprestimo = dataEmprestimo;
    this.clienteId = clienteId;
    this.livroId = livroId;


    if(dataDevolucao !== undefined){
        this.dataDevolucao = dataDevolucao;
    }

    if (id !== undefined){
        this.id = id;
    }
}
}
