import React, { ReactNode } from 'react';
import { Mode } from './types';
export declare const ColorSchemeContext: React.Context<import("react-native").ColorSchemeName>;
export declare const DarkModeContext: React.Context<import("react-native").ColorSchemeName>;
interface IProps {
    mode?: Mode;
    children: ReactNode;
}
export declare function ColorSchemeProvider({ children, mode }: IProps): JSX.Element;
export declare const DarkModeProvider: typeof ColorSchemeProvider;
export declare function useColorSchemeContext(): Mode;
export declare const useDarkModeContext: typeof useColorSchemeContext;
export {};
