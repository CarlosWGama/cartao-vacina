import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator, Platform, ToastAndroid, Image } from 'react-native';
import { AppMain, AppToolbar, AppContainer, AppInput, AppButton, fontPadrao } from '../../themes/theme'; 
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Toast } from '../../themes/global/util';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment'
import UsuarioService from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

export function CadastroScreen () {

    //Cadastra o usuário
    const [calendario, setCalendario] = React.useState(false);
    const [erro, setErro] = React.useState<string|null>(null);
    const nav = useNavigation()

    const cadastrar = async (dados: Usuario, {resetForm}) => {
        setErro(null);
        const resposta = await UsuarioService.cadastrar(dados);
        if (resposta.sucesso) {
            resetForm({});
            Toast("Usuário cadastrado com sucesso")
            nav.navigate('login')
        } else {
            setErro(String(resposta.erro))
        }
    }

    const usuario: Usuario = {};
    //View
    return (
      <AppMain horizontalAlign="stretch">
        <AppToolbar titulo="Cadastro" backButton/>

        <AppContainer horizontalAlign="stretch" verticalAlign="flex-start">
 
            <Formik
                //Dados iniciais 
                initialValues={usuario}
                // Validação de formulário
                validationSchema={Yup.object().shape({
                    nome: Yup.string().required('Nome obrigatório'),
                    email: Yup.string().required('Email obrigatório').email('Email inválido').required('Email obrigatório'),
                    senha: Yup.string().required('Senha obrigatória').min(6, 'Pelo menos 6 caractetes'),
                    data_nascimento: Yup.string().required('Data de nascimento obrigatório')
                })}
                //Envio
                onSubmit={cadastrar}
            >
                {({errors, values, setFieldValue,  handleBlur, handleChange, handleSubmit, touched, isSubmitting}) => (
                    <View style={style.formulario}>
                        <Text style={[style.titulo, fontPadrao.negrito]}>Cadastro de Paciente</Text>

                        {/* NOME */}
                        <AppInput titulo="Nome" touched={touched.nome} error={errors.nome}>
                            <TextInput 
                                placeholder="Digite seu nome"
                                onBlur={handleBlur('nome')} 
                                onChangeText={handleChange('nome')} />
                        </AppInput>
                        {/* EMAIL */}
                        <AppInput titulo="Email" touched={touched.email} error={errors.email}>
                            <TextInput 
                                keyboardType="email-address"
                                placeholder="Digite seu Email"
                                onBlur={handleBlur('email')} 
                                onChangeText={handleChange('email')} />
                        </AppInput>

                        {/* DATA DE NASCIMENTO */}
                        <AppInput titulo="Data de Nascimento" 
                            touched={touched.data_nascimento} 
                            error={errors.data_nascimento} 
                        >
                            <TouchableOpacity onPress={() => setCalendario(true)}>
                              <Text>{values.data_nascimento != undefined ? moment(values.data_nascimento).format('DD/MM/YYYY') : 'Clique para selecionar data'}</Text>
                            </TouchableOpacity>
                          </AppInput>
                          {calendario && 
                              <DateTimePicker 
                                value={new Date()}
                                mode="date"
                                onChange={(event, data) => {
                                  setCalendario(false);
                                  setFieldValue('data_nascimento', moment(data).format('YYYY-MM-DD'))
                                }}
                              />
                          }

                        {/* SENHA */}
                        <AppInput titulo="Senha" touched={touched.senha} error={errors.senha} noBorder>
                            <TextInput 
                                placeholder="Digite sua senha"
                                secureTextEntry
                                onBlur={handleBlur('senha')} 
                                onChangeText={handleChange('senha')} />
                        </AppInput>
                        {/* Botão */}
                        { erro && <Text style={style.erro}>{erro}</Text>}
                        { isSubmitting && <ActivityIndicator />}
                        { !isSubmitting && <AppButton title="Cadastrar" onPress={handleSubmit}/>}

                    </View>
                )}
            </Formik>
        </AppContainer>
      </AppMain>
    );
}

const style = StyleSheet.create({
    formulario: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(200, 200, 200, 0.5)'
    },
    imgBG: { width:'100%', height:'100%', elevation:-1, position: 'absolute'},
    titulo: { textAlign: "center", fontSize: 20},
    erro: { textAlign: 'center', color: 'red', textTransform: 'uppercase', fontSize: 20}
})

