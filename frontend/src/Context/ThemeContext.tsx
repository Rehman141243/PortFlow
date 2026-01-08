import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { useColorScheme } from "nativewind";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const THEME_KEY = "APP_THEME";

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false);

  const { setColorScheme } = useColorScheme(); // 🔑 NativeWind

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
        setColorScheme(savedTheme); // 🔥 sync NativeWind
      }
      setReady(true);
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setColorScheme(newTheme); // 🔥 THIS enables `dark:` classes
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <View className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
