import { MainAppComponent } from './main-app.component'

describe('Main App Component', () => {
    let component: MainAppComponent;

    beforeEach(() => {
        component = new MainAppComponent();
    });

    describe('testVariable', () => {
        it('should have the correct value', () => {
            expect(component.testVariable).toBe('Test Var');
        });
    });
});