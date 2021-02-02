import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
    baseURL: 'http://vacina.cwg.services/api'
    //baseURL: 'http://192.168.15.3/api'
})

export async function autenticado() {
    const token = await AsyncStorage.getItem('jwt');
    api.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    return api;
}

/** REMOVE UNDEFINIED E OUTROS */
export async function limpaObjeto(obj) {
    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') limpaObjeto(obj[key]);
        else if (obj[key] === undefined) delete obj[key];
    });
    return obj;
}

/** RETORNA AS MENSAGENS DE ERROS */
export function getErroMsg(erro) {
    return Object.values(erro.response.data).join("\n")
}


export default api;

