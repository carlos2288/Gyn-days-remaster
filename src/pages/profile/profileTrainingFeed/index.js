import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, FlatList,AsyncStorage, ToastAndroid } from 'react-native';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import TextCustom from '../../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import Usuario from '../../../../model/Usuario';
import { _retrieveData, _storeData, _cadastro } from '../../../../utils/memoria';
import Exercicio, { hoje } from '../../../../model/Exercicio';

export default function TrainingFeed(){
    var user1 = new Usuario()
    var [user,setUser] = React.useState(user1)
    var [lista,setLista]=React.useState(user.listaExercicios)
    var [objetivo,setObjetivo] = React.useState(user.objetivo)
    var [freq, setFreq] = React.useState(user.frequencia)
    var [orientador,setOrientador] = React.useState(user.orientador)
    var [dataInicio, setDataInicio] = React.useState(user.dataInicio)
    var [controle, setControle] = React.useState(true)
    const navigation = useNavigation();

    function handleToAddTraining(){
        navigation.navigate('AddTraining');
    }

    if (controle){
      setControle(false)
      _retrieveData((value)=>{
        var data = new Date()
        var novaLista = []
        
        user1 = JSON.parse(value)
        user = user1
        console.log(JSON.stringify(user.listaExercicios))
      
        for(var i = 0;i<user.listaExercicios.length;i++){
          if(hoje(user.listaExercicios[i].diasSemana)){
            novaLista.push(user.listaExercicios[i])
          }else{
            
          }
        }
        _cadastro(user=>{
          for(var i = 0;i<user.listaExercicios.length;i++){
            if(hoje(user.listaExercicios[i].diasSemana)){
              
            }else{
              user.listaExercicios[i].concuido = false
            }
          }     
          return user
        })
        setLista(novaLista)
        setObjetivo(user.objetivo)
        setFreq(user.frequencia)
        setOrientador(user.orientador)
        setDataInicio(user.dataInicio)

        console.log('carregou')
      })
    }
    navigation.addListener('focus',payload => {
        setControle(true)
      }
    );

    function getEstado(controle){
      var estado = null
      if(controle){
          estado = 'Concluido'
      }else{
          estado = 'Pendente'
      }
      return estado
    }
//    console.log(JSON.stringify(user))
    return(
        
        <View style={styles.container}>
            <StatusBar backgroundColor="#000F14"/>

            <View style={styles.content}>
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                  <TextCustom style={styles.headerText}>Feed de Treinos</TextCustom>
                </View>
                <View style={styles.headerButtonContainer}>
                  <TouchableOpacity onPress={handleToAddTraining}>
                    <Feather name="plus" color="#F2994A" size={24} />
                  </TouchableOpacity>
                </View>
            </View>
            <View style={styles.infoFeed}>
                <View style={styles.lineInfo}>
                  <TextCustom style={styles.infoTextOrange}>Objetivo: </TextCustom>
                  <TextCustom style={styles.infoTextWhite}>{objetivo}</TextCustom>
                </View>
                <View style={styles.lineInfo}>
                  <TextCustom style={styles.infoTextOrange}>Frequência: </TextCustom>
                  <TextCustom style={styles.infoTextWhite}>{freq} vezes por semana</TextCustom>
                </View>
                <View style={styles.lineInfo}>
                  <TextCustom style={styles.infoTextOrange}>Orientador: </TextCustom>
                  <TextCustom style={styles.infoTextWhite}>{orientador}</TextCustom>
                </View>
                <View style={styles.lineInfo}>
                  <TextCustom style={styles.infoTextOrange}>Data de inicio: </TextCustom>
                  <TextCustom style={styles.infoTextWhite}>{dataInicio}</TextCustom>
                </View>
            </View>

            {/* Lista de Exercícios Diários */}

            <FlatList 
                data={lista}
                style={styles.trainingList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item=>item.nome}
                renderItem={({ item, index, separators })=>(
                  <TouchableOpacity 
                    style ={styles.training}
                    onPress = {()=>{
                      _cadastro(user=>{
                        var novaLista = []
                        var novaLista2 = []
                        for(var i = 0;i<lista.length;i++){
                          novaLista.push(lista[i])
                          if(i == index){
                            novaLista[i].concuido = true
                          }
                        }
                        for(var i = 0;i<user.listaExercicios.length;i++){
                          novaLista2.push(user.listaExercicios[i])
                          if(item.nome === user.listaExercicios[i].nome){
                            novaLista2[i].concuido = true
                          }else{

                          }
                        }
                        setLista(novaLista)
                        //user.listaExercicios = novaLista2
                        ToastAndroid.show("Concluido",ToastAndroid.SHORT)
                        return user
                      })
                    }}
                    onLongPress = {()=>{
                      _cadastro(user=>{
                        var novaLista = []
                        var novaLista2 = []
                        for(var i = 0;i<lista.length;i++){
                          if(i != index){
                            novaLista.push(lista[i])
                          }
                        }
                        for(var i = 0;i<user.listaExercicios.length;i++){
                          if(item.nome === user.listaExercicios[i].nome){
                            console.log('igual')
                          }else{
                            novaLista2.push(user.listaExercicios[i])
                            console.log('desigual')
                          }
                        }
                        setLista(novaLista)
                        user.listaExercicios = novaLista2
                        ToastAndroid.show("Deletado",ToastAndroid.SHORT)
                        return user
                      })
                    }}
                    >
                    <View style={styles.lineInfo}>
                      <TextCustom style={styles.infoTextOrangeTraining}>Exercicio: </TextCustom>
                      <TextCustom style={styles.infoTextWhiteTraining}>{item.nome}</TextCustom>
                    </View>
                    <View style={styles.lineInfo}>
                      <TextCustom style={styles.infoTextOrangeTraining}>Repetições: </TextCustom>
                      <TextCustom style={styles.infoTextWhiteTraining}>{item.repeticoes}</TextCustom>
                    </View>
                    <View style={styles.lineInfo}>
                      <TextCustom style={styles.infoTextOrangeTraining}>Séries: </TextCustom>
                      <TextCustom style={styles.infoTextWhiteTraining}>{item.series}</TextCustom>
                    </View>
                    <View style={styles.lineInfo}>
                      <TextCustom style={styles.infoTextOrangeTraining}>Descrição: </TextCustom>
                      <TextCustom style={styles.infoTextWhiteTraining}>{item.descrição}</TextCustom>
                    </View>
                    <View style={styles.lineInfo}>
                      <TextCustom style={styles.infoTextOrangeTraining}>Status: </TextCustom>
                      <TextCustom style={styles.infoTextWhiteTraining}>{getEstado(item.concuido)}</TextCustom>
                    </View>
                  </TouchableOpacity>
                )} />

            
            </View>
        </View>
    );
}