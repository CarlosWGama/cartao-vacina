import { Sintoma } from "../models/sintoma";
import api, { autenticado, getErroMsg, limpaObjeto } from "./api.service";

/** Service que controla o acesso aos dados da sintoma */
const SintomaService = {

    /** Busca as sintomas do usuário logado */
    buscar: async (): Promise<Sintoma[]> => {

        //Delay
        await new Promise((resolve, erro) => { setTimeout(() => resolve('a'), 1000)} )

        const sintomas: Sintoma[] = [
            {id: 1, tipo_id: 1, data_ocorrencia: '2021-01-25', outro: 'Dor de dente', vacina: {id:1, tipo: 1, dose1_data: '2021-01-21', dose1_lote: 1, dose1_proxima_dose:'2021-01-21'}, vacina_id: 1},
        ]
        return sintomas;
    },

    /** Cadastra uma sintoma */
    cadastrar: async (sintoma: Sintoma): Promise<{sucesso: boolean, erro?:string}> => {

        await new Promise((resolve, erro) => { setTimeout(() => resolve('a'), 1000)} )
        return {sucesso: true};

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

        await new Promise((resolve, erro) => { setTimeout(() => resolve('a'), 1000)} )
        return {sucesso: true};

        const api = await autenticado();
        try {
            sintoma = await limpaObjeto(sintoma);
            const response = api.put(`/sintomas/${sintoma.id}`, {sintoma})
            return {sucesso: true}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)}
        }
    },

    /** Solicita a recuperação do email do usuário */
    excluir: async (sintomaID: number): Promise<{sucesso: boolean, erro?:string}> => {

        await new Promise((resolve, erro) => { setTimeout(() => resolve('a'), 1000)} )
        return {sucesso: true};
        
        const api = await autenticado();
        try {
            const response = api.delete(`/sintomas/${sintomaID}`)
            return {sucesso: true}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)}
        }
    },
}

export default SintomaService;