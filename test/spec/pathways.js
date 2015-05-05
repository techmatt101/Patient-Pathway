describe('Pathway', function() {
    browser.get('/pathway/1');

    describe('Paths', function() {
        it('list paths', function() {
            var pathList = element.all(by.repeater('path in paths'));
            expect(pathList.count()).toEqual(5);
        });
    });

    describe('Pathway', function() {
        var pathList = element.all(by.repeater('point in points'));

        it('add point', function() {
            modal('points').push({
                id: 102,
                type: "link",
                title: "NHS Choices"
            });
            expect(pathList.count()).toEqual(16);
        });

        it('remove point', function() {
            element(by.css(['content=delete'])).click();
            expect(pathList.count()).toEqual(14);
        });

        it('list points', function() {
            expect(pathList.count()).toEqual(15);
        });

        it('list more points when scrolling', function() {
            expect(pathList.count()).toEqual(15);
            window.scroll(1000,0);
            expect(pathList.count()).toEqual(30);
        });
    });
});