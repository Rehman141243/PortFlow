import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { supabase } from '../config/supabase';


export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            
            full_name: formData.fullName,
          },
  
            emailRedirectTo: 'exp://192.168.1.3:8081/',
        
        },
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          'Success', 
          'Account created successfully! Please check your email to verify your account.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(auth)/Login')
            }
          ]
        );
        setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-20 pb-8">
        {/* Header */}
        <View className="mb-10">
          <Text className="text-4xl font-bold text-gray-800 mb-2">
            Create Account
          </Text>
          <Text className="text-base text-gray-500">
            Sign up to get started
          </Text>
        </View>

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Full Name
          </Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base"
            placeholder="John Doe"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Email
          </Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base"
            placeholder="john@example.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Password
          </Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />
        </View>

        {/* Confirm Password */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className={`rounded-xl py-4 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="text-white text-center text-base font-semibold">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 text-sm">
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/Login')}>
            <Text className="text-blue-600 text-sm font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}