
$( document ).ready( function() {


    
    //On load roll in effects.
    countUpEffLP( '#years-experience', 0, 20, 500, 3000, 1.35 );

    
    


} );


//Primary count up effect.
function countUpEffLP( targetID, startVal, EndVal, delay, duration, durationMultiplier ) {

    console.log( 'CUE COUNT UP EFFECT' );

    $( '#landing-text-primary' ).addClass( 'BlurIn' );

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

                setTimeout( function() {

                    $( '#landing-text-primary' ).removeClass( 'BlurIn');
                    $( '#landing-text-primary' ).addClass( 'flashSwitch1');

                    setTimeout( function() {

                        $( '#landing-text-primary' ).html( 'Gladys Henao, M.A. Legal Translator' );

                        setTimeout( function() {

                            $( '#landing-text-primary' ).addClass( 'flashSwitch2');
                        }, 750);

                    }, 250);

                    $( "#innerFoot" ).addClass( 'fillFooter' );
                    $( "#mainNav" ).addClass( 'fillNav' );

                    setTimeout( function() {

                        $( ".appearNav" ).each( function() {

                            $( this ).removeClass( 'appearNav' );
                            $( this ).addClass( 'appearNavAnim' );
                        }); 

                        $( "#mainNavButton" ).addClass( 'appearNavAnim' );

                        setTimeout( function() {

                            let opt = { height: 'auto' };

                            $( "#mainNav" ).css( opt );
                            $( "#navHolder" ).css( opt );
                        }, 750);
                    }, 1500);

                }, 1000);
                
            }

        }, ( duration / ( EndVal * durationMultiplier ) ) );

    }, ( delay ) );

    
    console.log( 'EXECUTING COUNT UP EFFECT' );
    console.log( '----');
}

