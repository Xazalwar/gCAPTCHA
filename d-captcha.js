/*

Software Name   : dCAPTCHA
Version         : 1.0
Author          : Darbaz Ali
Date            : july / 2018
Location        : Kurdistan / Iraq
Technology      : javascript, Web
Target          : Internet Bot

Description:

dCAPTCHA is a brand new, GAME based  CAPTCHA system that focuses on human thinking and memorizing.

*/


/**************************************
SECTION 1: general purpose functions
**************************************/


/* printing to the console, debugging purpose */
const println = console.log;


/* appending an element to a node, general purpose */
function append(node, element) {
    return node.appendChild(element);
}


/* appending multiple elements to a node */
function multiAppend(nodeName, elements) {
    // loop through the elements
    // elements should be an array of html elements
    elements.forEach(function(element) {
        nodeName.appendChild(element);
    });
}


/* collision detection (rect - rect) true or false, algorithm */
function isColliding(element1, element2) {

    const W1 = 60; // element 1 width
    const W2 = 60; // element 2 width

    const H1 = 60; // element 1 height
    const H2 = 60; // element 2 height

    const X1 = parseInt(element1.style.left);
    const X2 = parseInt(element2.style.left);

    const Y1 = parseInt(element1.style.top);
    const Y2 = parseInt(element2.style.top);


    if (X1 + W1 >= X2 &&
        X1 <= X2 + W2 &&
        Y1 + H1 >= Y2 &&
        Y1 <= Y2 + H2) {
        return true;
    } else {
        return false;
    }
}


/* generating a random array from another array, algorithm */
function createRandomArray(srcArray, amount) {
    var rndArray = []; // random array

    while (rndArray.length < amount) { // how many random items?
        const random_index = Math.floor(Math.random() * srcArray.length);
        if (!rndArray.includes(random_index)) {
            rndArray.push(srcArray[random_index]);
            srcArray.splice(random_index, 1);
        }
    }
    return rndArray;
}


/* clearing a node from all child elements */
function clearNode(nodeName) {
    while (nodeName.firstChild) {
        nodeName.removeChild(nodeName.firstChild);
    }
}


/* changing the style of an element */
function changeStyle(element) {
      element.style.fontSize        = '58px';
      element.style.cursor          = 'default';
      element.style.opacity         = '0.9';
      element.style.backgroundColor = '#045d04';
}


/* hiding value of the circles */
function hideValue(elements) {
    elements.forEach(function(item) {
        item.style.fontSize = '0px';
    });
}


/* create circle elements from Circle Object,and put them inside an array. */
function createCircles(object) {
    const circles = [];
    var i = 0;
    while (circles.length < 10) {
        // object
        var RandomX = Math.floor(Math.random() * 260);
        var RandomY = Math.floor(Math.random() * 260);
        var circle  = new object(i, RandomX, RandomY);

        // looping throught all existing locations
        var overLapping = false;
        for (let j = 0; j < circles.length; j++) {
            var other = circles[j];
            var check = isColliding(circle, other);

            if (check) {
                overLapping = true;
                i--; // start again
                break; // break the loop
            }

        }



        if (!overLapping) {

            circles.push(circle);
        }

        i++;
    }
    return circles;
}


/* removing px Suffix from a string */
function removePX(str) {
    var number  = 0;
    number = parseInt(str.slice(0,-2));
    return number;
}


/* move element H or V or Both */
function moveElement(element, H, V) {

    // frame per second
    const FPS  = 60;

    // ball size
    var ballSize = element.clientWidth;

    // ball x position, y Position
    var ballXPos;
    var ballYPos;

    // ball X speed, Y speed
    var Xspeed;
    var Yspeed;

    // edges
    var width   = element.parentElement.clientWidth   - ballSize ;
    var height  = element.parentElement.clientHeight  - ballSize;
    var left    = element.parentElement.clientLeft;



    // ball starting position
    ballXPos = removePX(element.style.left);
    ballYPos = removePX(element.style.top);

    // ball speed
    Xspeed = 20 / FPS;
    Yspeed = 20 / FPS;

    // random direction
    if (Math.floor(Math.random() * 2 ) == 0 ) {
        Xspeed = -Xspeed;
    }

    if (Math.floor(Math.random() * 2 ) == 0) {
        Yspeed = -Yspeed;
    }


    // UPDATE FUNCTION
    function update() {

        function moveH() {
            ballXPos += Xspeed;
            element.style.left = ballXPos + 'px';

            if (ballXPos < 0 && Xspeed < 0) {
                Xspeed = -Xspeed;
            }

            if (ballXPos > width && Xspeed > 0) {
                Xspeed = -Xspeed;
            }
        }// move H

        function moveV() {
            ballYPos += Yspeed;
            element.style.top = ballYPos + 'px';

            if (ballYPos < 0 && Yspeed < 0) {
                Yspeed = -Yspeed;
            }

            if (ballYPos > height && Yspeed > 0) {
                Yspeed = -Yspeed;
            }
        } // moveV

        // H move
        if (H) {
            moveH()
        }

        // V move
        if (V) {
           moveV();
        }

        if (!H && !V) {
            moveH()
            moveV();
        }

    } // update

    return {
        startMove: function() {
            // set up interval
            moveInterval = setInterval(update, 1000 / FPS);
        },

        stopMove: function() {
            clearInterval(moveInterval);
        }
    }
}


