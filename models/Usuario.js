import Exercicio from './Exercicio'
import React from 'react';
import {AsyncStorage} from 'react-native';
export default class Usuario{
    constructor(){
        this.nome = "Carlos Jorge"
        this.matricula = "20181015030158"
        this.nascimento = "26-11-1999"
        this.enderecoRua = "Rua jandira"
        this.enderecoCasa = "1100"
        this.enderecoBairro = "Barra"
        this.contato = "985319265"
        this.login = "GEDESTE"
        this.senha = "GDESTE"
        this.orientador = "Marcos"
        this.objetivo = "Ficar bombado"
        this.frequencia = "TODO DIA"
        this.peso = "80"
        this.cintura = "20"
        this.torax = "20"
        this.dataInicio = "26-11-2000"
        this.partEsq = "20"
        this.partDir = "20"
        this.bracoDir = "20"
        this.bracoEsq = "20"
        this.coxaEsq = "20"
        this.coxaDir = "20"
        this.quadril = "20"
        this.abdomem = "20"
        this.punhoEsq = "20"
        this.punhoDir = "20"
        this.image = "20"
        this.altura = "20"
        this.antebracoDir = "20"
        this.AntebracoEsq = "20"
        this.listaExercicios = []
    }

    

    static login(email, senha,user){
        if(email == user.login && senha == user.senha){
            return true
        }else{
            return false
        }
    }

    cadastroParte1(nome,email,senha,confirmarSenha,endereco,contato,user){
        user.nome = nome
        user.login = email
        if(senha == confirmarSenha){
            user.senha = senha
        }
        user.contato = contato
        var i = 0;
        for(;i<=endereco.length;i++){
            if(endereco[i] != ','){
                user.enderecoRua = user.enderecoRua + endereco[i]
            }else{
                break
            }
        }
        i++
        for(;i<=endereco.length;i++){
            if(endereco[i] != ','){
                user.enderecoCasa = user.enderecoCasa + endereco[i]
            }else{
                break
            }
        }
        i++
        for(;i<=endereco.length;i++){
            if(endereco[i] != ','){
                user.enderecoBairro = user.enderecoBairro + endereco[i]
            }else{
                break
            }
        }
        return user
    }

     cadastroParte2(objetivo,orientador,frequencia,user){
        user.objetivo = objetivo
        user.orientador = orientador
        user.frequencia = frequencia
        return user
    }

    addExercicio(nome = "Flexão",repeticao = 20,serie = 3,descricao="descricao dos movimentos",diasSemana = ['Segunda','Terça']){
        var exercicio = new Exercicio(nome,repeticao,serie,descricao,diasSemana)
        this.listaExercicios.push(exercicio)
    }
}