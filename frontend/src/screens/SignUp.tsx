import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';


import { supabase } from '../config/supabase';
import Button from '../Components/UI/Button';
import InputFeild from '../Components/UI/TextFeild';

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Signup Failed', error.message);
      return;
    }

    Alert.alert(
      'Success',
      'Account created successfully. Please check your email for verification.'
    );
  };

  return (
    <View className="flex-1 justify-center bg-white px-5">
      <Text className="mb-6 text-2xl font-bold text-black">
        Create Account
      </Text>

      <InputFeild
        label="Email"
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <InputFeild
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <InputFeild
        label="Confirm Password"
        placeholder="Re-enter password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        title="Sign Up"
        loading={loading}
        onPress={handleSignup}
      />
    </View>
  );
};

export default SignupScreen;