/* get the value of circles and put them inside an array */
function getCircleValues(elements) {
    // getting random array value and put it in an array
    const numberArray = [];

    elements.forEach(function (item) {
        numberArray.push(parseInt(item.getAttribute('value')));
    });

    return numberArray.sort()
}


                            /* END OF SECTION 1 */
/***************************************************************************/



/**************************************
SECTION 2: COMPONENTS
**************************************/

/* 2.1 - Anchor */
function Anchor() {

    // elements
    var anchor    = document.createElement('div');
    var checkbox  = document.createElement('div');
    var title     = document.createElement('div');

    // assembling
    title.innerHTML = "I'm not a robot!";
    append(anchor, checkbox);
    append(anchor, title);


    // styles
    style           = anchor.style;
    checkBox_style  = checkbox.style;
    title_style     = title.style;

    // anchor style
    style.width           = '300px';
    style.height          = '80px';
    style.boxSizing       = 'border-box';
    style.backgroundColor = '#cecece';
    style.color           = '#0a4bfc';
    style.border          = '1px solid #000';
    style.borderRadius    = '3px';
    style.display         = 'flex';
    style.fontSize        = '20px';
    style.padding         = '20px 10px';
    style.marginBottom	  = '10px';


    // checkbox style
    checkBox_style.height          = '20px';
    checkBox_style.width           = '20px';
    checkBox_style.border          = '1px solid #0a4bfc';
    checkBox_style.borderRadius    = '2px';
    checkBox_style.backgroundColor = '#fff';
    checkBox_style.marginRight     = '10px';
    checkBox_style.cursor          = 'pointer';
    checkBox_style.transition      = 'background-color 0.3s';


    // title stile
    title_style.cursor = 'default';

    return {
        anchor: function() {
            return anchor;
        },

        checkBox: function() {
            return checkbox;
        }
    }
}


