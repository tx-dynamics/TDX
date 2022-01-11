import * as React from 'react';
import { SafeAreaView } from 'react-native';
import MainNav from './Src/Navigation/MainNav';

import { Provider } from 'react-redux';
import { store, persistor } from './Src/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from 'react-native-popup-menu';


// console.disableYellowBox = true;
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <MenuProvider>
            <MainNav />
          </MenuProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;
