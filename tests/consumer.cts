import * as api from '@lp-labs/css-fluid-scale';
import { fluidScale } from '@lp-labs/css-fluid-scale';
const scale = fluidScale({ minSize: 16, maxSize: 24, minViewport: 320, maxViewport: 1280 });
if (!scale.css.startsWith('clamp(')) throw new Error('Expected CSS clamp');
// @ts-expect-error invalid argument must be rejected by declarations
api.fluidScale({ minSize: 'large', maxSize: 16, minViewport: 320, maxViewport: 1280 });
