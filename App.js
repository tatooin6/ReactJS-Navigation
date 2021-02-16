import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Logo = () => <Text>Nombre Empresa</Text>

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

HomeScreen.navigationOptions = {
  // title:  'Pantalla Home',
  headerTitle: () => <Logo />,
  // boton superior derecho
  /*headerRight: () => 
    <Button 
      onPress={ () => alert('Lalaland') }
      title="Soy un headButton"
      color="#222"
    />
  ,*/
  headerStyle: {
      backgroundColor: '#cef'
    },
}

const DetalleScreen = ({ navigation }) => {
  const [cont, setCont] = useState(0);
  const incrementar = () => setCont(cont + 1);
  // cuando se renderice esta aplicacion se va a llamar al metodo incrementar
  useEffect( () => {
    navigation.setParams({ incrementar });
  }, [cont]);
  // Funcion que busca dentro del objeto que se manda al componente por el .navigate 
  const lala = navigation.getParam('lala', 'valor por defecto');
  return (
    <View>
      <Text> Soy la pantalla de Detalle de {lala} y contador esta en {cont}!</Text>
      <Button 
	style={ styles.button }
	title="Volver"
	onPress={ () => navigation.goBack() }
      />
      <Button 
	style={ styles.button }
	title="Cambiar Titulo"
	onPress={ () => { 
	    console.log(navigation)
	    navigation.setParams({ title: 'Usuario ' + navigation.state.params.userId }) 
	  
	}}
      />
      <Button 
	style={ styles.button }
	title="Lazar Modal pantalla entera"	
	onPress={ () => navigation.navigate("MiModal") }
      />
    </View>  
  )
}

// con navigationOptions se acceden a las propiedades del defaultNavigationOptions definida en el createStackNavigator
DetalleScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  return {
    title: navigation.getParam('title', 'Cargando...'),
    headerRight: () => 
      <Button 
	onPress={ navigation.getParam('incrementar') }
	title="+ 1"
	color="#555"
      />
    ,
    headerStyle: {
      backgroundColor: navigationOptions.headerStyle.backgroundColor
    }
  }
}

// recibe objeto de configuracion que son las pantallas sobre las que se navegara 
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Detalle: {
    screen: DetalleScreen,
  }
}, { 
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#ecf'
    },
    headerTintColor: '#555',
    headerTitleStyle: {
      fontWeight: 'normal',
    }
  }
})

// Pantalla principal que contiene el conetenedor de pantallas y un modal que se muestra desde otras pantallas
const RootStack = createStackNavigator({
  Main: AppNavigator,
  MiModal: () => <Text>Lalalandia</Text>,
}, {
  mode: 'modal',
  headerMode: 'none',
})

// Es un componente que recibe otro componente que tiene que ser de navegacion
export default createAppContainer(RootStack)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 70,
    backgroundColor: 'green',
    color: 'red',
  },
});
