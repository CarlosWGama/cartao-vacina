import * as React from 'react';
import { View, Text, Image, Animated, Button, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { AppInput, AppButton, AppTextError, fontPadrao } from '../../themes/theme';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Colors from './../../themes/colors';
import UsuarioService from '../../services/usuario.service';
import { useNavigation } from '@react-navigation/native';
import { AppConfig } from '../../config/app';
import { useUsuarioContext } from './../../context/usuario.context';


export const Topo = () => (
    <Image source={require('./../../assets/imgs/topo.png')} resizeMode="stretch" style={{
        width: '100%',
        height:400,
        position: 'absolute',
        top: 0,
        left: 0,
        marginBottom:100
    }}/>
)


export const Formulario = () => {

    //Context
    const { usuario, saveUsuario } = useUsuarioContext();
    
    //Navigator
    const nav = useNavigation();

    //Validção do formulário
    const validation = Yup.object().shape({
        email: Yup.string().email('Email inválido').required('Email obrigatório'),
        senha: Yup.string().required('Senha obrigatória').min(4, 'Mínimo 4 caracteres')
    });

    //Botão de realizar o login
    const [erroLogin, setErroLogin] = React.useState(false);
    const logar = async (dados) => {
        setErroLogin(false);
        const resultado = await UsuarioService.login(dados.email, dados.senha)
        console.log(resultado)
        if (resultado.sucesso) {    
            saveUsuario(resultado.usuario)
            nav.navigate('app')
        }
        else setErroLogin(true);
    }
      
    return (
        <>
            {/* Formulário de Login */}
            <Formik
                validationSchema={validation}
                initialValues={{ email: '', senha: '' }}
                onSubmit={logar}>
                {({handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting}) => (
                    <View style={{backgroundColor:'white', borderRadius: 10, padding: 5, borderColor: 'rgba(0, 0, 0, 0.3)', borderWidth: 1}}>
                        <Text style={[{textAlign:'center', fontSize: 30, margin:10}, fontPadrao.negrito]}>{AppConfig.name}</Text>
                        
                        {erroLogin && <Text style={{color:'red', textAlign:'center'}}>EMAIL OU SENHA INCORRETA</Text>}

                        {/* EMAIL */}
                        <TextInput style={styleForm.input} placeholder="Digite seu E-mail" onChangeText={handleChange('email')} onBlur={handleBlur('email')} keyboardType="email-address" />
                        {errors.email && touched.email && <AppTextError>{errors.email}</AppTextError>}
                        {/* SENHA */}
                        <TextInput style={styleForm.input} placeholder="Digite sua senha" onChangeText={handleChange('senha')} onBlur={handleBlur('senha')} secureTextEntry/>
                        {errors.senha && touched.senha && <AppTextError>{errors.senha}</AppTextError>}
                        {/* BOTÃO */}

                        { !isSubmitting && <AppButton title="Logar" onPress={handleSubmit}/>}
                        { isSubmitting && <ActivityIndicator size={30} color={Colors.PRIMARY}/>}
                    </View>
                )} 
            </Formik>
            {/* Botão de cadastro */}
            <View style={{marginTop: 10, flexDirection: 'row', justifyContent:'center'}} >
                <AppButton title="Criar conta" color={Colors.TERTIARY} onPress={() => nav.navigate('cadastro')} style={{borderBottomEndRadius: 0, borderTopEndRadius: 0}}/>
                <AppButton title="Recuperar senha" color={Colors.LIGHT} onPress={() => nav.navigate('recuperar-senha')} style={{borderBottomStartRadius: 0, borderTopStartRadius: 0}} />
            </View>
        </>
    )
}


const styleForm = StyleSheet.create({
    input: { 
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        padding: 10,
        minWidth: 200
    }
})