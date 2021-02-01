import { Vacina } from "../models/vacina";
import api, { autenticado, getErroMsg, limpaObjeto } from "./api.service";

/** Service que controla o acesso aos dados da vacina */
const VacinaService = {

    /** Busca as vacinas do usuário logado */
    buscar: async (): Promise<Vacina[]> => {

        const vacinas: Vacina[] = [];

        const api = await autenticado();
        try {
            const response = await api.get('/vacinas')
            if (response.status == 200) response.data.forEach(v => vacinas.push(v));
        } catch(erro) { console.log(erro) }
        return vacinas;
    },

    /** Cadastra uma vacina */
    cadastrar: async (vacina: Vacina): Promise<{sucesso: boolean, erro?:string}> => {
        const api = await autenticado();
        try {
            const response = await api.post('/vacinas', {vacina})
            if (response.status == 201)
                return {sucesso: true}
            return {sucesso: false}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)};
        }
    },

    /** Atualiza uma vacina */  
    editar: async (vacina: Vacina): Promise<{sucesso: boolean, erro?:string}> => {
        const api = await autenticado();
        try {
            vacina = await limpaObjeto(vacina);
            const response = api.put(`/vacinas/${vacina.id}`, {vacina})
            return {sucesso: true}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)}
        }
    },

    /** Solicita a recuperação do email do usuário */
    excluir: async (vacinaID: number): Promise<{sucesso: boolean, erro?:string}> => {
        const api = await autenticado();
        try {
            const response = await api.delete(`/vacinas/${vacinaID}`)
            return {sucesso: true}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)}
        }
    },
}

export default VacinaService;