import React, { useRef } from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, Platform, Image,
     TextInput, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from 'react-native';
import {Feather} from '@expo/vector-icons';
import styles from './styles';
import logoImg from '../../../assets/logo.png';
import TextCustom from '../../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import Usuario from '../../../../model/Usuario'
import { _cadastro } from '../../../../utils/memoria';
//import {} from '@expo';

export default function SignUp1(){
    var [nome,setNome] = React.useState()
    var [email,setEmail] = React.useState()
    var [senha,setSenha] = React.useState()
    var [confirmarSenha,setComfirmarSenha] = React.useState()
    var [endereco,setEndereco] = React.useState()
    var [contato,SetContato] = React.useState()
    const navigation = useNavigation();

    function handleToLogin(){
        navigation.navigate('Login')
    }

    function handleToSignUp2(){
        navigation.navigate('SignUp2')
    }

    function cadastro(){
        if(nome && email && senha && confirmarSenha && endereco && contato){
            _cadastro(user=>{
                if(senha == confirmarSenha){
                    var data = new Date()
                    user.nome = nome
                    user.senha = senha
                    user.email = email
                    user.endereco = endereco
                    user.contato = contato
                    user.dataInicio = data.getDate() +"/"+(data.getMonth()+1)+'/'+data.getFullYear()
                    navigation.navigate('SignUp2')
                    return user
                }else{
                    alert('A senha e a confirmação de senha diferem, por vafor verifique e tente novamente')
                    return null
                }
            })
        }else{
            alert('preencha todos os campos')
        }
        
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
                <TouchableOpacity onPress={handleToLogin}>
                    <Feather name="arrow-left" size={24} color="#F2994A"/>
                </TouchableOpacity>
                <TextCustom style={styles.headerText}>Cadastro</TextCustom>
                <Image source={logoImg} style={styles.logoImg}/>
            </View>
            <View style={styles.content}>
                <TextCustom style={styles.textInputSignUp}>Nome:</TextCustom>
                    <TextInput 
                    textContentType={"name"}
                    style={styles.inputColor}
                    placeholder='Nome e Sobrenome'
                    placeholderTextColor="#A0A0A0"
                    returnKeyType="next"
                    onChangeText = {text=>setNome(text)}
                    >{nome}
                    </TextInput>
                    <TextCustom style={styles.textInputSignUp}>Email:</TextCustom>
                    <TextInput
                        textContentType={"emailAddress"}
                        style={styles.inputColor}
                        placeholder='example@email.com'
                        placeholderTextColor="#A0A0A0"
                        returnKeyType="next"
                        onChangeText={text=>{setEmail(text)}}
                        >{email}</TextInput>
                    <TextCustom style={styles.textInputSignUp}>Senha:</TextCustom>
                    <TextInput
                        textContentType={"password"}
                        style={styles.inputColor}
                        placeholder='password'
                        placeholderTextColor="#A0A0A0"
                        returnKeyType="next"
                        onChangeText={text=>{setSenha(text)}}
                        >{senha}</TextInput>
                    <TextCustom style={styles.textInputSignUp}>Confirmar Senha:</TextCustom>
                    <TextInput
                        textContentType={"password"}
                        style={styles.inputColor}
                        placeholder='confirm password'
                        placeholderTextColor="#A0A0A0"
                        returnKeyType="next"
                        onChangeText={text=>{setComfirmarSenha(text)}}
                        >{confirmarSenha}</TextInput>
                    <TextCustom style={styles.textInputSignUp}>Endereço:</TextCustom>
                    <TextInput
                        textContentType={"fullStreetAddress"}
                        multiline={true}
                        style={styles.inputColorAutoGrow}
                        placeholder='Rua, Numero, Bairro'
                        placeholderTextColor="#A0A0A0"
                        returnKeyType="next"
                        onChangeText={text=>{setEndereco(text)}}
                        >{endereco}</TextInput>
                    <TextCustom style={styles.textInputSignUp}>Contato:</TextCustom>
                    <TextInput
                        textContentType={"telephoneNumber"}
                        style={styles.inputColor}
                        placeholder='55(11)8888-8888'
                        placeholderTextColor="#A0A0A0"
                        returnKeyType="next"
                        onChangeText={text=>{SetContato(text)}}
                        >{contato}</TextInput>
                    
            </View>
                <Button type="clear" title="Continuar"  titleStyle={styles.buttonStyle}onPress={
                    cadastro
                }/>
                <View style={{ height: 1 }} />
            </View>
            
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}