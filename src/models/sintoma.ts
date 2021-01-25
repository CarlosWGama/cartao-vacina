import { Vacina } from './vacina';

/**
 * Possui as informações basicas do sintoma
 */
export interface Sintoma {

    id?: number;
    tipo_id?: number;
    outro_tipo?: string;
    vacina_id?: number;
    vacina?: Vacina
    data_ocorrencia?: string;
}

/**
 * Retorna o nome do tipo do sintoma
 * @param sintoma 
 */
export function useTipoSintoma(sintoma: Sintoma) {

    switch(sintoma.tipo_id) {
        default: return sintoma.outro_tipo;
    }

}