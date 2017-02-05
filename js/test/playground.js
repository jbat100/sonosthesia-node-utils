"use strict";
var HubMessageType;
(function (HubMessageType) {
    HubMessageType[HubMessageType["Component"] = 0] = "Component";
    HubMessageType[HubMessageType["Action"] = 1] = "Action";
    HubMessageType[HubMessageType["Control"] = 2] = "Control";
    HubMessageType[HubMessageType["Create"] = 3] = "Create";
    HubMessageType[HubMessageType["Destroy"] = 4] = "Destroy";
})(HubMessageType = exports.HubMessageType || (exports.HubMessageType = {}));
const HubMessageContentClasses = new Map();
HubMessageContentClasses[HubMessageType.Component] = 'a';
HubMessageContentClasses[HubMessageType.Control] = 'b';
const has = HubMessageContentClasses.has(HubMessageType.Component);
const result = HubMessageContentClasses[HubMessageType.Component];
console.log('end');

//# sourceMappingURL=playground.js.map
