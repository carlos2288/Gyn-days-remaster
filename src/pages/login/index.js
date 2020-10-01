import React from 'react';
import { View, Text, Image, ImageBackground, TextInput, KeyboardAvoidingView,
    Platform, Keyboard, TouchableWithoutFeedback, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements';
import logoImg from '../../assets/logo.png';
import bgLogin from '../../assets/Bg-Login.png';
import styles from './styles';
import TextCustom from '../../utils/fonts';
import { Feather } from '@expo/vector-icons';
import { _retrieveData } from '../../../utils/memoria';


export default function Login(){

    const navigation = useNavigation();
    var [email,setEmail] = React.useState()
    var [senha,setSenha] = React.useState()

    function navigateToSignUp(){
        navigation.navigate('SignUp1');
    }

    function navigateToHome(){
        navigation.navigate('HomeTab');
    }
    function login(){
        _retrieveData((user)=>{
            user = JSON.parse(user)
            if(email && senha){
                if(true){
                    if(email == user.email && senha == user.senha){
                        navigation.navigate('HomeTab')
                    }else{
                        alert('Usuário ou senha incorretos')
                    }
                }else{
                    alert('Faça Seu cadastro')
                }
                
            }
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
                
            <ImageBackground style={{flex: 1}} source={bgLogin}>
            <View style={styles.components}>
            <View style={styles.logo}>
                <Image source={logoImg}/>
            </View>
            <View style={styles.loginInputsContainer}>
                <View style={styles.loginInputs}>
                <TextCustom style={styles.textInputLogin}>Email:</TextCustom>
                    <TextInput 
                    type='Email'
                    textContentType={"emailAddress"}
                    style={styles.inputColor}
                    placeholder='nickname@email.com'
                    placeholderTextColor="#A0A0A0"
                    returnKeyType="next"
                    onChangeText={text=>setEmail(text)}
                    >{email}
                    </TextInput>
                    <TextCustom style={styles.textInputLogin}>Password:</TextCustom>
                    <TextInput
                        type="password" 
                        textContentType={"password"}
                        style={styles.inputColorPassword}
                        placeholder='password'
                        placeholderTextColor="#A0A0A0"
                        returnKeyType="done"
                        secureTextEntry={true}
                        onChangeText={text=>{setSenha(text)}}
                        >{senha}</TextInput>
                </View>
                <Button onPress={login} type="clear" title="Login" titleStyle={styles.buttonStyle}/>
                
                <TouchableOpacity 
                    style={styles.buttonSignUp}
                    onPress={navigateToSignUp}
                    >
                    <Text style={styles.textButton }>Não Tenho Cadastro.</Text>
                    <Feather name="log-in" size={16} color="#F2994A" style={{marginTop: 18}}/>
                </TouchableOpacity>
            </View>
            </View>
            <View style={{ height: 1 }} />
            </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}