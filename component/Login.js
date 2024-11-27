import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-web";
import {auth} from "../config/FireBase"
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const navigation = useNavigation();
    const [email,setEmail] = useState();
    const [pass,setPass] = useState();

    const handleLogin = async () => {
        console.log("email and pass:", email, pass)
        try{
        await signInWithEmailAndPassword(auth,email,pass);
        navigation.navigate("Home");
        }catch(errr)
        {
            alert("Login fail")
        }
        
    }

    return(
        <View style = {{backgroundColor:'gray',flex:1}} >
            <Text >Login</Text>
            <TextInput placeholder="email" value={email} onChangeText={text => setEmail(text)}/>
            <TextInput placeholder="passs" value={pass} onChangeText={text => setPass(text)}/>
            <Button onPress={() => handleLogin()} title="Login by email"/>
            <Button onPress={() => navigation.navigate("Signup")} title="Signup"/>
        </View>
    );
}

export default Login;