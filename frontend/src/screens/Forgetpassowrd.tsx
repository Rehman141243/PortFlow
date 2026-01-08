import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import InputFeild from '../Components/UI/TextFeild';
import Button from '../Components/UI/Button';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'myapp://reset-password',
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert(
      'Success',
      'Password reset email sent. Please check your inbox.'
    );
  };

  return (
    <View className="flex-1 justify-center bg-white px-5">
      <Text className="mb-2 text-2xl font-bold text-black">
        Forgot Password
      </Text>

      <Text className="mb-6 text-sm text-gray-500">
        Enter your registered email address. We’ll send you a password reset link.
      </Text>

      <InputFeild
        label="Email"
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Button
        title="Send Reset Link"
        loading={loading}
        onPress={handlePasswordReset}
      />
    </View>
  );
};

export default ForgotPasswordScreen;
