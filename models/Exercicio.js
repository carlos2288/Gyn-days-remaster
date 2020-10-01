export default class Exercicio{
    constructor(nome = "Flexão", diasSemana = 'seg, ter, quar',repeticoes = 3,series = 3,concuido = false,descrição = ''){
       this.nome = nome
       this.repeticoes = repeticoes
       this.series = series
       this.concuido = concuido
       this.diasSemana = diasSemana 
       this.descrição = descrição
    }

    getEstado(){
        var estado = null
        if(this.concuido){
            estado = 'Concluido'
        }else{
            estado = 'Pendente'
        }
        return estado
    }
}

export function hoje(dias = []){
    const data  = new Date()
    const hoje = data.getDay()
    //console.log('dias: ' + JSON.stringify(dias))
    //console.log('hoje: ' + hoje)
    var retorno = false
    for(var i = 0;i<dias.length;i++){
        if(hoje == dias[i]){
            retorno = true
        }
    } 
    return retorno
}