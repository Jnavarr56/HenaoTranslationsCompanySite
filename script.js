
$( document ).ready( function() {

    //Primary count up effect.
    countUpEffLP( '#years-experience', 0, 20, 500, 3000, 1.50 );

    //Make list items appear.
    liAppearEffLP( 'home-list-item', 3000, 500, 'listItemAppear', '#landing-text-primary' );


} );


//Primary count up effect.
function countUpEffLP( targetID, startVal, EndVal, delay, duration, durationMultiplier ) {

    console.log( 'CUE COUNT UP EFFECT' );

    setTimeout( function() {

        let startedCountUp = false, lastVal, newVal;
        let countUp = setInterval( function() {
        
            if ( !startedCountUp ) {

                $( targetID ).text( startVal );
                startedCountUp = true;
            }

            else {

                lastVal = $( targetID ).text();   
                newVal = Number(lastVal) + 1;

                $( targetID ).text( newVal );
            }

            if ( newVal === EndVal ) {

                clearInterval( countUp );
            }

        }, ( duration / ( EndVal * durationMultiplier ) ) );

    }, ( delay ) );

    console.log( 'EXECUTING COUNT UP EFFECT' );
    console.log( '----');
}

//Make list items appear.
function liAppearEffLP( targetID, intialDelay, interDelay, effectClassListAppear, targetID2 ) {

    console.log( 'CUE LIST APPEAR EFFECT' );

    var listItems = $( '.home-list-item' ), liIndex = 0;

    
    setTimeout( function() {
        
        let appearLi = setInterval( function() {

            jQuery( listItems[liIndex] ).addClass( effectClassListAppear );

            liIndex ++;

            if ( liIndex === listItems.length ) {



                clearInterval( appearLi );

                setTimeout( function() {
                    

                    $( targetID2 ).addClass( 'fadeOutInHomeQuick' );
                    $( targetID2 ).html( 'Gladys Henao, M.A. Legal Translator' );

                    

                }, 750);
            }
        }, interDelay + 250 );
        

    }, intialDelay );




    console.log( 'EXECUTING LIST APPEAR EFFECT' );
    console.log( '----');

}