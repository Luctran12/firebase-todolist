import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Login from "./component/Login";
import Signup from "./component/Signup";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./component/Home";
import { Text, TouchableHighlight } from "react-native";

const App = () => {
  const Stack = createStackNavigator();
  
  return(
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;