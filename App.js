import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button 
	title="Ir a Detalle"
	// onPress={ () => navigation.push('Detalle') }
	onPress={ () => navigation.navigate('Detalle', { lala: 'lele', userId: 2, title: 'Usuario 1' }) }
      />
      <StatusBar style="auto" />
    </View>
  )
}

// a
HomeScreen.navigationOptions = {
  title:  'Pantalla Home' 
}

const DetalleScreen = ({ navigation }) => {
  // Funcion que busca dentro del objeto que se manda al componente por el .navigate 
  const lala = navigation.getParam('lala', 'valor por defecto');
  return (
    <View>
      <Text> Soy la pantalla de Detalle de {lala}!</Text>
      <Button 
	title="Volver"
	onPress={ () => navigation.goBack() }
      />
      <Button 
	title="Cambiar Titulo"
	onPress={ () => navigation.setParams({ title: 'Usuario 1' }) }
      />
    </View>  
  )
}

DetalleScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title', 'Cargando...')
  }
}
/*= {
  title: 'Pantalla Detalle'
}*/

// recibe objeto de configuracion que son las pantallas sobre las que se navegara 
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Detalle: {
    screen: DetalleScreen,
  }
}, { initialRouteName: 'Home' })

// Es un componente que recibe otro componente que tiene que ser de navegacion
export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
