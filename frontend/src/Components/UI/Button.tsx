import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React from 'react';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
}) => {
  const baseStyle = 'h-12 rounded-lg items-center justify-center';
  const variants = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${(disabled || loading) && 'opacity-60'}
      `}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-white text-base font-semibold">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
