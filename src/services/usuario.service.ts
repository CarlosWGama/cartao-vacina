import { Usuario } from "../models/usuario";
import AsyncStorage from '@react-native-community/async-storage';
import api, { autenticado, getErroMsg, limpaObjeto } from "./api.service";

/** Service que controla o acesso aos dados do usuário */
const UsuarioService = {

    /** Realiza o login do usuário */
    login: async (email: string, senha: string): Promise<{sucesso: boolean, usuario?:Usuario}> => {
        try {
            const response = await api.post('/login', {email, senha});
            if (response.status == 200) {
                AsyncStorage.setItem('jwt', response.data.jwt);
                const usuario = Object.assign({} as Usuario, response.data.usuario);
                AsyncStorage.setItem('usuario', JSON.stringify(usuario));
                return {sucesso: true, usuario }
            }
            return {sucesso: false}
        } catch (erro) {
            return {sucesso: false}
        } 
    },

    /** Cadastra um usuário */
    cadastrar: async (usuario: Usuario): Promise<{sucesso: boolean, erro?:string}> => {
        try {
            const response = await api.post('/usuarios', {usuario})
            if (response.status == 201)
                return {sucesso: true}
            return {sucesso: false}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)};
        }
    },

    /** Atualiza o perfil do usuário */  
    editar: async (usuario: Usuario): Promise<{sucesso: boolean, erro?:string}> => {
        const api = await autenticado();
        try {
            usuario = await limpaObjeto(usuario);
            const response = await api.put('/usuarios', {usuario})
            return {sucesso: true}
        } catch(erro) {
            console.log(erro);
            return {sucesso: false, erro:getErroMsg(erro)}
        }
    },

    /** Solicita a recuperação do email do usuário */
    recuperarSenha: async (email: string): Promise<{sucesso: boolean}> => {        
        try {
            const response = await api.put('/senha', {email})
            return {sucesso: (response.status == 200)}
        } catch (erro) {
            return {sucesso: false};
        }
    },

    /** Desloga o usuário */
    logout: () => {
        AsyncStorage.clear()
    }   
}

export default UsuarioService;