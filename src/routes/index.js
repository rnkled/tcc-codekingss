import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './login.stack.routes'
const Routes = ({ initialRoute }) => {
    return (
        <NavigationContainer>
            <StackRoutes routeInitial={initialRoute} />
        </NavigationContainer>)
}

export default Routes;
