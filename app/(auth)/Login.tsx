// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Alert,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// export default function LoginScreen({ navigation }:any) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     // Validation
//     if (!formData.email || !formData.password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('YOUR_BACKEND_URL/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', 'Logged in successfully!');
//         // Navigate to home screen or save token
//         // navigation.navigate('Home');
//       } else {
//         Alert.alert('Error', data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Network error. Please try again.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="flex-1 px-6 pt-20 pb-8">
//         {/* Header */}
//         <View className="mb-10">
//           <Text className="text-4xl font-bold text-gray-800 mb-2">
//             Welcome Back
//           </Text>
//           <Text className="text-base text-gray-500">
//             Sign in to continue
//           </Text>
//         </View>

//         {/* Email */}
//         <View className="mb-4">
//           <Text className="text-sm font-medium text-gray-700 mb-2">
//             Email
//           </Text>
//           <TextInput
//             className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base"
//             placeholder="john@example.com"
//             value={formData.email}
//             onChangeText={(text) => setFormData({ ...formData, email: text })}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         {/* Password */}
//         <View className="mb-2">
//           <Text className="text-sm font-medium text-gray-700 mb-2">
//             Password
//           </Text>
//           <TextInput
//             className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChangeText={(text) => setFormData({ ...formData, password: text })}
//             secureTextEntry
//           />
//         </View>

//         {/* Forgot Password Link */}
//         <TouchableOpacity 
//           className="mb-6"
//           onPress={() => router.push('/(auth)/forgetpassword') }
//         >
//           <Text className="text-blue-600 text-sm font-semibold text-right">
//             Forgot Password?
//           </Text>
//         </TouchableOpacity>

//         {/* Login Button */}
//         <TouchableOpacity
//           className={`rounded-xl py-4 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text className="text-white text-center text-base font-semibold">
//             {loading ? 'Signing In...' : 'Sign In'}
//           </Text>
//         </TouchableOpacity>

//         {/* Sign Up Link */}
//         <View className="flex-row justify-center mt-6">
//           <Text className="text-gray-600 text-sm">
//             Don't have an account?{' '}
//           </Text>
//           <TouchableOpacity onPress={() => router.push('/(home)/home')}>
//             <Text className="text-blue-600 text-sm font-semibold">
//               Sign Up
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }44


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


export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Logged in successfully!');
        // Navigate to home screen
        router.replace('/(home)/home');
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
            Welcome Back
          </Text>
          <Text className="text-base text-gray-500">
            Sign in to continue
          </Text>
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
        <View className="mb-2">
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

        {/* Forgot Password Link */}
        <TouchableOpacity 
          className="mb-6"
          onPress={() => router.push('/(auth)/forgetpassword')}
        >
          <Text className="text-blue-600 text-sm font-semibold text-right">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          className={`rounded-xl py-4 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-center text-base font-semibold">
            {loading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 text-sm">
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text className="text-blue-600 text-sm font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}