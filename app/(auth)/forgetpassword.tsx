// import React, { useState } from 'react';
// import {
//   Alert,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// export default function ForgotPasswordScreen({ navigation }:any) {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false);

//   const handleResetPassword = async () => {
//     // Validation
//     if (!email) {
//       Alert.alert('Error', 'Please enter your email address');
//       return;
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('YOUR_BACKEND_URL/api/auth/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setEmailSent(true);
//         Alert.alert(
//           'Success', 
//           'Password reset link has been sent to your email address'
//         );
//       } else {
//         Alert.alert('Error', data.message || 'Something went wrong');
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
//             Forgot Password?
//           </Text>
//           <Text className="text-base text-gray-500">
//             {emailSent 
//               ? 'Check your email for reset instructions'
//               : 'Enter your email to receive a password reset link'
//             }
//           </Text>
//         </View>

//         {!emailSent ? (
//           <>
//             {/* Email */}
//             <View className="mb-6">
//               <Text className="text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </Text>
//               <TextInput
//                 className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base"
//                 placeholder="john@example.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </View>

//             {/* Reset Password Button */}
//             <TouchableOpacity
//               className={`rounded-xl py-4 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
//               onPress={handleResetPassword}
//               disabled={loading}
//             >
//               <Text className="text-white text-center text-base font-semibold">
//                 {loading ? 'Sending...' : 'Send Reset Link'}
//               </Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
//             <Text className="text-green-800 text-sm text-center">
//               We've sent a password reset link to{' '}
//               <Text className="font-semibold">{email}</Text>
//               {'\n\n'}
//               Please check your inbox and follow the instructions.
//             </Text>
//           </View>
//         )}

//         {/* Back to Login Link */}
//         <View className="flex-row justify-center mt-6">
//           <Text className="text-gray-600 text-sm">
//             Remember your password?{' '}
//           </Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//             <Text className="text-blue-600 text-sm font-semibold">
//               Sign In
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Resend Email (only shown after email sent) */}
//         {emailSent && (
//           <View className="flex-row justify-center mt-4">
//             <Text className="text-gray-600 text-sm">
//               Didn't receive the email?{' '}
//             </Text>
//             <TouchableOpacity onPress={handleResetPassword}>
//               <Text className="text-blue-600 text-sm font-semibold">
//                 Resend
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

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


export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    // Validation
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://192.168.1.3:8081', // You can customize this
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setEmailSent(true);
        Alert.alert(
          'Success', 
          'Password reset link has been sent to your email address'
        );
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
            Forgot Password?
          </Text>
          <Text className="text-base text-gray-500">
            {emailSent 
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive a password reset link'
            }
          </Text>
        </View>

        {!emailSent ? (
          <>
            {/* Email */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Email
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base"
                placeholder="john@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Reset Password Button */}
            <TouchableOpacity
              className={`rounded-xl py-4 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Text className="text-white text-center text-base font-semibold">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <Text className="text-green-800 text-sm text-center">
              We've sent a password reset link to{' '}
              <Text className="font-semibold">{email}</Text>
              {'\n\n'}
              Please check your inbox and follow the instructions.
            </Text>
          </View>
        )}

        {/* Back to Login Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 text-sm">
            Remember your password?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/Login')}>
            <Text className="text-blue-600 text-sm font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Resend Email (only shown after email sent) */}
        {emailSent && (
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600 text-sm">
              Didn't receive the email?{' '}
            </Text>
            <TouchableOpacity onPress={handleResetPassword}>
              <Text className="text-blue-600 text-sm font-semibold">
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}