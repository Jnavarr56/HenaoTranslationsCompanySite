
$( document ).ready( function() {

    var currentlySelected = $( '.currentlySelected').eq( 0 );
    
    $( '.sectionSelector' ).each( function() {
        
         $( this ).click( function() {
            
            let mappedSectionID = '#c' + $( this ).attr( 'id' ).slice(1);
            
            if ( $( mappedSectionID ).length ) {

                let isCurrentlySelected = $( mappedSectionID ).attr( 'class' ).split(' ').includes( 'currentlySelected' );

                let contentIndex = $( '.contentSection' ).index( $( mappedSectionID ) );

                if ( !isCurrentlySelected ) {


                    let oldSelectedIndex = $( '.contentSection' ).index( currentlySelected );
                    let newSelectedIndex = $( '.contentSection' ).index( $( mappedSectionID ) );


                    

                    $( mappedSectionID ).addClass( 'currentlySelected' );
                    $( mappedSectionID ).removeClass( 'flyInRight' );
                    $( mappedSectionID ).removeClass( 'flyInLeft' );


                    if ( newSelectedIndex < oldSelectedIndex ) {
                        console.log( 'NEW: IN LEFT, OLD: OUT RIGHT' );


                        
                        currentlySelected.addClass( 'flyOutRight' );
                        $( mappedSectionID ).addClass( 'flyInLeft' );                        
                    }

                    else {
                        console.log( 'NEW: IN RIGHT, OLD: OUT LEFT' );

                        currentlySelected.addClass( 'flyOutLeft' );
                        $( mappedSectionID ).addClass( 'flyInRight' );
                    }
                    
                    setTimeout( function() {

                        currentlySelected.removeClass( 'flyOutLeft' );
                        currentlySelected.removeClass( 'flyOutRight' );


                        $( mappedSectionID ).removeClass( 'flyInRight' );
                        $( mappedSectionID ).removeClass( 'flyInLeft' );

                        currentlySelected.removeClass( 'currentlySelected' ); 
                        currentlySelected = $( '.currentlySelected' ).eq( 0 ); 
                    }, 1500);


                    


                    
                }

            }
            

            

            let dropdownIsShowing = $( '#navbar1').attr( 'class' ).split(' ').includes( 'show' );
            if ( dropdownIsShowing ) {

                setTimeout( function() {

                    $( '#mainNavButton' ).click();
                }, 250);
                
            }
         });
    });
    
    //On load effects.
    countUpEffLP( '#years-experience', 0, 20, 500, 3000, 1.35 );

    
    


} );














//Primary count up effect.
function countUpEffLP( targetID, startVal, EndVal, delay, duration, durationMultiplier ) {

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

}

