import React from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, Platform, Image,
     TextInput, TouchableOpacity, TouchableWithoutFeedback, StatusBar, ToastAndroid } from 'react-native';
import {Feather} from '@expo/vector-icons';
import styles from './styles';
import logoImg from '../../../assets/logo.png';
import TextCustom from '../../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import Login from '../../login';
import { _cadastro } from '../../../../utils/memoria';
import Usuario from '../../../../model/Usuario';

export default function SignUp1(){
    var [objetivo,setObjetivo] = React.useState()
    var [orientador,setOrientador] = React.useState()
    var [nascimento,setNascimento] = React.useState()

    const navigation = useNavigation();

    function handleToSignUp1(){
        navigation.goBack()
    }

    function handleToLogin(){
        navigation.navigate("Login");
    }
    
    function cadastro(){
        _cadastro(user=>{
            
            user.objetivo = objetivo
            user.matricula = Math.floor(Math.random()*250000000)
            user.orientador = orientador
            user.listaExercicios = []
            user.valido = true
            user.nascimento = 0
            user.altura = 0
            user.partEsq = 0
            user.partDir = 0
            user.coxaEsq = 0
            user.coxaDir = 0
            user.quadril = 0
            user.abdomem = 0
            user.cintura = 0
            user.torax = 0
            user.braçoEsq = 0
            user.braçoDir = 0
            user.ABracoDir = 0
            user.ABracoEsq = 0
            user.punhoEsq = 0
            user.PunhoDir = 0
            
            ToastAndroid.show('Cadastro concluido',ToastAndroid.SHORT)
            navigation.goBack()
            navigation.goBack()
            return user
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
                <TouchableOpacity onPress={handleToSignUp1}>
                    <Feather name="arrow-left" size={24} color="#F2994A"/>
                </TouchableOpacity>
                <TextCustom style={styles.headerText}>Cadastro</TextCustom>
                <Image source={logoImg} style={styles.logoImg}/>
            </View>
            <View style={styles.content}>
                <TextCustom style={styles.textInputSignUp}>Objetivo:</TextCustom>
                    <TextInput 
                    textContentType={"name"}
                    style={styles.inputColor}
                    placeholder='Objetivo'
                    placeholderTextColor="#A0A0A0"
                    returnKeyType="next"
                    onChangeText={text=>{setObjetivo(text)}}
                    >{objetivo}
                    </TextInput>

                    {/* Lugar para por pick number de 1 a até 7 dias por semana */}

                    <TextCustom style={styles.textInputSignUp}>Orientador:</TextCustom>
                    <TextInput
                        style={styles.inputColor}
                        placeholder='Orientador'
                        placeholderTextColor="#A0A0A0"
                        returnKeyType="next"
                        onChangeText={text=>{setOrientador(text)}}
                        >{orientador}</TextInput>
                    <TextCustom style={styles.textInputSignUp}>Nascimento:</TextCustom>
                    <TextInput
                        style={styles.inputColor}
                        placeholder='Nascimento'
                        placeholderTextColor="#A0A0A0"
                        returnKeyType="next"
                        onChangeText={text=>{setNascimento(text)}}
                        >{nascimento}</TextInput>
                    
            </View>
            <Button type="clear" title="Continuar"  titleStyle={styles.buttonStyle}onPress={cadastro}/>
            <View style={{ height: 1 }} />
            </View>
            
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}