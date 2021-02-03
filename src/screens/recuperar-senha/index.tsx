import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AppMain, AppToolbar, AppContainer, fontPadrao, AppInput, AppButton } from '../../themes/theme'; 
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import UsuarioService from '../../services/usuario.service';
import * as Colors from './../../themes/colors';

export function RecuperarSenhaScreen () {

    //Função de recuperar senha
    const [erro, setErro] = React.useState<null|string>(null);
    const [enviado, setEnviado] = React.useState(false);
    const enviar = async (dados: {email:string}) => {
        setErro(null);
        const resposta = await UsuarioService.recuperarSenha(dados.email);
        if (resposta.sucesso) setEnviado(true)
        else setErro('Não foi possível encontrar o email na base de dados');
    }

    return (
      <AppMain>
        <AppToolbar titulo="Recuperar Senha" backButton backgroundColor={Colors.LIGHT}/>
        <AppContainer>
            <Formik
                //Dados iniciais 
                initialValues={{email: ''}}
                // Validação de formulário
                validationSchema={Yup.object().shape({
                    email: Yup.string().required('Email obrigatório').email('Email inválido').required('Email obrigatório')
                })}
                //Envio
                onSubmit={enviar}
            >
                {({errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting}) => (
                    <View style={style.formulario}>
                        {/* SOLICITAÇÃO DE RECUPERAR SENHA */}
                        { !enviado && <>
                            <Text style={[style.titulo, fontPadrao.negrito]}>Recuperar Senha</Text>
                            <Text style={[fontPadrao.regular, {marginBottom: 10}]}>Caso tenha esquecido a sua senha, informe o email abaixo que iremos solicitar uma nova senha</Text>

                            {/* EMAIL */}
                            <AppInput titulo="Email" touched={touched.email} error={errors.email} noBorder>
                                <TextInput 
                                    keyboardType="email-address"
                                    placeholder="Digite seu Email"
                                    onBlur={handleBlur('email')} 
                                    onChangeText={handleChange('email')} />
                            </AppInput>


                            {/* Botão */}
                            { erro && <Text style={[style.erro, fontPadrao.regular]}>{erro}</Text>}
                            { isSubmitting && <ActivityIndicator size={30} color={Colors.PRIMARY}/>}
                            { !isSubmitting && <AppButton title="Recuperar" onPress={handleSubmit}/>}
                        </>}

                        {/* EMAIL DE RECUPERAÇÂO ENVIADO */}
                        { enviado && <>
                            <Text style={[{textAlign:'center'}, fontPadrao.regular]}>Verifique o seu email para proceder com a recuperação da sua senha</Text>
                        </>}

                    </View>
                )}
            </Formik>
        </AppContainer>
      </AppMain>
    );
}

const style = StyleSheet.create({
    formulario: {
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        width: '100%',
        padding: 20
    },
    erro: {color:'red', marginVertical: 10},
    titulo: { textAlign:'center', fontSize: 20 }
})