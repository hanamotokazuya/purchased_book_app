"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useInterval(callback, delay) {
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => callback(), delay);
        return () => clearInterval(interval);
    }, [callback, delay]);
}
exports.default = useInterval;
