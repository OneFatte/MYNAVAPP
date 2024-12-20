import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Router from "./src/routes/Router";

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Router> </Router>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
