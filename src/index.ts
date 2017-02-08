/**
 * Created by jonathan on 29/01/2017.
 */

// 
// Read the re-export bit, should be quite simple, the require looses all type information
// https://www.typescriptlang.org/docs/handbook/modules.html
// https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/declaration%20files/Introduction.md
//  

// import * as component from './lib/component';

export const component = require('./lib/component');
export const configuration = require('./lib/configuration');
export const connector = require('./lib/connector');
export const core = require('./lib/component');
export const hub = require('./lib/hub');
export const mapping = require('./lib/mapping');
export const messaging = require('./lib/messaging');
export const parameter = require('./lib/parameter');