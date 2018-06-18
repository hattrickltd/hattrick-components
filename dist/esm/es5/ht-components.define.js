// HtComponents: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './ht-components.core.js';
import {
  Avatar,
  Bar,
  Flip,
  ProgressArc,
  ProgressArc,
  Timer,
  Tooltip
} from './ht-components.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    Avatar,
    Bar,
    Flip,
    ProgressArc,
    ProgressArc,
    Timer,
    Tooltip
  ], opts);
}