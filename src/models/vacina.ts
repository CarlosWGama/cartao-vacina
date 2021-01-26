/**
 * Informações da vacina
 */

export interface Vacina {
    //Geral
    id?:number;
    tipo?:number; //1 - Astrazeneca(Fiocruz) |2 - Coronavac(Butantan)|3 - Peizer|4 - Moderna|5 - Outro
    outro?:string;
    paciente_id?: number;

    //1ª DOSE
    dose1_data?:string;
    dose1_lote?:number;
    dose1_proxima_dose?:string;
    
    //2º DOSE
    dose2_data?:string;
    dose2_lote?:number;    
}

/**
 * Retorna o nome da Vacina
 * @param vacina 
 */
export function useTipoVacina(vacina:Vacina) {
    switch(vacina.tipo) {
        case 1: return 'Astrazeneca (Fiocruz)';
        case 2: return 'Coronavac (Butantan)';
        case 3: return 'Peizer';
        case 4: return 'Moderna';
        default: return String(vacina.outro);
    }
}