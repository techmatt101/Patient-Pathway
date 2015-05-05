describe('User', function() {
    browser.get('/login');

    describe('Login', function() {
        it('sign in successfully', function() {
            element(by.model('username')).sendKeys('test1@email.com');
            element(by.id('login')).click();
            expect(window.title()).toNotEqual('Login');
        });
    });

    describe('Settings', function() {
        it('update', function() {
            browser.get('/settings');
            element(by.model('name')).sendKeys('Test');
            element(by.model('password')).sendKeys('password');
            element(by.model('password')).sendKeys('password');
            element(by.id('update')).click();
            expect(by.id('update')).getText().toEqual('updated');
        });
    });
});