import { Stack } from "expo-router";
import '../../global.css';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="signup" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="forgetpassword" />
    </Stack>
  );
}
