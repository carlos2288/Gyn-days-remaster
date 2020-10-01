import React from 'react';
import { View, StatusBar, TextInput,AsyncStorage,ToastAndroid,TouchableOpacity } from 'react-native';
import styles from './styles';
import TextCustom from '../../../utils/fonts';
import {Avatar, Button} from 'react-native-elements';
import Usuario from '../../../../model/Usuario';
import { set } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { _retrieveData, _storeData, _cadastro } from '../../../../utils/memoria';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import Constants from "expo-constants";



export default function Profile(){
    
    var [user,setUser] = React.useState(new Usuario())
    const [image,setImage] = React.useState(user.imagem)
    var [peso,setPeso] = React.useState(user.peso);
    var [altura,setAltura] = React.useState(user.altura);
    var [partDir,setPartDir] = React.useState(user.partDir);
    var [partEsq,setPartEsq] = React.useState(user.partEsq);
    var [coxaEsq,setCoxaEsq] = React.useState(user.coxaEsq);
    var [coxaDir,setCoxaDir] = React.useState(user.coxaDir);
    var [quadril,setQuadril] = React.useState(user.quadril);
    var [abdomem,setAbdomem] = React.useState(user.abdomem);
    var [cintura,setCintura] = React.useState(user.cintura);
    var [torax,setTorax] = React.useState(user.torax);
    var [braçoDir,setBraçoDir] = React.useState(user.braçoDir);
    var [braçoEsq,setBraçoEsq] = React.useState(user.braçoEsq);
    var [ABracoDir,setABracoDir] = React.useState(user.ABracoDir);
    var [ABracoEsq,setABracoEsq] = React.useState(user.ABracoEsq);
    var [punhoEsq,setPunhoEsq] = React.useState(user.punhoEsq);
    var [PunhoDir,setPunhoDir] = React.useState(user.PunhoDir);
    var [controle, setControle] = React.useState(true)
    var [nome,setNome] = React.useState(user.nome)
    var [nascimento,setNascimento] = React.useState(user.nascimento)
    var [endereco,setEndereco] = React.useState(user.endereco)
    var [contato,setContato] = React.useState(user.contato)
    var [matricula,setMatricula] = React.useState(user.matricula)
    const navigation = useNavigation()

    async function imagePickerCall() {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
          if (status !== "granted") {
            alert("Nós precisamos dessa permissão.");
            return;
          }
        }
    
        const data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All
        });
    
        if (data.cancelled) {
          return;
        }
    
        if (!data.uri) {
          return;
        }
    
        _cadastro(user=>{
            user.imagem = data.uri
            setImage(data.uri)
            return user
        })
      }

    if (controle){
        setControle(false)
        _retrieveData((value)=>{
            user =  JSON.parse(value)
            setPeso(user.peso)
            setAltura(user.altura)
            setPartDir(user.partDir)
            setPartEsq(user.partEsq)
            setCoxaEsq(user.coxaEsq)
            setCoxaDir(user.coxaDir)
            setQuadril(user.quadril)
            setAbdomem(user.abdomem)
            setCintura(user.cintura)
            setTorax(user.torax)
            setBraçoDir(user.braçoDir)
            setBraçoEsq(user.braçoEsq)
            setABracoDir(user.ABracoDir)
            setABracoEsq(user.ABracoEsq)
            setPunhoDir(user.PunhoDir)
            setPunhoEsq(user.punhoEsq)
            setNome(user.nome)
            setContato(user.contato)
            setNascimento(user.nascimento)
            setEndereco(user.endereco)
            setMatricula(user.matricula)
            setImage(user.imagem)
        })
      }
  
      navigation.addListener('focus',payload => {
            setControle(true)
        }
      );
    

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#000F14"/>
            <View style={styles.content}>
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                <TextCustom style={styles.headerText}>Perfil</TextCustom>
                </View>
            </View>
            <View style={styles.perfilElements}>
                <View style={styles.perfilPhoto}>
                    <Avatar 
                        rounded 
                        source={{uri: image}}
                        size={100}
                        onPress={imagePickerCall}
                        />
                </View>
                <View style={styles.infoFeed}>
                    <View style={styles.lineInfo}>
                    <TextCustom style={styles.infoTextOrange}>Nome: </TextCustom>
                    <TextCustom style={styles.infoTextWhite}>{nome}</TextCustom>
                    </View>
                    <View style={styles.lineInfo}>
                    <TextCustom style={styles.infoTextOrange}>Nascimento: </TextCustom>
                    <TextCustom style={styles.infoTextWhite}>{nascimento}</TextCustom>
                    </View>
                    <View style={styles.lineInfo}>
                    <TextCustom style={styles.infoTextOrange}>Matricula: </TextCustom>
                    <TextCustom style={styles.infoTextWhite}>{matricula}</TextCustom>
                    </View>
                    <View style={styles.lineInfo}>
                    <TextCustom style={styles.infoTextOrangeTraining}>Endereço: </TextCustom>
                    <TextCustom style={styles.infoTextWhiteTraining}>{endereco}</TextCustom>
                    </View>
                    <View style={styles.lineInfo}>
                    <TextCustom style={styles.infoTextOrange}>Contato: </TextCustom>
                    <TextCustom style={styles.infoTextWhite}>{contato}</TextCustom>
                    </View>
                </View>
            </View>
            <View style={styles.lineContainer}/>
            
            <View style={styles.date}>
                <TextCustom style={styles.infoTextWhite}>Data: 03/04/2020</TextCustom>
            </View>

            <View style={styles.inputContainers}>
            
            <View style={styles.inputContainer}>
                
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        onChangeText={text=>setPeso(text)}
                        maxLength={5}>{peso}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Peso: </TextCustom>
                    
                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        onChangeText={text=>setAltura(text)}
                        maxLength={5}>{altura}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Altura: </TextCustom>
                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>{setPartEsq(text)}}>{partEsq}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Part. Esq.: </TextCustom>

                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setPartDir(text)}>{partDir}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Part. Dir.: </TextCustom>
                    
                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setCoxaEsq(text)}>{coxaEsq}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Coxa Esq.: </TextCustom>

                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setCoxaDir(text)}>{coxaDir}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Coxa Dir.: </TextCustom>
                </View>
                <View style={styles.inputLine}>
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setQuadril(text)}>{quadril}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Quadril: </TextCustom>
                    
                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setAbdomem(text)}>{abdomem}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Abdômen: </TextCustom>
                </View>
        
            </View>


            <View style={styles.inputContainer2}>
                
                <View style={styles.inputLine}>
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text => setCintura(text)}>{cintura}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Cintura: </TextCustom>
                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setTorax(text)}>{torax}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Tórax: </TextCustom>
                    
                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setBraçoEsq(text)}>{braçoEsq}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Braço Esq.: </TextCustom>
                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setBraçoDir(text)}>{braçoDir}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Braço Dir.: </TextCustom>

                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setABracoEsq(text)}>{ABracoEsq}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>A. Braço Esq.: </TextCustom>
                    
                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setABracoDir(text)}>{ABracoDir}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>A. Braço Dir.: </TextCustom>

                </View>
                <View style={styles.inputLine}>
                    
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setPunhoEsq(text)}>{punhoEsq}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Punho Esq.: </TextCustom>
                </View>
                <View style={styles.inputLine}>
                    <TextInput style={styles.inputColor}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={text=>setPunhoDir(text)}>{PunhoDir}</TextInput>
                    <TextCustom style={styles.infoTextWhite}>Punho Dir: </TextCustom>
                    
                </View>
             
        
            </View>
            </View>

            <Button onPress={()=>{
                _cadastro(user=>{
                    user.altura = altura
                    user.partEsq = partEsq
                    user.partDir = partDir
                    user.coxaEsq = coxaEsq
                    user.coxaDir = coxaDir
                    user.quadril = quadril
                    user.abdomem = abdomem
                    user.cintura = cintura
                    user.torax = torax
                    user.braçoEsq = braçoEsq
                    user.braçoDir = braçoDir
                    user.ABracoDir = ABracoDir
                    user.ABracoEsq = ABracoEsq
                    user.punhoEsq = punhoEsq
                    user.PunhoDir = PunhoDir
                    ToastAndroid.show("Salvo",ToastAndroid.SHORT)
                    return user
                })
            }} type="clear" title="Concluir"  titleStyle={styles.buttonStyle}/>

            

            
            </View>
        </View>
    );
}