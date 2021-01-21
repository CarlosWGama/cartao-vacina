import { ToastAndroid, Platform } from "react-native"

/**Exibe um Toast */
export const Toast = (mensagem:string) => {
    switch(Platform.OS) {
        case "android": ToastAndroid.show(mensagem, 2000); break;
        case "web": alert(mensagem); break;
        default: console.log(mensagem);
    }
} 