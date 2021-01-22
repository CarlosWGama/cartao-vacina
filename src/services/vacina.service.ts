import { Vacina } from "../models/vacina";
import api, { autenticado, getErroMsg, limpaObjeto } from "./api.service";

/** Service que controla o acesso aos dados da vacina */
const VacinaService = {

    /** Busca as vacinas do usuário logado */
    buscar: async (): Promise<Vacina[]> => {

        //Delay
        await new Promise((resolve, erro) => { setTimeout(() => resolve('a'), 1000)} )

        const vacinas: Vacina[] = [
            {id:1, tipo: 1, dose1_data: '2021-01-21', dose1_lote: 1, dose1_proxima_dose:'2021-01-21'},
            {id:2, tipo: 2, dose1_data: '2020-01-20', dose1_lote: 1, dose1_proxima_dose:'2021-01-21', dose2_data: '2021-01-21', dose2_lote: 2},
        ]
        return vacinas;
    },

    /** Cadastra uma vacina */
    cadastrar: async (vacina: Vacina): Promise<{sucesso: boolean, erro?:string}> => {

        await new Promise((resolve, erro) => { setTimeout(() => resolve('a'), 1000)} )
        return {sucesso: true};

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

        await new Promise((resolve, erro) => { setTimeout(() => resolve('a'), 1000)} )
        return {sucesso: true};

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

        await new Promise((resolve, erro) => { setTimeout(() => resolve('a'), 1000)} )
        return {sucesso: true};
        
        const api = await autenticado();
        try {
            const response = api.delete(`/vacinas/${vacinaID}`)
            return {sucesso: true}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)}
        }
    },
}

export default VacinaService;