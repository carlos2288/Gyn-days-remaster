export default class Exercicio{
    constructor(nome = "Flexão", diasSemana = 'seg, ter, quar',repeticoes = 3,series = 3,concuido = false,descrição = ''){
       this.nome = nome
       this.repeticoes = repeticoes
       this.series = series
       this.concuido = concuido
       this.diasSemana = diasSemana 
       this.descrição = descrição
    }
}