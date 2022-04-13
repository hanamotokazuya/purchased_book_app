"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pc = exports.tab = exports.sp = void 0;
const styled_components_1 = require("styled-components");
const sp = (first, ...interpolations) => (0, styled_components_1.css) `
  @media (max-width: 560px) {
    ${(0, styled_components_1.css)(first, ...interpolations)}
  }
`;
exports.sp = sp;
const tab = (first, ...interpolations) => (0, styled_components_1.css) `
  @media (min-width: 561px) and (max-width: 1024px) {
    ${(0, styled_components_1.css)(first, ...interpolations)}
  }
`;
exports.tab = tab;
const pc = (first, ...interpolations) => (0, styled_components_1.css) `
  @media (min-width: 1025px) {
    ${(0, styled_components_1.css)(first, ...interpolations)}
  }
`;
exports.pc = pc;
