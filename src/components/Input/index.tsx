import React, { useRef, useEffect } from 'react';
import { TextInputProps, TextInput as RNTextInput } from 'react-native';
import { useTheme } from 'styled-components';
import { useField } from '@unform/core';

import { TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
}

interface InputRefProps extends RNTextInput {
  value: string;
}

export const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const { colors } = useTheme();
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputRef = useRef<InputRefProps>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue: (ref: InputRefProps) => {
        ref.value = '';
        ref.clear();
      },
    });
  }, [registerField, fieldName]);

  return (
    <TextInput
      ref={inputRef}
      placeholderTextColor={colors.placeholder}
      defaultValue={defaultValue}
      isErrored={!!error}
      onChangeText={value => {
        if (inputRef.current) inputRef.current.value = value;
      }}
      {...rest}
    />
  );
};
