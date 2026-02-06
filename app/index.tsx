import { Redirect } from 'expo-router';

const Index = () => {
  // Redirect to your auth flow or main app
  return <Redirect href="/(auth)/signup" />;
}

export default Index;