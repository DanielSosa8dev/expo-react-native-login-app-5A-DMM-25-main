import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomDropDownList = ({
  data,
  onSelect,
  defaultMessage,
  fontSize = 16,
  fontColor = '#151E26',
  backgroundColor = '#E9ECEF',
  selectedBackgroundColor = '#D2D9DF',
  borderColor = '#E9ECEF',
}) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      renderButton={(selectedItem, isOpened) => (
        <View style={[styles.dropdownButton, { backgroundColor, borderColor }]}> 
          <Text style={[styles.dropdownButtonText, { fontSize, color: fontColor }]}>
            {selectedItem ? selectedItem.title : defaultMessage}
          </Text>
          <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} size={24} color={fontColor} />
        </View>
      )}
      renderItem={(item, index, isSelected) => (
        <View style={{ ...styles.dropdownItem, backgroundColor: isSelected ? selectedBackgroundColor : backgroundColor }}>
          <Text style={[styles.dropdownItemText, { fontSize, color: fontColor }]}>
            {item.title}
          </Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{ backgroundColor }}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
  },
  dropdownButtonText: {
    flex: 1,
    fontWeight: '500',
  },
  dropdownItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemText: {
    flex: 1,
    fontWeight: '500',
  },
});

export default CustomDropDownList;
