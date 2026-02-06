import { Stack } from "expo-router"

const _Homelayout = () => {
  return (
   <Stack screenOptions={{headerShown:false}}>
   <Stack.Screen name="home" />
</Stack>
  )
}

export default _Homelayout