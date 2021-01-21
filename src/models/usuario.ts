/** Interface que define os atributos basicos de usuário */
export interface Usuario {
    id?: number; 
    nome?: string;
    email?:string;
    senha?: string;
    data_nascimento?: string;
}