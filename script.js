$( document ).ready( function() {
    //ALL
    setProperHeight();

    //Set section switching event listeners.
    setFadeSectionSwitch( '.sectionSelector', '.contentSection' );
    
    //On load effects.
    countUpEffLP( '#years-experience', 0, 20, 500, 3000, 1.35 );

    
    //CONTACT PAGE --------- 4
    addHoverColorContact();
    //---/CONTACT PAGE ----- 4



    $( window ).resize( function() {
        //ALL
        setProperHeight();

        //FIND A WAY TO FILTER THIS;
        //CONTACT PAGE - 4
        resizeContactPage();
    } );
        


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

                        $( '#landing-text-primary' ).html( 'Gladys <span class = "hideBreak"><br></span>Henao,<span class = "hideBreak"><br></span> M.A. <span class = "hideBreak"><br></span>Legal <span class = "hideBreak"><br></span>Translator' );

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

            //$( this ).addClass( 'selectedLink' );


            let mappedSectionID = '#c' + $( this ).attr( 'id' ).slice(1);
            
            if ( $( mappedSectionID ).length ) {

                let isCurrentlySelected = $( mappedSectionID ).attr( 'class' ).split(' ').includes( 'currentlySelected' );
                let currentlySelected = $( '.currentlySelected' ).eq( 0 );

                if ( !isCurrentlySelected ) {


                    let oldSelectedIndex = $( sectionsClass ).index( currentlySelected );
                    let newSelectedIndex = $( sectionsClass ).index( $( mappedSectionID ) );


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
                            
                            freezeSec.addClass( freezeClassA );

                            setTimeout( function() {

                                freezeSec.removeClass( freezeClassR );
                                freezeSec.removeClass( 'currentlySelected' );

                            }, 1000 );

                        })();

                    }, 250 );


                    setTimeout( function() {
                        
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
                                
                                freezeSec.addClass( freezeClassA );

                                setTimeout( function() {

                                    freezeSec.removeClass( freezeClassR );

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

                                    //IF LOADING CONTACT PAGE
                                    if ( tempSecIter === 4 ) {

                                        resizeContactPage();
                                    }
                                    //-------------------------------------/contact

                                }, 1000 );


                                let linkId = '#s' + $( '.contentSection' ).eq( sectionIter ).attr( 'id' ).slice(1);

                                $( linkId ).addClass( 'selectedLink' );
                                
                                if ( tempNewSel !== tempSecIter ) {

                                    setTimeout( function() {


                                        $( linkId ).removeClass( 'selectedLink' );
                                    }, 200 );
                                    
                                }

                            })();
                            
                            sectionIter += ( 1 * mult );
                            
                            if ( sectionIter === ( newSelectedIndex  + ( 1 * mult ) ) ) {
                                
                                clearInterval( cycleThrough );

                            }
                        }, time );
                    
                    }, 250 + time );

                }

            }
                    
        });
    });

}

//Resize the form
function resizeForm() {
    var totPx = 0;
    $( '.sizeForm' ).each( function() {
        totPx += $( this ).outerHeight();
    } );

    $( '#nmForm' ).css( 
        {
            height: `${ totPx }px`,
            top: `${ - ( totPx / 6 ) }px`,
        } 
    );
} 


function addHoverColorContact() {
    $( '.hc' ).each( function() {
        $( this ).hover( 
            function() {
                $( this ).parent().children().each( function( s ) {
                    $( this ).parent().children().eq( s ).addClass( 'hoverContact' );
                } );
            },
            function() {
                $( this ).parent().children().each( function( s ) {
                    $( this ).parent().children().eq( s ).removeClass( 'hoverContact' );
                } );
            }
        );
    } );
}

<<<<<<< HEAD

function addContactTitleWrite() {


    $( '#gIT' ).text( '' );
    
    setTimeout( function() {

        let phrase = 'Get        in        touch.', lettCount = 0, isSpace = false;

        let writeGIT = setInterval( function() {

            
            if ( !isSpace ) {
                let orig = $( '#gIT' ).text();
                orig += phrase[ lettCount ];
                $( '#gIT' ).text( orig ); 
            }


            if ( phrase[ lettCount ] === ' ' ) { isSpace === true;}
            else {
                isSpace = false;

                if ( phrase[ lettCount + 1 ] !== ' ' ) {
                    isSpace = false;
                }
            }
        

            lettCount ++;
            if ( lettCount === phrase.length ) {
                clearInterval( writeGIT );
            }
        }, 75 );
        



    }, 750 );
=======
function setProperHeight() {

    $( 'body' ).css( 'max-height',  $( window ).innerHeight()  + 'px' );
    $( document ).css( 'max-height',  $( window ).innerHeight() + 'px' );
}

function resizeContactPage() {

    resizeForm();

    let spaceTaken = 0, contactHeight = $( '#ccontact').height();
    console.log( contactHeight );
    $( '.contactRow' ).each( function( i ) {


        let minH = $( this ).children( 0 ).children( 0 ).outerHeight();
        

        if ( i ===  ( $( '.contactRow' ).length - 1 ) )  {
            //console.log( spaceLeft / contactHeight );
            console.log(spaceTaken / contactHeight);
            if ( ( spaceTaken / contactHeight ) <= .51 ) {
                console.log( '1' );
                
                let formTopPadding = .50 - ( spaceTaken / contactHeight );
                $( this ).css( 'min-height', ( 1 * $( '#ccontact').outerHeight() ) + 'px' );
                $( this ).css( 'padding', `${ formTopPadding * 100 }% ${ formTopPadding * 100 }%  0%  ${ formTopPadding * 100 }%` );
                $( '.contactRow' ).eq( i - 1 ).css( 'margin-top' , `${ formTopPadding * 50 }%`);    
            }
            
        
            else if ( ( spaceTaken / contactHeight ) > .51 && ( spaceTaken / contactHeight ) <=  1 &&  $( window ).innerWidth() <= 767 )  {                
                console.log( '2' );
                let spaceLeft = ( 1 - ( spaceTaken / contactHeight )) * .50;

                let newParPercent = ( $( '.contactRow' ).eq( i - 2 ).outerHeight() / contactHeight ) + spaceLeft;
                let newConPercent = ( $( '.contactRow' ).eq( i - 1  ).outerHeight() / contactHeight ) + spaceLeft;

                //$( '.contactRow' ).eq( i - 1 ).css( 'min-height' , `${ newPer * contactHeight }px`);

                $( '.contactRow' ).eq( i - 1 ).css( 'min-height', ( newConPercent * contactHeight ) + 'px' );
                $( '.contactRow' ).eq( i - 2 ).css( 'min-height', ( newParPercent * contactHeight ) + 'px' );
                
                $( this ).css( 'min-height', ( 2 * $( '#ccontact').outerHeight() ) + 'px' );
             
            }

            else {
                console.log( '3' );
                $( this ).css( 'min-height', ( 2 * $( '#ccontact').outerHeight() ) + 'px' );
                $( this ).css( 'padding', '0px' );
            }
            
        }
        else {
            
            $( this ).css( 'min-height', minH + 'px' );
            spaceTaken += minH;
        }

    } );

>>>>>>> AddContactContent
}