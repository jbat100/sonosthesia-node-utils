"use strict";
require("mocha");
const component_1 = require("../lib/component");
const chai_1 = require("chai");
describe('Components', () => {
    describe('Info parsing', () => {
        const validParameterInfo = {
            identifier: "valid-parameter",
            defaultValue: 0.0,
            range: { min: 0.0, max: 1.0 }
        };
        const invalidParameterInfo = {
            identifier: "valid-parameter"
        };
        const emptyChannelInfo = {
            identifier: "empty-channel",
            flow: 'Emitter',
            type: 'Control',
            parameters: []
        };
        const validChannelInfo = {
            identifier: "valid-channel",
            flow: 'Emitter',
            type: 'Control',
            parameters: [validParameterInfo]
        };
        const invalidChannelInfo = {
            identifier: "valid-channel",
            flow: 'Unrecognized',
            type: 'Control',
            parameters: [validParameterInfo]
        };
        it('should initialise empty component', () => {
            const info = component_1.ComponentInfo.newFromJSON({
                identifier: "boo",
                channels: []
            });
            chai_1.expect(info.identifier).to.equal('boo');
            chai_1.expect(info.channels).to.be.empty;
        });
        it('should initialise component with valid channel', () => {
            const info = component_1.ComponentInfo.newFromJSON({
                identifier: "boo",
                channels: [validChannelInfo]
            });
            chai_1.expect(info.identifier).to.equal('boo');
            chai_1.expect(info.channels).to.have.length(1);
        });
        xit('should not initialise component with invalid channel', () => {
            chai_1.expect(component_1.ComponentInfo.newFromJSON({
                identifier: "boo",
                channels: [invalidChannelInfo]
            })).to.throw;
        });
        xit('should not initialise channel with invalid parameter info', () => {
            chai_1.expect(component_1.ChannelInfo.newFromJSON({
                identifier: "boo",
                parameter: [invalidParameterInfo]
            })).to.throw;
        });
    });
});

//# sourceMappingURL=component.js.map
