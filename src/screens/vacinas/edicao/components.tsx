import { Formik } from 'formik';
import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { AppMain, AppInput, AppButton, AppCalendario } from '../../../themes/theme'; 
import * as Yup from 'yup';
import { useTipoVacina, Vacina } from '../../../models/vacina';
import RNPickerSelect from 'react-native-picker-select';
import * as Colors from './../../../themes/colors';
import VacinaService from '../../../services/vacina.service';
import { Toast } from '../../../themes/global/util';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import moment from 'moment';

export interface FormularioProps {
  vacina: Vacina;
}

export function Formulario (props: FormularioProps) {

    const [ erro, setErro ] = React.useState<null|string|undefined>(null);
    const nav = useNavigation();
    const { vacina } = props;
    
    const salvar = async (vacina: Vacina) => {
      setErro(null);

      //Realiza a operação
      const resposta = (vacina?.id ? await VacinaService.editar(vacina) : await VacinaService.cadastrar(vacina))
      
      const lembreteSintomas = (dias: number) => {
        Notifications.scheduleNotificationAsync({
          content: {
            title: `Sentiu algum sintoma da vacina?`,
            body: `Caso tenha sentido algum sintoma da vacina - ${useTipoVacina(vacina)}, lembre-se de informar no aplicativo na seção de sintomas`
          }, trigger: { seconds: (60 * 60 * 24 * dias) }
        })
      }

      if (resposta.sucesso && vacina.id == undefined) {

        //Criando notificação da próxima dose
        if (vacina.dose1_proxima_dose) {
          const hoje = moment();
          const proximaDose = moment(vacina.dose1_proxima_dose, 'YYYY-MM-DD');
          Notifications.scheduleNotificationAsync({
            content: {
              title: `Segunda dose da vacina`,
              body: `Lembrete da sua segunda dose da vacina - ${useTipoVacina(vacina)}`
            }, trigger: { seconds: proximaDose.diff(hoje, 'seconds')}
          })
        }

        //Lembre te de sintomas
        lembreteSintomas(1); //1 dias
        lembreteSintomas(8); //5 dias
        lembreteSintomas(15); //15 dias
        lembreteSintomas(30); //30 dias

        //VOltando para página anterior
        Toast('Operação realizada com sucesso')
        nav.navigate('listar');
      } else 
        setErro(resposta.erro);
    }

    return (        
        <Formik
            //Dados iniciais 
            initialValues={vacina}
            enableReinitialize
            // Validação de formulário
            validationSchema={Yup.object().shape({
                tipo: Yup.number().required('Selecione o tipo da vacina'),
                outro: Yup.string().nullable().when("tipo", {
                  is: 5,
                  then: Yup.string().required('Informe o nome da vacina').nullable()
                }),
                dose1_data: Yup.string().required('Data da 1º dose obrigatória')
            })}
            //Envio
            onSubmit={salvar}
        >
            {({errors, values, handleBlur, handleChange, handleSubmit, touched, isSubmitting, setFieldValue}) => (
              
                <View style={stylesForm.container}>

                    {/*========== VACINA ==========*/}
                    <Text style={stylesForm.titulo}>Vacina</Text>

                    {/* TIPO */}
                    <AppInput titulo="Tipo de Vacina" touched={touched.tipo} error={errors.tipo} noBorder={values.tipo != 5}>
                    <RNPickerSelect
                          items={[
                            {label:'Astrazeneca (Fiocruz)', value: 1},
                            {label:'Coronavac (Butantan)', value: 2},
                            {label:'Peizer', value: 3},
                            {label:'Moderna', value: 4},
                            {label:'Outra', value: 5},
                          ]}
                          value={(values.tipo ? values.tipo : 1)}
                          placeholder={{}}
                          style={{viewContainer:{marginBottom: 10, marginTop: -10}, inputAndroid: {color: 'black'}}}
                          onValueChange={(value) => {
                            setFieldValue('tipo', value)
                            handleBlur('tipo')
                          }}
                       />
                    </AppInput>

                    {/* OUTRO */}
                    { values.tipo == 5 &&
                    <AppInput titulo="Outra" touched={touched.outro} error={errors.outro} noBorder>
                        <TextInput 
                            value={values.outro ? values.outro : ''}
                            placeholder="Digite o nome da vacina"
                            onBlur={handleBlur('outro')} 
                            onChangeText={handleChange('outro')} />
                    </AppInput>}

                    <View style={stylesForm.hr}/>
                    {/* ========== DOSE 1 ======== */}
                    <Text style={stylesForm.titulo}>Dose 1</Text>
                    {/* DATA */}
                    <AppInput titulo="Data" touched error={errors.dose1_data}>
                        <AppCalendario
                          valor={values.dose1_data} onChange={(data) => {
                            setFieldValue('dose1_data', data)
                          }}
                        />
                    </AppInput>
                    
                    {/* LOTE */}
                    <AppInput titulo="Lote" touched={touched.dose1_lote} error={errors.dose1_lote}>
                        <TextInput 
                            keyboardType="decimal-pad"
                            value={values.dose1_lote ? String(values.dose1_lote) : ''}
                            placeholder="Digite o lote"
                            onBlur={handleBlur('dose1_lote')} 
                            onChangeText={handleChange('dose1_lote')} />
                    </AppInput>

                    {/* PROXIMA DOSE */}
                    <AppInput titulo="Próxima Dose" touched error={errors.dose1_proxima_dose} noBorder>
                      <AppCalendario
                            valor={values.dose1_proxima_dose} onChange={(data) => {
                              setFieldValue('dose1_proxima_dose', data)
                            }}
                          />
                    </AppInput>

                    <View style={stylesForm.hr}/>
                    {/* ========== DOSE 2 ======== */}
                    <Text style={stylesForm.titulo}>Dose 2</Text>
                    {/* DATA */}
                    <AppInput titulo="Data" touched error={errors.dose2_data}>
                        <AppCalendario
                          valor={values.dose2_data} onChange={(data) => {
                            setFieldValue('dose2_data', data)
                          }}
                        />
                    </AppInput>
                    
                    {/* LOTE */}
                    <AppInput titulo="Lote" touched={touched.dose2_lote} error={errors.dose2_lote} noBorder>
                        <TextInput 
                            keyboardType="decimal-pad"
                            value={values.dose2_lote ? String(values.dose2_lote) : ''}
                            placeholder="Digite o lote"
                            onBlur={handleBlur('dose2_lote')} 
                            onChangeText={handleChange('dose2_lote')} />
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