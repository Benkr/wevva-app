import { useColorSchemeContext } from './context';
export class DynamicValue {
    constructor(light, dark) {
        this.light = light;
        this.dark = dark;
    }
}
export function useDynamicValue(light, dark) {
    const mode = useColorSchemeContext();
    if (arguments.length > 1) {
        return mode === 'dark' ? dark : light;
    }
    else {
        return light[mode];
    }
}
//# sourceMappingURL=dynamic-value.js.map