/* 2.2 - UI */
function UIObject() {

    // colors
    const mattBlack     = '#393653';
    const darckGray     = '#49536C';
    const white         = '#FFFFFF';
    const violet        = '#8D57F5';
    const redPink       = '#DB51BE';
    const transparent   = 'rgba(255, 255, 255, 0)';

    /* Private funcitons */
    // common styles for buttons
    function buttonCommonStyle(element) {

        const style = element.style;

        style.width             = '60px';
        style.height            = '80px';
        style.margin            = '0';
        style.padding           = '0';
        style.fontSize          = '40px';
        style.fontWeight        = '800';
        style.backgroundColor   = transparent;
        style.border            = 'none';
        style.cursor            = 'pointer';
        style.color             = redPink;
        style.transition        = 'all .2s ease-in-out';

        const userAgent = window.navigator.userAgent;
        if (userAgent.match('Firefox')) {
            style.fontSize  = '58px';
            style.color     = white;
            style.fontFamily = 'Arial';
        }


        /* remove outline whene element is fucuesd */
        element.onfocus = function () {
            this.style.outline = 'none';
        }

        /* scale buttons with hover event */
        element.onmouseover = function() {
            this.style.transform = 'scale(1.2)';
        }

        element.onmouseout = function() {
            this.style.transform = 'scale(1)';

        }

    }


    // style an element with some properties
    function commonStyle(element) {
        const style = element.style;

        style.padding       = '0';
        style.margin        = '0';
        style.boxSizing     = 'border-box';
        style.borderRadius  = '5px';
    }


    // creating elements
    const overlay         = document.createElement('div');
    const wrapper         = document.createElement('div');
    const canvas          = document.createElement('div');
    const container       = document.createElement('div');

    // header section
    const header          = document.createElement('div');
    const title           = document.createElement('div');
    const closeButton     = document.createElement('input');
    const restartButton   = document.createElement('input');


    // text for the title
    title.textContent = 'Please remember the numbers ' +
    'in the Ascending Order.';

    // setting attributes
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('value', '\u2715');

    restartButton.setAttribute('type', 'button');
    restartButton.setAttribute('value', '\u27F3');


    // Assembling
    append(overlay, wrapper);
    append(wrapper, header);
    append(wrapper, canvas);

    append(header, title);
    append(header, restartButton);
    append(header, closeButton);

    append(canvas, container);



    // assigning element styles
    const overStyle     = overlay.style;
    const wrapStyle     = wrapper.style;
    const canvStyle     = canvas.style;
    const contStyle     = container.style;

    const headStyle     = header.style;
    const titlStyle     = title.style;
    const closeStyle    = closeButton.style;
    const restStyle     = restartButton.style;



    /* STYLING COMPONETNS */

    // overlay Style
    overStyle.position          = 'absolute';
    overStyle.width             = window.innerWidth  + 'px';
    overStyle.height            = window.innerHeight + 'px';
    overStyle.top               = window.pageYOffset + 'px';
    overStyle.left              = window.pageXOffset + 'px';
    overStyle.backgroundColor   = transparent;
    overStyle.color             = white;
    overStyle.display           = 'flex';
    overStyle.justifyContent    = 'center';
    overStyle.alignItems        = 'center';
    overStyle.fontFamily        = 'Arial';
    commonStyle(overlay);


    // wrapper style
    wrapStyle.width             = '600px';
    wrapStyle.height            = '400px';
    wrapStyle.backgroundColor   = mattBlack;
    wrapStyle.boxShadow         = '0 0 30px #000';
    commonStyle(wrapper);



    /* HEADER SECTION */
    // header style
    headStyle.width             = '600px';
    headStyle.height            = '80px';
    headStyle.display           = 'flex';
    headStyle.justifyContent    = 'flex-start';


    // title style
    titlStyle.width             = '80%';
    titlStyle.maxHeight         = '80px';
    titlStyle.padding           = '7px';
    titlStyle.fontSize          = '28px';
    titlStyle.borderRight       = '1px solid ' + white;


    // restart button style
    buttonCommonStyle(restartButton);


    // close button style
    buttonCommonStyle(closeButton);



    // canvas style
    canvStyle.width             = '600px';
    canvStyle.height            = '320';
    canvStyle.minWidth          = '320px';
    canvStyle.minHeight         = '320px';
    canvStyle.position          = 'relative';
    canvStyle.backgroundColor   = '#999';
    canvStyle.borderBottomLeftRadius    = '5px';
    canvStyle.borderBottomRightRadius   = '5px';



    // container style
    contStyle.width             = '320px';
    contStyle.height            = '320px';
    contStyle.backgroundColor   = '#ccc';
    contStyle.margin            = '0 auto';
    contStyle.position          = 'absolute';
    contStyle.left              = '140px';
    commonStyle(container);



    /* Mobile version */
    if (window.innerWidth < 600 ) {

        wrapStyle.width     = '320px';
        wrapStyle.height    = '500px';

        canvStyle.width     = '320px';
        canvStyle.height    = '420px';

        contStyle.left      = '0';
        contStyle.top       = '50px';

        headStyle.width     = '320px';
        headStyle.height    = '80px';

        titlStyle.fontSize  = '20px';

    }

    // Centering with scroll event
    window.onscroll = function() {
        if  (overlay) {
            overStyle.top   = window.pageYOffset + 'px';
            overStyle.left  = window.pageXOffset + 'px';
        }
    }


    // Centering with resize event
    window.onresize = function() {

        if (overlay) {
            overStyle.width     = window.innerWidth + 'px';
            overStyle.height    = window.innerHeight + 'px';

        }
    }    
    
    // close button event
    closeButton.onclick = function() {
        document.body.removeChild(overlay);
        moveElement(container).stopMove();
    }

    // return to objects
    return {
        overlay: function() {
            return overlay;
        },

        canvas: function() {
            return canvas;
        },

        container: function() {
            return container;
        },

        closeButton: function() {
            return closeButton;
        },

        restartButton: function() {
            return restartButton;
        }
    } // return

}


