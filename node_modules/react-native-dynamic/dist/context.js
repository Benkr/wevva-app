import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
export const ColorSchemeContext = createContext(null);
ColorSchemeContext.displayName = 'ColorSchemeContext';
export const DarkModeContext = ColorSchemeContext;
export function ColorSchemeProvider({ children, mode }) {
    const currentMode = useColorScheme();
    return React.createElement(ColorSchemeContext.Provider, { value: mode || currentMode || 'light' }, children);
}
export const DarkModeProvider = ColorSchemeProvider;
export function useColorSchemeContext() {
    const context = useContext(ColorSchemeContext);
    if (context)
        return context;
    return useColorScheme() || 'light';
}
export const useDarkModeContext = useColorSchemeContext;
//# sourceMappingURL=context.js.map