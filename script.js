$( document ).ready( function() {

    //Set section switching event listeners.
    setFadeSectionSwitch( '.sectionSelector', '.contentSection' );
    
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
                        }, 750 );

                    }, 250 );

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
                        }, 750 );
                    }, 1500 );

                }, 1000 );
                
            }

        }, ( duration / ( EndVal * durationMultiplier ) ) );

    }, ( delay ) );

}


function setFadeSectionSwitch( triggersClass, sectionsClass, selectedClass ) {

    var activeLinks = true;    
    
    $( triggersClass ).each( function() {
        
        $( this ).click( function() {
            
            if ( !activeLinks ) {

                return;
            }
            
            $( triggersClass ).each( function( i ) {


                $( triggersClass ).eq( i ).removeClass( 'selectedLink' );
            } );

            $( this ).addClass( 'selectedLink' );


            let mappedSectionID = '#c' + $( this ).attr( 'id' ).slice(1);
            
            if ( $( mappedSectionID ).length ) {

                let isCurrentlySelected = $( mappedSectionID ).attr( 'class' ).split(' ').includes( 'currentlySelected' );
                let currentlySelected = $( '.currentlySelected' ).eq( 0 );

                if ( !isCurrentlySelected ) {


                    let oldSelectedIndex = $( sectionsClass ).index( currentlySelected );
                    let newSelectedIndex = $( sectionsClass ).index( $( mappedSectionID ) );


                    
                    //$( mappedSectionID ).removeClass( 'flyInRight' );
                    //$( mappedSectionID ).removeClass( 'flyInLeft' );
                    //$( mappedSectionID ).removeClass( 'flyInRight' );
                    //$( mappedSectionID ).removeClass( 'flyInLeft' );

                    let dropdownIsShowing = $( '#navbar1').attr( 'class' ).split(' ').includes( 'show' );
                    if ( dropdownIsShowing ) {
                        $( '#mainNavButton' ).click();
                        
                    }

                    activeLinks = false;
                    $( '.nav-link' ).each( function() {
                        $( this ).css( 
                            { 
                                color: 'grey',
                                opacity: '0.35'
                            } 
                        );
                    }); 


                    

                    let mult = oldSelectedIndex < newSelectedIndex ? 1 : -1, sectionIter = oldSelectedIndex + ( 1 * mult );
                    let classToAdd, time = 500;

                    if ( Math.abs( newSelectedIndex - oldSelectedIndex ) === 1 ) {

                        time = 0;
                    }



                    classToAdd = newSelectedIndex < oldSelectedIndex ? 'flyOutLeft' : 'flyOutRight';
                    
                    setTimeout( function() {

                        (function () {
                            let tempSecIter = oldSelectedIndex;
                            let freezeClassA = classToAdd;
                            let freezeClassR = classToAdd;
                            let freezeSec = $( '.contentSection' ).eq( tempSecIter );
                            
                            console.log('--');
                            console.log( 'add class ' + freezeClassA );
                            console.log( tempSecIter );
                            console.log( freezeSec[0] );
                            freezeSec.addClass( freezeClassA );

                            setTimeout( function() {

                                console.log('------------------------------');

                                console.log( 'removing ' +  freezeClassR );
                                freezeSec.removeClass( freezeClassR );
                                freezeSec.removeClass( 'currentlySelected' );
                                console.log( tempSecIter );
                                console.log( freezeSec[0] );

                            }, 1000 );
                            console.log('--');
                        })();

                    }, 250 );






                    
                    setTimeout( function() {
                        //-------------------------------------------------------------------------------------

                        let cycleThrough = setInterval( function() {

                            if ( sectionIter === newSelectedIndex ) {
                                classToAdd = newSelectedIndex < oldSelectedIndex ?  'flyInRight' : 'flyInLeft';
                                classToAdd = classToAdd + ' currentlySelected';
                            }

                            else {
                                classToAdd = newSelectedIndex < oldSelectedIndex ? 'flyAcrossToLeft' : 'flyAcrossToRight';
                            }
                            
                            (function () {
                                let tempSecIter = sectionIter;
                                let tempNewSel = newSelectedIndex;
                                let freezeClassA = classToAdd;
                                let freezeClassR = classToAdd.split(' ').length > 1 ? classToAdd.split(' ')[0] : classToAdd;
                                let freezeSec = $( '.contentSection' ).eq( tempSecIter );
                                
                                console.log('--');
                                console.log( 'add class ' + freezeClassA );
                                console.log( tempSecIter );
                                console.log( freezeSec[0] );
                                freezeSec.addClass( freezeClassA );

                                setTimeout( function() {

                                    console.log('------------------------------');

                                    console.log( 'removing ' +  freezeClassR );
                                    freezeSec.removeClass( freezeClassR );
                                    console.log( tempSecIter );
                                    console.log( freezeSec[0] );

                                    if ( tempSecIter === tempNewSel ) {

                                        activeLinks = true;
                                        $( '.nav-link' ).each( function() {
                                            $( this ).css( 
                                                { 
                                                    color: 'black',
                                                    opacity: '1'
                                                } 
                                            );
                                        });
                                    }

                                }, 1000 );
                                console.log('--');
                            })();
                            
                            sectionIter += ( 1 * mult );
                            
                            if ( sectionIter === ( newSelectedIndex  + ( 1 * mult ) ) ) {
                                console.log(''); 
                                clearInterval( cycleThrough );
                            }
                        }, time );
                    
                    }, 250 + time );

                }

            }
                    
        });
    });

}