import * as React from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { AppMain, AppHeader, AppContainer, AppInput, AppButton, AppCalendario } from '../../themes/theme'; 
import * as Colors from '../../themes/colors'; 
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Usuario } from '../../models/usuario';
import { Toast } from '../../themes/global/util';
import UsuarioService from '../../services/usuario.service';
import { useUsuarioContext } from '../../context/usuario.context';

export function ConfiguracoesScreen () {

    //Editar Perfil
    const { usuario, saveUsuario } = useUsuarioContext();
    const [erro, setErro] = React.useState<undefined|string>(undefined);
    const editarPerfil = async (dados: Usuario) => {
      setErro(undefined);
      const resposta = await UsuarioService.editar(dados);
      if (resposta.sucesso) {
        Toast('Atualizado com sucesso');
        saveUsuario(dados);
      }
      else setErro(resposta.erro)
    }

    return (
      <AppMain>
        <AppHeader titulo="Configurações" posicao="center"/>
        <AppContainer verticalAlign="flex-start">
            {/* PERFIL */}
            <Formik
                  //Dados iniciais 
                  initialValues={usuario}
                  // Validação de formulário
                  validationSchema={Yup.object().shape({
                      nome: Yup.string().required('Nome obrigatório'),
                      email: Yup.string().required('Email obrigatório').email('Email inválido').required('Email obrigatório'),
                      senha: Yup.string().min(6, 'A nova senha deve possui pelo menos 6 caracteres'),
                      data_nascimento: Yup.string().required('Data de Nascimento é obrigatório')
                  })}
                  //Envio
                  onSubmit={editarPerfil}
              >
              {({errors, values, setFieldValue, handleBlur, handleChange, handleSubmit, touched, isSubmitting}) => (
                  <View style={style.formulario}>
                      <Text style={style.titulo}>Editar Perfil</Text>

                      {/* NOME */}
                      <AppInput titulo="Nome" touched={touched.nome} error={errors.nome}>
                          <TextInput 
                              value={values.nome}
                              placeholder="Digite seu nome"
                              onBlur={handleBlur('nome')} 
                              onChangeText={handleChange('nome')} />
                      </AppInput>
                      {/* EMAIL */}
                      <AppInput titulo="Email" touched={touched.email} error={errors.email}>
                          <TextInput 
                              value={values.email}
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
                        <AppCalendario
                          valor={values.data_nascimento} onChange={(data) => {
                            setFieldValue('data_nascimento', data)
                          }}
                        />
                      </AppInput>

                       {/* SENHA */}
                       <AppInput titulo="Nova Senha" touched={touched.senha} error={errors.senha} noBorder>
                          <TextInput 
                              placeholder="Nova senha"
                              secureTextEntry
                              onBlur={handleBlur('senha')} 
                              onChangeText={handleChange('senha')} />
                          <Text style={style.dica}>Digite uma nova senha caso deseje trocar, {"\n"} senão deixe em branco</Text>
                      </AppInput>

                    
                      {/* Botão */}
                      { !isSubmitting && <AppButton title="Atualizar Dados" onPress={handleSubmit}/>}
                      { erro && <Text style={style.erro}>{erro}</Text>}
                      { isSubmitting && <ActivityIndicator size={30} color={Colors.PRIMARY} />}

                  </View>
                )}
            </Formik>
        </AppContainer>
      </AppMain>
    );
}

const style = StyleSheet.create({
  formulario: { width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 20},
  erro: { textAlign: 'center', color: 'red'},
  titulo: {textAlign: 'center', fontSize: 20},
  dica: { textAlign: 'right', fontSize: 10}
})