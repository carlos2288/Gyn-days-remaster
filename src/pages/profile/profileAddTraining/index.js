import React from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, Platform, Image,
     TextInput, TouchableOpacity, TouchableWithoutFeedback, StatusBar,AsyncStorage,
    ToastAndroid,FlatList } from 'react-native';
import {Feather} from '@expo/vector-icons';
import styles from './styles';
import TextCustom from '../../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import Usuario from '../../../../model/Usuario';
import Exercicio from '../../../../model/Exercicio';
import { _retrieveData, _storeData, _cadastro } from '../../../../utils/memoria';



export default function AddTraining(){
    var user = new Usuario()
    var [user1,setUser1] = React.useState(user)
    var [nome,setNome] = React.useState()
    var [repeticoes, setRepeticoes] = React.useState()
    var [series, setSeries] = React.useState()
    var [desc, setDesc] = React.useState()
    var [diasSemana, setDiasSemana] = React.useState()
    var [controle,setControle] = React.useState(true)
    var [salvo,setSavlo] = React.useState(false)
    var [selecionado,setSelecionado] = React.useState(["#FFF","#FFF","#FFF","#FFF","#FFF","#FFF","#FFF"])
    const navigation = useNavigation();
    var dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    var [diasExercicio,setDiasExercico] = React.useState([])

    function retiraElemenoLista(elemento){
        var novaLista = []
        //alert(lista.length)
        for (var i=0;i<diasExercicio.length;i++){
            if(diasExercicio[i]!= elemento){
                novaLista.push(diasExercicio[i])
            }
        }
        setDiasExercico(novaLista) 
    }

    function handleToTrainingFeed(){
        navigation.goBack()
    }

    if (controle){
        setControle(false)
        _retrieveData((value)=>{
            user = JSON.parse(value)
            setUser1(user)
            console.log('carregou')
            ToastAndroid.show("Dados carregados",ToastAndroid.SHORT)
        })
    }
    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.select({
                ios: 'padding',
                android: null,
            })}
            >
        <StatusBar backgroundColor="#000F14"/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.marginArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleToTrainingFeed}>
                    <Feather name="arrow-left" size={24} color="#F2994A"/>
                </TouchableOpacity>
                <TextCustom style={styles.headerText}>Novo Exercicio</TextCustom>
                
            </View>
            <View style={styles.content}>
                <TextCustom style={styles.textInputSignUp}>Nome do exercicio:</TextCustom>
                    <TextInput 
                    textContentType={"name"}
                    style={styles.inputColor}
                    placeholder='Ex: Flexão'
                    placeholderTextColor="#A0A0A0"
                    returnKeyType="next"
                    onChangeText={text=>setNome(text)}
                    >{nome}
                    </TextInput>

                <TextCustom style={styles.textInputSignUp}>Dias por semana:</TextCustom>
                    <FlatList 
                        data={dias}
                        style={styles.trainingList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item=>item}
                        horizontal
                        renderItem={({ item, index, separators })=>(
                            <View style={{margin:5}}>
                                <Button 
                                title={item} 
                                type = "clear" 
                                titleStyle={{color:selecionado[index]}} 
                                onPress={()=>{
                                    var aux = []
                                    for(var i=0;i<selecionado.length;i++){
                                        if(i==index){
                                            if(selecionado[index] == '#FFF'){
                                                aux.push('#F2994A')
                                                diasExercicio.push(index)
                                                //alert(JSON.stringify(diasExercicio))
                                            }else{
                                                aux.push('#FFF')
                                                retiraElemenoLista(index)
                                            }
                                        }else{
                                            aux.push(selecionado[i])
                                        }
                                    }
                                    setSelecionado(aux)
                                   // alert('clicou')
                                }}
                                />
                            </View>

                        )} />
                    <TextCustom style={styles.textInputSignUp}>Repetições:</TextCustom>
                    <TextInput
                        style={styles.inputColor}
                        placeholder='Ex: 20'
                        placeholderTextColor="#A0A0A0"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onChangeText={text=>setRepeticoes(text)}
                        >{repeticoes}</TextInput>

                    <TextCustom style={styles.textInputSignUp}>Séries:</TextCustom>
                    <TextInput
                        style={styles.inputColor}
                        placeholder='Ex: 3'
                        placeholderTextColor="#A0A0A0"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onChangeText={text=>setSeries(text)}
                        >{series}</TextInput>

                    <TextCustom style={styles.textInputSignUp}>Descrição:</TextCustom>
                    <TextInput
                        style={styles.inputColorAutoGrow}
                        placeholder='Descreva detalhes do seu exercício'
                        placeholderTextColor="#A0A0A0"
                        returnKeyType="next"
                        multiline={true}
                        onChangeText={text=>setDesc(text)}
                        >{desc}</TextInput>
                    
                    
                    
            </View>
            <Button onPress={()=>{
                _cadastro(user=>{
                    var exercicio = new Exercicio(nome,diasExercicio,repeticoes,series,false,desc)
                    user.listaExercicios.push(exercicio)
                    navigation.goBack()
                    ToastAndroid.show('Salvo',ToastAndroid.SHORT)
                    return user
                })
                //alert(JSON.stringify(diasExercicio))
            }} type="clear" title="Concluir"  titleStyle={styles.buttonStyle}/>
            <View style={{ height: 1 }} />
            </View>
            
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}