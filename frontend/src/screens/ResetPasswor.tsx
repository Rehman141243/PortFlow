import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import InputFeild from '../Components/UI/TextFeild';
import Button from '../Components/UI/Button';

const ResetPasswordScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ensure session exists (opened via email link)
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        Alert.alert(
          'Invalid Link',
          'This password reset link is invalid or expired.'
        );
      }
    });
  }, []);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert(
      'Success',
      'Password updated successfully. Please log in again.'
    );

    await supabase.auth.signOut();
  };

  return (
    <View className="flex-1 justify-center bg-white px-5">
      <Text className="mb-2 text-2xl font-bold text-black">
        Reset Password
      </Text>

      <Text className="mb-6 text-sm text-gray-500">
        Enter your new password below.
      </Text>

      <InputFeild
        label="New Password"
        placeholder="Enter new password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <InputFeild
        label="Confirm Password"
        placeholder="Confirm new password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        title="Update Password"
        loading={loading}
        onPress={handleResetPassword}
      />
    </View>
  );
};

export default ResetPasswordScreen;
