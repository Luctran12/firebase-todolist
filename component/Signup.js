import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../config/FireBase"
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const Signup = () => {

    const [email,setEmail] = useState();
    const [pass,setPass] = useState();

    const handleSignUp = async () => {
        console.log("email and pass:", email, pass)
        try{
        await createUserWithEmailAndPassword(auth,email,pass)
        }catch(err)
        {
            alert("email or password not correct")
        }
        
    }

    return(
        <View>
            <Text >Signup</Text>
            <TextInput placeholder="email" value={email} onChangeText={text => setEmail(text)}/>
            <TextInput placeholder="passs" value={pass} onChangeText={text => setPass(text)}/>
            <Button onPress={() => handleSignUp()} title="Sign up by email"/>
        </View>
    );
}

export default Signup;