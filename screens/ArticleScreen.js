import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFetch } from '../hooks/useFetch';

export function ArticleScreen({ navigation }) {
  const [itemName, setItemName] = useState({ value: '', error: '' });
  const [itemDescription, setItemDescription] = useState({ value: '', error: '' });
  const [itemType, setItemType] = useState(null);
  const [itemState, setItemState] = useState(null);
  const [location, setLocation] = useState(null);
  const [isItemTypeSelected, setIsItemTypeSelected] = useState(false);
  const [isItemStateSelected, setIsItemStateSelected] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

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
    { title: 'Almacen' },
    { title: 'Recepción' },
  ];

  const { getData, setData } = useFetch();

  const onAddArticlePressed = async () => {
    const nameError = nameValidator(itemName.value);
    const descriptionError = nameValidator(itemDescription.value);
    if (nameError || descriptionError) {
      setItemName({ ...itemName, error: nameError });
      setItemDescription({ ...itemDescription, error: descriptionError });
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
      <SelectDropdown
        data={itemTypes}
        onSelect={(selectedItem) => {
          setItemType(selectedItem);
          setIsItemTypeSelected(true); 
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              style={[
                styles.dropdownButtonStyle,
                isItemTypeSelected && styles.dropdownButtonSelectedStyle,
              ]}
            >
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Seleccionar tipo de artículo'}
              </Text>
              <Ionicons
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="black"
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <SelectDropdown
        data={itemStates}
        onSelect={(selectedItem) => {
          setItemState(selectedItem);
          setIsItemStateSelected(true); 
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              style={[
                styles.dropdownButtonStyle,
                isItemStateSelected && styles.dropdownButtonSelectedStyle, 
              ]}
            >
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Seleccionar estado del artículo'}
              </Text>
              <Ionicons
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="black"
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <SelectDropdown
        data={locations}
        onSelect={(selectedItem) => {
          setLocation(selectedItem);
          setIsLocationSelected(true); 
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              style={[
                styles.dropdownButtonStyle,
                isLocationSelected && styles.dropdownButtonSelectedStyle, 
              ]}
            >
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Seleccionar ubicación'}
              </Text>
              <Ionicons
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="black"
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <Button
        mode="contained"
        onPress={onAddArticlePressed}
        style={{ marginTop: 24 }}
      >
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
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  dropdownButtonSelectedStyle: {
    backgroundColor: theme.colors.surface, 
    borderColor: theme.colors.primary, 
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 24,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#151E26',
  },
});