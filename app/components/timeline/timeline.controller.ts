/// <reference path="../../../typings/tsd.d.ts" />

module Timeline {

    function translate(element, x, y) {
        element.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }

    function intersectRect(r1, r2) {
        return !(r2.left > r1.right
        || r2.right < r1.left
        || r2.top > r1.bottom
        || r2.bottom < r1.top);
    }

    export class Main {
        constructor () {
            var resources = document.getElementsByClassName('resource');

            for (var i = 0; i < resources.length; i++) {
                resources[i].addEventListener('mousedown', startDrag);
            }

            var timeline = document.getElementById('timeline');
            var timelineList = document.getElementById('timeline-list');
            var parentElement;
            var element;
            var placeholderElment = document.createElement('li');
            placeholderElment.className = 'placeholder';
            placeholderElment.innerText = '.'; //TODO: WHY! >:(
            var startPos = { x: 0, y: 0 };

            var timelineResources = [];

            function startDrag(e) {
                e.preventDefault();
                window.addEventListener('mousemove', drag);
                window.addEventListener('mouseup', stopDrag);
                parentElement = this;
                element = this.cloneNode(true);
                timelineList.appendChild(element);
                element.classList.add('resource--dragging');
                startPos.x = 10;
                startPos.y = 10;
                placeholderElment.style.width = element.offsetWidth + 'px';
                placeholderElment.style.height = element.offsetHeight +'px';
            }

            function drag(e) {
                translate(element, e.pageX - element.offsetLeft + startPos.x, e.pageY - element.offsetTop + startPos.y);
                if(e.target && e.target.parentElement === timelineList) {
                    timelineList.insertBefore(placeholderElment, e.target.nextSibling); //TODO: add delay for performance?
                }
            }

            function stopDrag(e) {
                element.style.transition = 'transform 400ms cubic-bezier(0.230, 1.000, 0.320, 1.000)';
                element.classList.remove('resource--dragging');

                if(intersectRect(element.getBoundingClientRect(), timeline.getBoundingClientRect())) {
                    if(e.target && e.target.parentElement === timelineList) {
                        translate(element, -element.offsetLeft + placeholderElment.offsetLeft, -element.offsetTop + placeholderElment.offsetTop);
                    } else {
                        translate(element, 0,0);
                    }

                    setTimeout(function() {
                        element.style.transition = '';
                        element.style.transform = '';
                        timelineResources.push(element);
                        if(e.target && e.target.parentElement === timelineList) {
                            timelineList.insertBefore(element, e.target.nextSibling); //TODO: add delay for performance?
                        }
                        if(timelineList.contains(placeholderElment)) {
                            timelineList.removeChild(placeholderElment);
                        }
                    }, 400);
                } else {
                    translate(element, -element.offsetLeft + parentElement.offsetLeft, -element.offsetTop + parentElement.offsetTop);
                    setTimeout(function() {
                        timelineList.removeChild(element);
                    }, 400);
                }

                window.removeEventListener('mousemove', drag);
                window.removeEventListener('mouseup', stopDrag);
            }
        }
    }
}

export = Timeline;