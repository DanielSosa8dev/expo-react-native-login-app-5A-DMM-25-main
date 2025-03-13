import { SafeAreaView, StyleSheet } from 'react-native';
import StackNavigator from './navigation/StackNavigator';

export default App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StackNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

});
