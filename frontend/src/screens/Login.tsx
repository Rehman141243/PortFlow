import { View } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import InputFeild from '../Components/UI/TextFeild';
import Button from '../Components/UI/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      console.log(error.message);
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white">
      <InputFeild
        label="Email"
        placeholder="Enter email"
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

      <Button
        title="Login"
        loading={loading}
        onPress={handleLogin}
      />
    </View>
  );
}
