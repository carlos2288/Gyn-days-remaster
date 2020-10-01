import {AsyncStorage,ToastAndroid} from 'react-native'
import Usuario from '../model/Usuario';

export var _storeData = async (teste = {data:'Dados a serem salvos'},func = (paylad)=>{}) => {
    var usuario = JSON.stringify(teste)
    try {
      await AsyncStorage.setItem('user',usuario);
      console.log('salvo')
      func()
    } catch (error) {
        console.log(error)
        console.log('não salvo')
    }
  };
export var _retrieveData = async (func = (paylad)=>{}) => {
    try {
        var value = await AsyncStorage.getItem('user')
        if (value !== null) {
            func(value)
        }else{
            value = new Usuario()
            func(value)
        }
    } catch (error) {
        console.log(error)
    }
};

export var _cadastro = async (func = (payload) =>{return user}) =>{
    // Função cadastro está sendo usada para praticamente tudo que envolva edição de dados
    _retrieveData(value=>{
        try{
            var user = JSON.parse(value)
            user = func(user)
            if(user != null){
                _storeData(user)
            }
            console.log(JSON.stringify(user))
        }catch(error){
            var user = new Usuario()
            user = func(user)
            _storeData(user)
            
        }
        
    })
}
