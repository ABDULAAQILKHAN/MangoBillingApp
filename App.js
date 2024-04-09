// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import CreateBill from "./Screens/CreateBill";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Add Item" component={CreateBill} />
      </Stack.Navigator>
    </NavigationContainer>
  );

//java -jar bundletool-all-1.15.6.jar build-apks --bundle=app.aab --output=invoice.apks --mode=universal

//java -jar bundletool-all-1.15.6.jar build-apks --bundle=app2.aab --output=invoice.apks --overwrite --mode=universal --ks=my-upload-key.keystore --ks-pass=pass:123456789 --ks-key-alias=my-key-alias --key-pass=pass:123456789
}
