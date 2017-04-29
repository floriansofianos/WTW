"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_app_component_1 = require("./main-app.component");
describe('Main App Component', function () {
    var component;
    beforeEach(function () {
        component = new main_app_component_1.MainAppComponent();
    });
    describe('testVariable', function () {
        it('should have the correct value', function () {
            expect(component.testVariable).toBe('Test Var');
        });
    });
});
//# sourceMappingURL=main-app.component.spec.js.map