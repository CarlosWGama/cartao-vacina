import { Formik } from 'formik';
import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { AppMain, AppInput, AppButton, AppCalendario } from '../../../themes/theme'; 
import * as Yup from 'yup';
import { Sintoma, TiposSintomas } from '../../../models/sintoma';
import RNPickerSelect from 'react-native-picker-select';
import * as Colors from './../../../themes/colors';
import SintomaService from '../../../services/sintoma.service';
import { Toast } from '../../../themes/global/util';
import { useNavigation } from '@react-navigation/native';
import { useTipoVacina, Vacina } from '../../../models/vacina';
import VacinaService from '../../../services/vacina.service';

export interface FormularioProps {
  sintoma: Sintoma;
}

export function Formulario (props: FormularioProps) {

    const [ erro, setErro ] = React.useState<null|string|undefined>(null);
    const [ vacinas, setVacinas ] = React.useState<Vacina[]>([]);
    const [ sintomas, setSintomas ] = React.useState<{label:string, value:any}[]>([]);
    const nav = useNavigation(); 
    const { sintoma } = props;
    
    React.useEffect(() => {
        ( async () => {
            //Vacinas
            const vacinas = await VacinaService.buscar();
            setVacinas(vacinas);

            //Sintomas
            let sintomas:{label:string, value:any}[];
            sintomas = TiposSintomas.map(tipo => {return {label:tipo.tipo, value:tipo.id}})
            sintomas.push({label: 'Outros', value: -1})
            setSintomas(sintomas);

        })();
    }, []);


    const salvar = async (sintoma: Sintoma) => {
      setErro(null);
      //Realiza a operação
      const resposta = (sintoma?.id ? await SintomaService.editar(sintoma) : await SintomaService.cadastrar(sintoma))
      
      if (resposta.sucesso) {
        Toast('Operação realizada com sucesso')
        nav.navigate('listar');
      } else 
        setErro(resposta.erro);
    }

    return (        
        <Formik
            //Dados iniciais 
            initialValues={sintoma}
            enableReinitialize
            // Validação de formulário
            validationSchema={Yup.object().shape({
                tipo_id: Yup.number(),
                outro: Yup.string().nullable().when("tipo_id", {
                  is: -1,
                  then: Yup.string().required('Informe o nome do sintoma').nullable()
                }),
                data_ocorrencia: Yup.string().required('Data obrigatória')
            })}
            //Envio
            onSubmit={salvar}
        >
            {({errors, values, handleBlur, handleChange, handleSubmit, touched, isSubmitting, setFieldValue}) => (
              
                <View style={stylesForm.container}>

                    {/*========== SINTOMA ==========*/}
                    <Text style={stylesForm.titulo}>Sintoma</Text>

                    {/* VACINA */}
                    <AppInput titulo="Vácina" touched={touched.vacina_id} error={errors.vacina_id}>
                    <RNPickerSelect
                          items={vacinas.map(v => {return {label:useTipoVacina(v), value:v.id}})}
                          value={(values.vacina_id ? values.vacina_id : 1)}
                          placeholder={{}}
                          style={{viewContainer:{marginBottom: 10, marginTop: -10}, inputAndroid: {color: 'black'}}}
                          onValueChange={(value) => {
                            setFieldValue('vacina_id', value)
                            handleBlur('vacina_id')
                          }}
                       />
                    </AppInput>


                    {/* TIPO */}
                    <AppInput titulo="Tipo de Sintoma" touched={touched.tipo_id} error={errors.tipo_id}>
                    <RNPickerSelect
                          items={sintomas}
                          value={(values.tipo_id ? values.tipo_id : 1)}
                          placeholder={{}}
                          style={{viewContainer:{marginBottom: 10, marginTop: -10}, inputAndroid: {color: 'black'}}}
                          onValueChange={(value) => {
                            setFieldValue('tipo_id', value)
                            handleBlur('tipo_id')
                          }}
                       />
                    </AppInput>

                    {/* OUTRO */}
                    { values.tipo_id == -1 &&
                    <AppInput titulo="Outra" touched={touched.outro} error={errors.outro}>
                        <TextInput 
                            placeholder="Digite o nome da sintoma"
                            onBlur={handleBlur('outro')} 
                            onChangeText={handleChange('outro')} />
                    </AppInput>}

                    {/* DATA */}
                    <AppInput titulo="Data do Sintoma" touched error={errors.data_ocorrencia} noBorder>
                        <AppCalendario
                          valor={values.data_ocorrencia} onChange={(data) => {
                            setFieldValue('data_ocorrencia', data)
                          }}
                        />
                    </AppInput>
                    
                    {/* Botão */}
                    { erro && <Text style={stylesForm.erro}>{erro}</Text>}
                    { isSubmitting && <ActivityIndicator color={Colors.PRIMARY} size={20} />}
                    { !isSubmitting && <AppButton title="Salvar" onPress={handleSubmit}/>}

                </View>
            )}
        </Formik>
    );
}

const stylesForm = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(200, 200, 200, 0.3)',
      padding: 10,
      borderRadius: 5
    },
    titulo: { textAlign: 'center', fontSize: 20},
    erro: {},
    hr: {borderBottomWidth: 5, borderColor: Colors.PRIMARY }
});