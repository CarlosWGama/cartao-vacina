import { Sintoma } from "../models/sintoma";
import api, { autenticado, getErroMsg, limpaObjeto } from "./api.service";

/** Service que controla o acesso aos dados da sintoma */
const SintomaService = {

    /** Busca as sintomas do usuário logado */
    buscar: async (): Promise<Sintoma[]> => {

        const sintomas: Sintoma[] = [];

        const api = await autenticado();
        try {
            const response = await api.get('/sintomas')
            if (response.status == 200) response.data.forEach(s => sintomas.push(s));
        } catch(erro) { console.log(erro) }
        return sintomas;
    },

    /** Cadastra uma sintoma */
    cadastrar: async (sintoma: Sintoma): Promise<{sucesso: boolean, erro?:string}> => {

        const api = await autenticado();
        try {
            const response = await api.post('/sintomas', {sintoma})
            if (response.status == 201)
                return {sucesso: true}
            return {sucesso: false}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)};
        }
    },

    /** Atualiza uma sintoma */  
    editar: async (sintoma: Sintoma): Promise<{sucesso: boolean, erro?:string}> => {

        const api = await autenticado();
        try {
            sintoma = await limpaObjeto(sintoma);
            delete sintoma['vacina'];
            const response = await api.put(`/sintomas/${sintoma.id}`, {sintoma})
            return {sucesso: true}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)}
        }
    },

    /** Solicita a recuperação do email do usuário */
    excluir: async (sintomaID: number): Promise<{sucesso: boolean, erro?:string}> => {
        const api = await autenticado();
        try {
            const response = await api.delete(`/sintomas/${sintomaID}`)
            return {sucesso: true}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)}
        }
    },
}

export default SintomaService;