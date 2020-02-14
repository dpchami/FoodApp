import React,{ Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store,{ persistor } from '../store';
import AppRouter from './router';
import LoadPage from './components/LoadPage';

class App extends Component {
    
    render(){
        return(
            <Provider store={store}>
                <PersistGate loading={<LoadPage />} persistor={persistor}>
                    <AppRouter/>
                </PersistGate>
            </Provider>
        );
    }
} 
export default App;