/* 2.3 - Circle Object */
function Circle(value, randomX, randomY) {

    // Prototyping

    this.value      = value;
    this.randomX    = randomX;
    this.randomY    = randomY;


    let circle = document.createElement('input');

    circle.setAttribute('type', 'button');
    circle.setAttribute('value', value);

    const style = circle.style;

    // circle style
    style.width             = '60px';
    style.height            = '60px';
    style.maxWidth          = '60px';
    style.maxHeight         = '60px';
    style.fontSize          = '55px';
    style.borderRadius      = '100%';
    style.textDecoration    = 'none';
    style.backgroundColor   = '#1028ac';
    style.color             = '#fff';
    style.border            = 'none';
    style.cursor            = 'pointer';
    style.position          = 'absolute';
    style.left              = randomX + 'px';
    style.top               = randomY + 'px';
    style.transition        = 'box-shadow 0.3s';

     // hover effect for the circle
    circle.onmouseover = function() {
        style.boxShadow = '0 0 10px #000';
    }
    
    circle.onmouseout = function() {
        style.boxShadow = 'none';
    }
    
    // removeing border on focus
    circle.onfocus = function() {
        style.outline = 'none';
    }


    return circle
}



                            /* END OF SECTION 2 */
/***************************************************************************/


/**************************************
SECTION 3: set up
**************************************/


// embedding anchor
const ancHor        = new Anchor();
const anchor        = ancHor.anchor();
const checkBox      = ancHor.checkBox();
const target        = document.getElementById('d-captcha');

append(target, anchor);


// getting User interface ready
const userInterface = new UIObject();
const overlay       = userInterface.overlay();
const container     = userInterface.container();
const canvs         = userInterface.canvas();
const restartBtn    = userInterface.restartButton();
const closeBtn      = userInterface.closeButton();



const dcSubmit = document.getElementById('dcSubmit');
dcSubmit.style.backgroundColor = '#999';

// event ocuring with clicking on circles (game).
function addEvent(elements) {
    var isHuman = false;
    
    const sortedNumberArray = getCircleValues(elements);


    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function (e) {
            var value = this.getAttribute('value');

            if (value == sortedNumberArray[0]) {

                this.setAttribute('disabled', 'disabled');
                changeStyle(this);

                sortedNumberArray.shift(); // remove the taged number in the array

                if (sortedNumberArray.length === 0) {
                    isHuman = true;

                    setTimeout(function() {
                           // exit the game, done.
                        ;
                        document.body.removeChild(overlay);
                        println(isHuman);

                        checkBox.removeEventListener('click', game);
                        checkBox.style.backgroundColor  = '#00db00';
                        checkBox.style.cursor           = 'default';
                        
                        //enabel submint button
                        dcSubmit.disabled               = false;
                        dcSubmit.style.backgroundColor  = '#148b34';
                        
                    }, 200);
                    
                }

            } else {
                for (var j = 0; j < elements.length; j++) {

                    circleIndex = elements[j];

                    circleIndex.setAttribute('disabled', 'disabled');
                    circleIndex.style.fontSize  = '58px';
                    circleIndex.style.cursor    = 'default';
                    circleIndex.style.opacity   = '0.6';
                    this.style.backgroundColor  = '#f80101';
                    this.style.opacity          = '0.9';
                }

                stopCircls(elements);
            }

        }, false);

    }

    return isHuman;
}

function moveCircls(circles) {
    circles.forEach(function (item) {
        moveElement(item).startMove();
    });
}

function stopCircls(circles) {
    circles.forEach(function (item) {
        moveElement(item).stopMove();
    });
}


function game() {
    /* clear container before start */
    clearNode(container);
    
    /* create the circles */
    const circles = createCircles(Circle);
    const randomCircls = createRandomArray(circles, 4);
    
    /* pop up the UI */
    append(document.body, overlay);
    
    /* deplory circles to the container. */
    multiAppend(container, randomCircls);
    
    moveElement(container).startMove();

    /* start the game */
    setTimeout(function () {
        
        /* hide valuse of the circles */
        hideValue(randomCircls);
        
        /* start the animation */
        
        /* ready the circles to be playd with */
        addEvent(randomCircls);


        moveCircls(randomCircls);

    }, 3000);
}

/* START THE GAME when the checkbox is clicked */
checkBox.addEventListener('click', game, false);

// restart, whene things go wrong
restartBtn.onclick = function () {

    ;

    clearNode(container);
    game();
    
}








