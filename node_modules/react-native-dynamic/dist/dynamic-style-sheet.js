import { StyleSheet } from 'react-native';
import { DynamicValue, useDynamicValue } from './dynamic-value';
function parseStylesFor(styles, mode) {
    const newStyles = {};
    let containsDynamicValues = false;
    for (const i in styles) {
        const style = styles[i];
        const newStyle = {};
        for (const i in style) {
            const value = style[i];
            if (value instanceof DynamicValue) {
                containsDynamicValues = true;
                newStyle[i] = value[mode];
            }
            else {
                newStyle[i] = value;
            }
        }
        newStyles[i] = newStyle;
    }
    if (!containsDynamicValues && process.env.NODE_ENV !== 'production') {
        console.warn('A DynamicStyleSheet was used without any DynamicValues. Consider replacing with a regular StyleSheet.');
    }
    return newStyles;
}
export class DynamicStyleSheet {
    constructor(styles) {
        this.dark = StyleSheet.create(parseStylesFor(styles, 'dark'));
        this.light = StyleSheet.create(parseStylesFor(styles, 'light'));
    }
}
export const useDynamicStyleSheet = useDynamicValue;
//# sourceMappingURL=dynamic-style-sheet.js.map