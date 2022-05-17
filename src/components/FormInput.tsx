import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

const FormInput = (props: any) => {
  return (
    <View>
      <TextInput
        {...props}
        value={props.input.value}
        onChangeText={props.input.onChange}
        onFocus={props.input.onFocus}
        onBlur={props.input.onBlur}
        style={styles.textInputForm}
        placeholder={props.label}
        defaultValue="test"
      />
    </View>
  );
};
export default FormInput;

const styles = StyleSheet.create({
  textInputForm: {
    backgroundColor: '#bebebe60',
    marginBottom: 14,
    borderRadius: 10,
    marginVertical: 16,
    paddingHorizontal: 8,
  },
});
