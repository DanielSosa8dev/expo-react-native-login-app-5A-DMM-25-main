import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import CustomDropDownList from '../components/CustomDropDownList';
import { useFetch } from '../hooks/useFetch';

export function ArticleScreen({ navigation }) {
  const [itemName, setItemName] = useState({ value: '', error: '' });
  const [itemDescription, setItemDescription] = useState({ value: '', error: '' });
  const [itemType, setItemType] = useState(null);
  const [itemState, setItemState] = useState(null);
  const [location, setLocation] = useState(null);

  const itemTypes = [
    { title: 'Mobiliario de oficina' },
    { title: 'Equipo de cómputo' },
    { title: 'Otros' },
  ];

  const itemStates = [
    { title: 'Sin determinar' },
    { title: 'Mal estado' },
    { title: 'Regular' },
    { title: 'Buen estado' },
    { title: 'Excelente estado' },
  ];

  const locations = [
    { title: 'Almacén' },
    { title: 'Recepción' },
  ];

  const { getData, setData } = useFetch();

  const onAddArticlePressed = async () => {
    if (!itemName.value || !itemDescription.value) {
      setItemName({ ...itemName, error: 'El nombre es requerido' });
      setItemDescription({ ...itemDescription, error: 'La descripción es requerida' });
      return;
    }

    const newArticle = {
      name: itemName.value,
      description: itemDescription.value,
      type: itemType?.title || '',
      state: itemState?.title || '',
      location: location?.title || '',
    };

    const response = await setData('http://localhost:3000/api/articles/add', newArticle);
    if (response.error) return;

    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Agregar artículo</Header>
      <TextInput
        label="Nombre del artículo"
        returnKeyType="next"
        value={itemName.value}
        onChangeText={(text) => setItemName({ value: text, error: '' })}
        error={!!itemName.error}
        errorText={itemName.error}
      />
      <TextInput
        label="Descripción general"
        returnKeyType="next"
        value={itemDescription.value}
        onChangeText={(text) => setItemDescription({ value: text, error: '' })}
        error={!!itemDescription.error}
        errorText={itemDescription.error}
        multiline
      />
      <CustomDropDownList
        data={itemTypes}
        onSelect={setItemType}
        defaultMessage="Seleccionar tipo de artículo"
      />
      <CustomDropDownList
        data={itemStates}
        onSelect={setItemState}
        defaultMessage="Seleccionar estado del artículo"
      />
      <CustomDropDownList
        data={locations}
        onSelect={setLocation}
        defaultMessage="Seleccionar ubicación"
      />
      <Button mode="contained" onPress={onAddArticlePressed} style={{ marginTop: 24 }}>
        Agregar artículo
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
