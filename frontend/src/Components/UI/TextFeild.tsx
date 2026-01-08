import { View, Text, TextInput, TextInputProps } from 'react-native';
import React from 'react';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const InputFeild: React.FC<AppInputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-1 text-sm text-gray-800">
          {label}
        </Text>
      )}

      <TextInput
        className={`
          h-12 rounded-lg border px-3 text-base text-black
          ${error ? 'border-danger' : 'border-gray-300'}
          ${className ?? ''}
        `}
        placeholderTextColor="#94A3B8"
        {...props}
      />

      {error && (
        <Text className="mt-1 text-xs text-danger">
          {error}
        </Text>
      )}
    </View>
  );
};

export default InputFeild;
