const express = require('express')
const router = express.Router()

router.use('/', require('./routes/base'));

module.exports = router







//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//    HEARINGS
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////



//  Judges View only
//  Not sure how cmmon this is as a use case.
// Prototype made at the end of august just for jusgesa to veiw in mid september 2021
router.get('/hearings/judgesview', function (req, res)
{
    req.session.data['drafthearing'] = 'true';
    req.session.data['submissioncomplete'] = 'false';
    req.session.data['changesallowed'] = 'true';

    req.session.data['channelradios'] = 'In person';

    req.session.data['thenevue'] = 'ROMFORD COUNTY COURT AND FAMILY COURT';
    req.session.data['regionselection'] = 'London';
    req.session.data['otherfailities'] = '';

    req.session.data['panelsame'] = 'No - select a new panel';

    req.session.data['specificjudge'] = 'No';
    req.session.data['judgename'] = '';
    req.session.data['judgecontract'] = 'All';
    req.session.data['exludejudgefield'] = '';
    req.session.data['addpersonsname'] = '';
    req.session.data['excludepersonsname'] = '';
    req.session.data['panelmemeberlist'] = 'Regional Medical Member\nDisability Qualified Member';

    req.session.data['theduration'] = '45 minutes';
    req.session.data['durationradios'] = '45 minutes';

    req.session.data['dateradios'] = 'No';
    req.session.data['firstdateday'] = '';
    req.session.data['firstdatemonth'] = '';
    req.session.data['firstdateyear'] = '';

    // Clear other options data
    req.session.data['earliestdateday'] = '';
    req.session.data['earliestdatemonth'] = '';
    req.session.data['earliestdateyear'] = '';
    req.session.data['latestdateday'] = '';
    req.session.data['latestdatemonth'] = '';
    req.session.data['latestdateyear'] = '';

    //Make sure this niche error case is off by default
    req.session.data['confimationerror'] = 'false';


    req.session.data['caseflagshidden'] = 'false';
    req.session.data['calendarclash'] = 'false';
    req.session.data['viewingconfirmedhearing'] = 'false';

    req.session.data['afterhearinghappend'] = 'false';



    req.session.data['submissioncomplete'] = 'false';

    req.session.data['firsthearingscenario'] = 'true';

    req.session.data['hidecurrent'] = 'false';
    req.session.data['hidepast'] = 'false';
    req.session.data['hidecancelled'] = 'false';

    req.session.data['alternativeentry'] = 'false';




    res.redirect('/hearings/pages/casedetailsjudge')
})










//  Scenario for testing - Creating the first SSCS hearting on a case
//  This is the most common in real life as most cases have just onme hearing
router.get('/hearings/first', function (req, res)
{
        req.session.data['submissioncomplete'] = 'false';

        req.session.data['firsthearingscenario'] = 'true';

        req.session.data['hidecurrent'] = 'true';
        req.session.data['hidepast'] = 'true';
        req.session.data['hidecancelled'] = 'true';

        req.session.data['alternativeentry'] = 'false';

        res.redirect('/hearings/pages/casedetailsdivorce')
})


//  Scenario for testing - First hearing but it starts on the check your answers page.
// This feels odd but might be an acceptable design pattern if the SSCS users stick to most of the defaults.
router.get('/hearings/firstalt', function (req, res)
{
    req.session.data['submissioncomplete'] = 'false';
    req.session.data['firsthearingscenario'] = 'true';

    req.session.data['hidecurrent'] = 'true';
    req.session.data['hidepast'] = 'true';
    req.session.data['hidecancelled'] = 'true';

    req.session.data['alternativeentry'] = 'true';


    res.redirect('/hearings/pages/casedetailsdivorce')
})



//  Scenario for testing -  A third hearing
// This is unlikely for SSCS.  But on a 2nd hearings onward there is a chance a judge would want to keep the same panel
// So this jounrey includes a page about keeping the most recent panel
router.get('/hearings/third', function (req, res)
{
    req.session.data['submissioncomplete'] = 'false';
    req.session.data['firsthearingscenario'] = 'false';

    req.session.data['hidecurrent'] = 'true';
    req.session.data['hidepast'] = 'false';
    req.session.data['hidecancelled'] = 'false';

    req.session.data['alternativeentry'] = 'false';

    res.redirect('/hearings/pages/casedetailsdivorce')
})


// Scenario for testing - Showing the hearings tab - after submission
router.get('/hearings/aftersubmission', function (req, res)
{
    req.session.data['submissioncomplete'] = 'true';
    req.session.data['justsubmitted'] = 'true';
    req.session.data['aftertenbmins'] = 'false';

    req.session.data['hidecurrent'] = 'true';
    req.session.data['hidepast'] = 'true';
    req.session.data['hidecancelled'] = 'true';

    req.session.data['alternativeentry'] = 'false';

    res.redirect('/hearings/pages/casedetailsdivorce')
})


// Scenario for testing - Showing the hearings tab - after submission
router.get('/hearings/after10mins', function (req, res)
{
    req.session.data['submissioncomplete'] = 'true';
    req.session.data['justsubmitted'] = 'false';
    req.session.data['aftertenbmins'] = 'true';

    req.session.data['hidecurrent'] = 'true';
    req.session.data['hidepast'] = 'true';
    req.session.data['hidecancelled'] = 'true';

    req.session.data['alternativeentry'] = 'false';


    res.redirect('/hearings/pages/casedetailsdivorce')
})


// Scenario for testing - Showing the hearings tab - after one month
// The assumption is that after 1 month the request would have been listed to a slot
router.get('/hearings/aftermonth', function (req, res)
{
    req.session.data['submissioncomplete'] = 'false';
    req.session.data['justsubmitted'] = 'false';
    req.session.data['aftertenbmins'] = 'false';


    req.session.data['hidecurrent'] = 'false';
    req.session.data['hidepast'] = 'true';
    req.session.data['hidecancelled'] = 'true';



    req.session.data['alternativeentry'] = 'false';

    res.redirect('/hearings/pages/casedetailsdivorce')
})



// Scenario for testing - Showing the hearings tab - All states
// Note this doesn't include the state of submitted but not allocated to a slot yet
router.get('/hearings/all', function (req, res)
{
    req.session.data['submissioncomplete'] = 'true';
    req.session.data['justsubmitted'] = 'true';
    req.session.data['aftertenbmins'] = 'true';

    req.session.data['hidecurrent'] = 'false';
    req.session.data['hidepast'] = 'false';
    req.session.data['hidecancelled'] = 'false';

    req.session.data['alternativeentry'] = 'false';


    res.redirect('/hearings/pages/casedetailsdivorce')
})











// Starting the journey from the hearings tab
// After clicking 'request a hearing' all the defaults are set for the following data entry pages
router.post('/hearings/pages/casedetailsdivorce', function (req, res)
{

        req.session.data['drafthearing'] = 'true';
        req.session.data['submissioncomplete'] = 'false';
        req.session.data['changesallowed'] = 'true';

        req.session.data['hearingstage'] = 'Final';


        req.session.data['channelradios'] = 'In person';

        req.session.data['thenevue'] = 'ROMFORD COUNTY COURT AND FAMILY COURT';
        req.session.data['regionselection'] = 'London';
        req.session.data['otherfailities'] = '';

        req.session.data['panelsame'] = 'No - select a new panel';

        req.session.data['specificjudge'] = 'No';
        req.session.data['judgename'] = '';
        req.session.data['judgecontract'] = 'All';
        req.session.data['exludejudgefield'] = '';
        req.session.data['addpersonsname'] = '';
        req.session.data['excludepersonsname'] = '';
        req.session.data['panelmemeberlist'] = 'Regional Medical Member\nDisability Qualified Member';

        req.session.data['theduration'] = '45 minutes';
        req.session.data['durationradios'] = '45 minutes';

        req.session.data['dateradios'] = 'No';
        req.session.data['firstdateday'] = '';
        req.session.data['firstdatemonth'] = '';
        req.session.data['firstdateyear'] = '';

        // Clear other options data
        req.session.data['earliestdateday'] = '';
        req.session.data['earliestdatemonth'] = '';
        req.session.data['earliestdateyear'] = '';
        req.session.data['latestdateday'] = '';
        req.session.data['latestdatemonth'] = '';
        req.session.data['latestdateyear'] = '';

        //Make sure this niche error case is off by default
        req.session.data['confimationerror'] = 'false';


        req.session.data['caseflagshidden'] = 'false';
        req.session.data['calendarclash'] = 'false';
        req.session.data['viewingconfirmedhearing'] = 'false';

        req.session.data['afterhearinghappend'] = 'false';

        // Set servicetype to SSCS
        //req.session.data['servicetype'] = 'sscs';



    // If we are going with starting from the 'check answers' page then head straight there
        if(req.session.data['alternativeentry'] == 'true')
        {
            req.session.data['drafthearing'] = "false";
            req.session.data['changesallowed'] = "true";

            res.redirect('/hearings/pages/checkyouranswers?alternativeheading=true&')
        }
        else
        {
            // Otherwise go through the journey
            res.redirect('/hearings/pages/partiyrequirements')
        }


})






// Cancel a hearing
// Direct back to the hearing tab
// Don't show upcoming hearing, Show the cancel section
router.post('/hearings/pages/confirmcancel', function (req, res)
{

    req.session.data['hidecurrent'] = 'true';
    req.session.data['hidepast'] = 'true';
    req.session.data['hidecancelled'] = 'false';

    req.session.data['alternativeentry'] = 'false';

    res.redirect('/hearings/pages/casedetailsdivorce')
})





// Displaying the basic info about a case on the first page
// The go to channel section page
router.post('/hearings/pages/partiyrequirements', function (req, res)
{
    // If coming from check answers page then return there after clicking continue
    if(req.session.data['backtocheckanswers'] == 'true' )
    {
        req.session.data['backtocheckanswers'] = 'false'
        res.redirect('/hearings/pages/checkyouranswers');
    }
    else
    {
        res.redirect('/hearings/pages/startrequest')
    }
})




router.post('/hearings/pages/startrequest', function (req, res)
{
    res.redirect('/hearings/pages/channel')
})





// router.post('/hearings/pages/startrequest', function (req, res)
// {
//     // If coming from check answers page then return there after clicking continue
//     if(req.session.data['backtocheckanswers'] == 'true' )
//     {
//         req.session.data['backtocheckanswers'] = 'false'
//         res.redirect('/hearings/pages/checkyouranswers');
//     }
//     else
//     {
//         res.redirect('/hearings/pages/partiyrequirements')
//     }
// })
//
//
//
//
// router.post('/hearings/pages/partiyrequirements', function (req, res)
// {
//     res.redirect('/hearings/pages/channel')
// })






// Select what channel the eharing will be held
// If it's an in person channel then the next page must be to select the hearing location
router.post('/hearings/pages/channel', function (req, res)
{
    // If coming from check answers page then return there after clicking continue
    if(req.session.data['backtocheckanswers'] == 'true' )
    {
        req.session.data['backtocheckanswers'] = 'false'
        res.redirect('/hearings/pages/checkyouranswers');
    }
    else
    {
        if(req.session.data['channelradios'] == 'In person')
        {
            res.redirect('/hearings/pages/venuedefault');
        }
        else
        {
            if( req.session.data['firsthearingscenario'] == 'true' )
            {
                res.redirect('/hearings/pages/paneldifferent');
            }
            else
            {
                res.redirect('/hearings/pages/panel');
            }
        }
    }
})


// If it is a first hearing then don't redirect to a page suggesting the same hearing panel
// First hearing will logically always be a new panel
router.post('/hearings/pages/venuedefault', function (req, res)
{
    //If coming from check answers page then return there after clicking continue
    if(req.session.data['backtocheckanswers'] == 'true' )
    {
        req.session.data['backtocheckanswers'] = 'false'
        res.redirect('/hearings/pages/checkyouranswers');
    }
    else
    {
        if( req.session.data['firsthearingscenario'] == 'true' )
        {
            res.redirect('/hearings/pages/paneldifferent');
        } else {
            res.redirect('/hearings/pages/panel');
        }
    }
})


// Page 2 to page 3
router.post('/hearings/pages/region', function (req, res)
{
    // Just go to the next page because the vanues are shown based on previous page data
    res.redirect('/hearings/pages/venue');
})



// Page 2 to page 3
router.post('/hearings/pages/venue', function (req, res)
{
    //console.log(req.session.data['placeholder']);

    req.session.data['thenevue'] = req.session.data['placeholder'];

    // If coming from check answers page then return there after clicking continue
    if(req.session.data['backtocheckanswers'] == 'true' && req.session.data['regionselection'] == 'Wales')
    {
        req.session.data['backtocheckanswers'] = 'false'
        res.redirect('/hearings/pages/language')
    }
    else if(req.session.data['backtocheckanswers'] == 'true' && req.session.data['regionselection'] != 'Wales') {
        req.session.data['backtocheckanswers'] = 'false'
        res.redirect('/hearings/pages/checkyouranswers')
    }
    else {
        if (req.session.data['firsthearingscenario'] == 'true') {
            res.redirect('/hearings/pages/venuedefault');
        }
        else {
            res.redirect('/hearings/pages/venuedefault');
        }
    }







    // If coming from check answers page then return there after clicking continue
    // if(req.session.data['backtocheckanswers'] == 'true' )
    // {
    //     req.session.data['backtocheckanswers'] = 'false'
    //     res.redirect('/hearings/pages/checkyouranswers');
    // }
    // else {
    //     if (req.session.data['firsthearingscenario'] == 'true') {
    //         res.redirect('/hearings/pages/venuedefault');
    //     }
    //     else {
    //         res.redirect('/hearings/pages/venuedefault');
    //     }
    // }
})

// Page 3 to page 4
router.post('/hearings/pages/panel', function (req, res)
{
    // If coming from check answers page then return there after clicking continue
    if(req.session.data['backtocheckanswers'] == 'true' )
    {
        req.session.data['backtocheckanswers'] = 'false'
        res.redirect('/hearings/pages/checkyouranswers');
    }
    else {
        if (req.session.data['panelsame'] != 'Yes - use the same panel as most recent hearing') {
            res.redirect('/hearings/pages/paneldifferent')
        }
        else {
            res.redirect('/hearings/pages/timing')
        }
    }
})


// Page 3 to page 4
router.post('/hearings/pages/paneldifferent', function (req, res)
{
    // This is tedious and lazy logic of inplenting the checkboxes
    req.session.data['panelmemeberlist'] = '';

    if(req.session.data['panelmember1'] == 'on')
    {
        req.session.data['panelmemeberlist'] = req.session.data['panelmemeberlist'] +  "Regional Medical Member";
    }
    if(req.session.data['panelmember2'] == 'on')
    {
        req.session.data['panelmemeberlist'] = req.session.data['panelmemeberlist'] + "\nTribunal Medical Member";
    }
    if(req.session.data['panelmember3'] == 'on')
    {
        req.session.data['panelmemeberlist'] = req.session.data['panelmemeberlist'] + "\nTribunal Specialist Medical Member";
    }
    if(req.session.data['panelmember4'] == 'on')
    {
        req.session.data['panelmemeberlist'] = req.session.data['panelmemeberlist'] + "\nDisability Qualified Member";
    }


    // If coming from check answers page then return there after clicking continue
    if(req.session.data['backtocheckanswers'] == 'true' )
    {
        req.session.data['backtocheckanswers'] = 'false'
        res.redirect('/hearings/pages/checkyouranswers');
    }
    else
    {
        res.redirect('/hearings/pages/timing')
    }
})



// Page 4 to page 5
router.post('/hearings/pages/timing', function (req, res)
{

    // TIME DURATION
    req.session.data['theduration'] = '';
    if(req.session.data['durationradios'] == '45 minutes')
    {
        req.session.data['theduration'] = '45 minutes';
    }
    else
    {
        req.session.data['theduration'] = req.session.data['durationhours'] + " hour " +  req.session.data['durationmins']  + " minutes"
    }


    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    // DATES
    // Convert number dates into the GDS normal format
    if(req.session.data['dateradios'] == 'No' )
    {
        req.session.data['firstdateday'] = '';
        req.session.data['firstdatemonth'] = '';
        req.session.data['firstdateyear'] = '';

        // Clear other options data
        req.session.data['earliestdateday'] = '';
        req.session.data['earliestdatemonth'] = '';
        req.session.data['earliestdateyear'] = '';
        req.session.data['latestdateday'] = '';
        req.session.data['latestdatemonth'] = '';
        req.session.data['latestdateyear'] = '';
    }
    else if(req.session.data['dateradios'] == 'Yes' )
    {
        req.session.data['firstdateoutputtext'] = '';
        var firstmonth = parseInt(req.session.data['firstdatemonth']);

        req.session.data['firstdateoutputtext'] = req.session.data['firstdateday'] + " " + months[firstmonth-1] + " " + req.session.data['firstdateyear'];

        // Clear other options data
        req.session.data['earliestdateday'] = '';
        req.session.data['earliestdatemonth'] = '';
        req.session.data['earliestdateyear'] = '';
        req.session.data['latestdateday'] = '';
        req.session.data['latestdatemonth'] = '';
        req.session.data['latestdateyear'] = '';
    }
    else if(req.session.data['dateradios'] == 'Choose a date range' )
    {

        // Earliest date
        req.session.data['earliestdateoutputtext'] = '';
        if(req.session.data['earliestdatemonth'] != '')
        {
            var earliestmonth = parseInt(req.session.data['earliestdatemonth']);
            req.session.data['earliestdateoutputtext'] = req.session.data['earliestdateday'] + " " + months[earliestmonth-1] + " " + req.session.data['earliestdateyear'];
        }

        // Last date
        req.session.data['latestdateoutputtext'] = '';
        if(req.session.data['latestdatemonth'] != '')
        {
            var latestmonth = parseInt(req.session.data['latestdatemonth']);
            req.session.data['latestdateoutputtext'] = req.session.data['latestdateday'] + " " + months[latestmonth-1] + " " + req.session.data['latestdateyear'];
        }

        // Clear other options data
        req.session.data['firstdateday'] = '';
        req.session.data['firstdatemonth'] = '';
        req.session.data['firstdateyear'] = '';
    }


    // PRIORITY
    req.session.data['priorityoutput'] = '';

    if(req.session.data['priority'] == 'on')
    {
        req.session.data['priorityoutput'] = "Priority";
    }

    // ROUTING

    if(req.session.data['regionselection'] == 'Wales')
    {
        res.redirect('/hearings/pages/language')
    }
    else if(req.session.data['backtocheckanswers'] == 'true')
    {
        req.session.data['backtocheckanswers'] = 'false'
        res.redirect('/hearings/pages/checkyouranswers');
    }
    else
    {
        res.redirect('/hearings/pages/checkyouranswers');
    }


    // if(req.session.data['backtocheckanswers'] == 'true' )
    // {
    //     req.session.data['backtocheckanswers'] = 'false'
    //     res.redirect('/hearings/pages/checkyouranswers');
    // }
    // else
    // {
    //     res.redirect('/hearings/pages/checkyouranswers');
    // }

})



//  Language always is the last page
router.post('/hearings/pages/language', function (req, res)
{
    res.redirect('/hearings/pages/checkyouranswers')
})





// Check annswers page which always goes to coonfirmation
// this page should ideally never haver any validation on it.  Valdation should be done on each page.
router.post('/hearings/pages/checkyouranswers', function (req, res)
{
    req.session.data['submissioncomplete'] = 'true';
    req.session.data['justsubmitted'] = 'true';


    if(req.session.data['drafthearing'] != 'false' )
    {
        res.redirect('/hearings/pages/confirmation');
    }
    else
    {
        res.redirect('/hearings/pages/confirmchangesubmission');
    }
})



router.post('/hearings/pages/confirmchangesubmission', function (req, res)
{
    res.redirect('/hearings/pages/confirmation');
})
































// Branching
router.post('/v3/cases/method', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let over18 = req.session.data['over-18']

  if (over18 === 'false') {
    res.redirect('/v3/cases/details')
  } else {
    res.redirect('/v3/cases/details-post')
  }
})























///////////////////////////////////////
////////////////////////////////////////////////////
//  CASE SEARCH
/////////////////////////////////////
///////////////////////////////////////////////


// Start new search
router.get( '/searchcases/pages/startsearch', function (req, res)
{
    req.session.data['errorcasenumber'] = 'false';
    req.session.data['errorpostcodeinvalid'] = 'false';
    req.session.data['erroremail'] = 'false';
    req.session.data['errorallfieldsempty'] = 'false';

    req.session.data['hmctsref'] = '';
    req.session.data['otherref'] = '';
    req.session.data['names'] = '';
    req.session.data['postcode'] = '';
    req.session.data['email'] = '';
    req.session.data['searchday'] = '';
    req.session.data['searchmonth'] = '';
    req.session.data['searchyear'] = '';

    res.redirect('/searchcases/pages/search');
})




// If the user enters a ccd reference number then take them directly to the case
router.post( '/searchcases/pages/search', function (req, res)
{
    // set results to show normal amount, NOT 'many results'
    req.session.data['results'] = 'three';

    // Set the error state to normal
    req.session.data['errorcasenumber'] = 'false';
    req.session.data['errorpostcodeinvalid'] = 'false';
    req.session.data['erroremail'] = 'false';

    // Check if the user has entered an HMCTS reference
    if(req.session.data['hmctsref'] == '')
    {
        //If no reference is entered then we make one up for them
        req.session.data['casereference'] = '8771785741275065';


        // Check if there is another reference
        if(req.session.data['otherref'] == '')
        {}
        else
        {
            // TASK 3- IAC scenario
            if(req.session.data['otherref'].toString().includes("PA/52185/2021"))
            {
                req.session.data['results'] = 'iactask3';
                res.redirect('/searchcases/pages/loading-screen');
            }
            // TASK 3 - SSCS scenario
            else if(req.session.data['otherref'].toString().includes("JL427586K"))
            {
                req.session.data['results'] = 'sscstask3';
                res.redirect('/searchcases/pages/loading-screen');
            }

            // TASK 4 - IAC scenario
            else if(req.session.data['otherref'].toString().includes("5/2021")  &&  (req.session.data['otherref'].toString().includes("*") ||  req.session.data['otherref'].toString().includes("?")))
            {
                if(req.session.data['names'] == 'Mohammed'  ||  req.session.data['names'] == 'mohammed'  )
                {
                    res.redirect('/searchcases/pages/noresults');
                }
                else if( (req.session.data['names'].toString().includes("Mohammed") ||   req.session.data['names'].toString().includes("mohammed"))
                    &&  (req.session.data['names'].toString().includes("*") ||  req.session.data['names'].toString().includes("?")))
                {
                    req.session.data['results'] = 'iactask4';
                }
                else
                {
                    res.redirect('/searchcases/pages/noresults');
                }
                res.redirect('/searchcases/pages/loading-screen');
            }
            // TASK 4 - SCSS scenario
            else if(  ( req.session.data['otherref'].toString().includes("JL869")   ||  req.session.data['otherref'].toString().includes("jl869")  )
                &&  (req.session.data['otherref'].toString().includes("*") ||  req.session.data['otherref'].toString().includes("????")))
            {
                if(req.session.data['names'] == ''  )
                {
                    res.redirect('/searchcases/pages/loading-screen-time-out');
                }
                else if(req.session.data['names'] == 'Tom J'  ||  req.session.data['names'] == 'Tom j'  ||  req.session.data['names'] == 'tom j'   ||  req.session.data['names'] == 'tom J' )
                {
                    res.redirect('/searchcases/pages/noresults');
                }
                else if(  ( req.session.data['names'].toString().includes("Tom J")  ||  req.session.data['names'].toString().includes("Tom j")
                            ||  req.session.data['names'].toString().includes("tom j")   ||  req.session.data['names'].toString().includes("tom J") )
                    &&  (req.session.data['names'].toString().includes("*") ||  req.session.data['names'].toString().includes("????")) )
                {
                    req.session.data['results'] = 'sscstask2';
                }
                else
                {
                    res.redirect('/searchcases/pages/noresults');
                }
                res.redirect('/searchcases/pages/loading-screen');
            }

            // TASK 5 - IAC scenario
            else if(req.session.data['otherref'].toString().includes("IA/58778/2021"))
            {
                res.redirect('/searchcases/pages/noresults');
            }
            else
            {
                res.redirect('/searchcases/pages/noresults');
            }
        }


        // If a known name is entered then go to specific results
        if(req.session.data['names'] == '')
        { }

        // Family - TASK 1
        else if(  req.session.data['names'] == 'Timothy Jones' ||   req.session.data['names'] == 'timothy jones'  )
        {
            res.redirect('/searchcases/pages/loading-screen-time-out');
        }

        // IAC - TASK 3
        else if(  req.session.data['names'] == 'Talha Awan' ||   req.session.data['names'] == 'talha awan'   )
        {
            if( req.session.data['sscstasktesting'] == '1'  )
            {

                req.session.data['results'] = 'sscstask1';
                res.redirect('/searchcases/pages/loading-screen');
            }
            else
            {
                req.session.data['results'] = 'iactask311';
                res.redirect('/searchcases/pages/loading-screen');
            }

        }

        // IAC - TASK 4
        else if(  ( req.session.data['names'].toString().includes("Mohammed")  ||  req.session.data['names'].toString().includes("mohammed")  )
            &&  (req.session.data['names'].toString().includes("*") ||  req.session.data['names'].toString().includes("?")) )
        {
            if(req.session.data['otherref'] == '')
            {
                res.redirect('/searchcases/pages/loading-screen-time-out');
            }
            else
            {
                res.redirect('/searchcases/pages/noresults');
            }
        }
        // SSCS - TASK 4
        else if(  ( req.session.data['names'].toString().includes("Tom")  ||  req.session.data['names'].toString().includes("tom")  )
            &&  ( req.session.data['names'].toString().includes("J") ||  req.session.data['names'].toString().includes("j") ) )
        {
            if(req.session.data['otherref'] == '' &&  (req.session.data['names'].toString().includes("*")  ||  req.session.data['names'].toString().includes("????")) )
            {
                res.redirect('/searchcases/pages/loading-screen-time-out');
            }
            else
            {
                res.redirect('/searchcases/pages/noresults');
            }
        }

        else if(req.session.data['names'] == 'Sufjan Remi' ||  req.session.data['names'] == 'Edward Samuels' )
        {
            res.redirect('/searchcases/pages/noresults');
        }
        else
        {
            res.redirect('/searchcases/pages/noresults');
        }



        // If a postcode is entered we validate against it
        if(req.session.data['postcode'] != '')
        {
            if (req.session.data['postcode'].length < 6  ||  9 < req.session.data['postcode'].length)
            {
                req.session.data['errorpostcodeinvalid'] = 'true';
                res.redirect('/searchcases/pages/search');
            }
            else
            {
                // Postcode is valid so continue to results
            }
        }

        // If a postcode is entered we validate against it
        if(req.session.data['email'] != '')
        {
            //console.log( "content is " + req.session.data['email'].includes("@"));

            // Check email contains correct symbols
            if( req.session.data['email'].includes("@") == false )
            {
                req.session.data['erroremail'] = 'true';
                res.redirect('/searchcases/pages/search');
            }
            else
            {
                // email is valid so continue to results
            }
        }



        res.redirect('/searchcases/pages/loading-screen');
    }

    //MAIN REFERENCE ENTERED
    else
    {
        // if the hmcts reference is too short or too long them reload the page with an exception
        // FAMILY PARTIAL DETAILS
        if(  ( req.session.data['hmctsref'].toString().includes("70014009")   ||  req.session.data['hmctsref'].toString().includes("7001-4009") )
            &&  (req.session.data['hmctsref'].toString().includes("*") ||  req.session.data['hmctsref'].toString().includes("????????")))
        {
            if(req.session.data['names'] == '')
            {
                res.redirect('/searchcases/pages/loading-screen-time-out');
            }
            if(req.session.data['names'] == 'Tom J'  ||  req.session.data['names'] == 'tom J'  ||  req.session.data['names'] == 'Tom j'   ||  req.session.data['names'] == 'tom j' )
            {
                res.redirect('/searchcases/pages/noresults');
            }
            else if(  ( req.session.data['names'].toString().includes("Tom")  ||  req.session.data['names'].toString().includes("Tom") )
                &&  (req.session.data['names'].toString().includes("J*") ||  req.session.data['names'].toString().includes("j*")) )
            {
                req.session.data['results'] = 'family2';
            }
            else
            {
                res.redirect('/searchcases/pages/noresults');
            }
            res.redirect('/searchcases/pages/loading-screen');
        }

        else if(req.session.data['hmctsref'].length < 16  ||  20 < req.session.data['hmctsref'].length )
        {
            req.session.data['errorcasenumber'] = 'true';
            //console.warn("Main Router " + req.session.data['errorcasenumber']);
            res.redirect('/searchcases/pages/search');
        }
        else
        {
            // if the hmcts reference is valid then go straight to the case
            req.session.data['casereference'] = req.session.data['hmctsref'];

            if( req.session.data['casereference'].toString().includes("7495728506858694")  ||  req.session.data['casereference'].toString().includes("7495-7285-0685-8694")
                ||  req.session.data['casereference'].toString().includes("7495 7285 0685 8694")  )
            {
                req.session.data['results'] = 'sscstask3';
                res.redirect('/searchcases/pages/loading-screen');
            }
            else if( req.session.data['casereference'].toString().includes("7556 3296 6000 0123")
                    ||  req.session.data['casereference'].toString().includes("7556329660000123")
                    ||  req.session.data['casereference'].toString().includes("7556-3296-6000-0123") )
                {
                    res.redirect('/searchcases/pages/noresults');
                }

            else if( req.session.data['casereference'].toString().includes("4321 7285 0685 8694")
                        ||  req.session.data['casereference'].toString().includes("4321728506858694")
                        ||  req.session.data['casereference'].toString().includes("4321-7285-0685-8694") )
            {
                req.session.data['results'] = 'family1';
                res.redirect('/searchcases/pages/results');
            }
            else
            {
                res.redirect('/searchcases/pages/noresults');
            }

            res.redirect('/searchcases/pages/noresults');
        }
    }
})



// Go directly to a case
router.get( '/opencase', function (req, res)
{
    req.session.data['errorcasenumber'] = 'false';
    req.session.data['errorpostcodeinvalid'] = 'false';
    req.session.data['erroremail'] = 'false';
    req.session.data['errorallfieldsempty'] = 'false';

    req.session.data['hmctsref'] = '';
    req.session.data['otherref'] = '';
    req.session.data['names'] = '';
    req.session.data['postcode'] = '';
    req.session.data['email'] = '';

    req.session.data['casereference'] = req.session.data['hmctsrefheader'];

    if(req.session.data['casereference'].length < 16  ||  20 < req.session.data['casereference'].length )
    {
        req.session.data['hmctsref'] = req.session.data['hmctsrefheader'];
        req.session.data['errorcasenumber'] = 'true';
        //console.warn("Main Router " + req.session.data['errorcasenumber']);
        res.redirect('/searchcases/pages/search');
    }

    else if( req.session.data['casereference'].toString().includes("7495728506858694")  ||  req.session.data['casereference'].toString().includes("7495-7285-0685-8694")
        ||  req.session.data['casereference'].toString().includes("7495 7285 0685 8694")  )
    {
        res.redirect('/searchcases/pages/casedetailssscs?');
    }

    else if( req.session.data['casereference'].toString().includes("7556 3296 6000 0123")
        ||  req.session.data['casereference'].toString().includes("7556329660000123")
        ||  req.session.data['casereference'].toString().includes("7556-3296-6000-0123") )
    {
        res.redirect('/searchcases/pages/restricted');
    }

    else if( req.session.data['casereference'].toString().includes("4321 7285 0685 8694")
        ||  req.session.data['casereference'].toString().includes("4321728506858694")
        ||  req.session.data['casereference'].toString().includes("4321-7285-0685-8694") )
    {
        res.redirect('/searchcases/pages/casedetailsfamily');
    }

    else
    {
        req.session.data['hmctsref'] = req.session.data['hmctsrefheader'];
        res.redirect('/searchcases/pages/casedetailssscs?');
    }

})





















// NOTICE OF CHANGE
router.post( '/noticeofchange/solicitor/startorstop', function (req, res)
{
  if(req.session.data['startorstop'] == 'start')
  {
    res.redirect('/noticeofchange/solicitor/addenterdetails');
  }
  else
  {
    res.redirect('/noticeofchange/solicitor/caselist');
  }
})






// NOTICE OF CHANGE

////////////////////////////////////////////////////////////////////////////////////////////////
// Version 1 - No longer in use
router.get( '/noticeofchange/v1/startnoc', function (req, res)
{
    req.session.data['casenumber'] = '';
    req.session.data['errorcasenumber'] = 'false';

    req.session.data['role'] == 'undefined';
    req.session.data['errorrole'] = 'false';

    req.session.data['lastname'] == 'undefined'
    req.session.data['errorsecurityprobate'] = 'false';
    req.session.data['errorsecurityprobatewrongname'] = 'false';
    req.session.data['sot'] = 'undefined';

    req.session.data['day'] == '';
    req.session.data['month'] == '';
    req.session.data['year'] == '';
    req.session.data['errorsecuritydivorce'] = 'false';

    req.session.data['errorsot'] = 'false';

    res.redirect('/noticeofchange/v1/solicitor/addenterdetails');
})


router.post( '/noticeofchange/v1/solicitor/addenterdetails', function (req, res)
{
    //console.warn("Main Router " + req.session.data['casenumber'].length);
    if(req.session.data['casenumber'].length < 16  ||  20 < req.session.data['casenumber'].length )
    {
        req.session.data['errorcasenumber'] = 'true';
        //console.warn("Main Router " + req.session.data['errorcasenumber']);
        res.redirect('addenterdetails');
    }
    else
    {
        req.session.data['errorcasenumber'] = 'false';
        req.session.data['role'] = 'undefined';
        res.redirect('/noticeofchange/v1/solicitor/selectroleprobate');
    }
})

router.post( '/noticeofchange/v1/solicitor/selectroleprobate', function (req, res)
{
    if(req.session.data['role'] == 'undefined' )
    {
        req.session.data['errorrole'] = 'true';
        res.redirect('selectroleprobate');
    }
    else
    {
        req.session.data['errorrole'] = 'false';

        if(req.session.data['divorcecaselist'] == 'true' )
        {
            res.redirect('/noticeofchange/v1/solicitor/securityquestiondivorce');
        }
        else
        {
            res.redirect('/noticeofchange/v1/solicitor/securityquestionprobate');
        }

    }
})

router.post( '/noticeofchange/v1/solicitor/securityquestionprobate', function (req, res)
{
    console.warn("Main Router  " + req.session.data['lastname']);
    if(req.session.data['lastname'] == 'undefined' )
    {
        req.session.data['errorsecurityprobate'] = 'true';
        res.redirect('securityquestionprobate');
    }
    else
    {
        if(req.session.data['lastname'] != 'Narran'  &&  req.session.data['lastname'] != 'narran' )
        {
            req.session.data['errorsecurityprobatewrongname'] = 'true';
            res.redirect('securityquestionprobate');
        }
        else
        {
            req.session.data['errorsecurityprobate'] = 'false';
            req.session.data['errorsecurityprobatewrongname'] = 'false';
            req.session.data['sot'] = 'undefined';
            res.redirect('/noticeofchange/v1/solicitor/checkanswers');
        }
    }
})

router.post( '/noticeofchange/v1/solicitor/securityquestiondivorce', function (req, res)
{
    console.warn("Main Router  " + req.session.data['day']);
    if(req.session.data['day'] == ''  ||
        req.session.data['month'] == '' ||
        req.session.data['year'] == ''  )
    {
        req.session.data['errorsecuritydivorce'] = 'true';
        res.redirect('securityquestiondivorce');
    }
    else
    {
        var months = ['filler', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        req.session.data['monthoutput'] = months[req.session.data['month']];
        console.warn("Main Router " + req.session.data['monthoutput']);

        req.session.data['errorsecuritydivorce'] = 'false';
        req.session.data['sot'] = 'undefined';
        res.redirect('/noticeofchange/v1/solicitor/checkanswers');
    }
})

router.post( '/noticeofchange/v1/solicitor/checkanswers', function (req, res)
{
    console.warn("Main Router +" + req.session.data['sot']  + "+++");
    console.warn("****************************");
    if(req.session.data['sot'] != 'on' )
    {
        req.session.data['errorsot'] = 'true';
        res.redirect('checkanswers');
    }
    else
    {
        req.session.data['errorsot'] = 'false';
        res.redirect('/noticeofchange/v1/solicitor/confirmation?autoapproved=true&');
    }
})


// STOP REPRESENTING CLIENT
router.post( '/noticeofchange/v1/solicitor/casedetailsprobate', function (req, res)
{

    req.session.data['stopstop'] = '';

    res.redirect('/noticeofchange/v1/solicitor/confirmstop');
})

router.post( '/noticeofchange/v1/solicitor/casedetailsdivorce', function (req, res)
{

    req.session.data['stopstop'] = '';
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");

    res.redirect('/noticeofchange/v1/solicitor/confirmstop');
})

router.post( '/noticeofchange/v1/solicitor/confirmstop', function (req, res)
{
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");
    if(req.session.data['stopstop'] != 'on' )
    {
        req.session.data['errorstopconfirm'] = 'true';
        res.redirect('confirmstop');
    }
    else
    {
        req.session.data['errorstopconfirm'] = 'false';
        res.redirect('/noticeofchange/v1/solicitor/confirmationofstopping?stoppingoutcome=auto&');
    }
})

// NOT USED AS ROLE SEEMS TO BE WHO THEY ARE REPRESENTING
router.post( '/noticeofchange/v1/solicitor/selectrole', function (req, res)
{
    res.redirect('/noticeofchange/v1/solicitor/checkanswers');
})




////////////////////////////////////////////////////////////////////////////////////////////////
// Version 2 - No longer in use
router.get( '/noticeofchange/v2/startnoc', function (req, res)
{
    req.session.data['casenumber'] = '';
    req.session.data['errorcasenumber'] = 'false';

    req.session.data['role'] == 'undefined';
    req.session.data['errorrole'] = 'false';

    req.session.data['lastname'] = 'undefined'
    req.session.data['errorsecurityprobate'] = 'false';
    req.session.data['errorsecurityprobatewrongname'] = 'false';
    req.session.data['sot'] = 'undefined';

    req.session.data['day'] = '';
    req.session.data['month'] = '';
    req.session.data['year'] = '';
    req.session.data['errorsecuritydivorce'] = 'false';

    req.session.data['errorsot'] = 'false';

    res.redirect('/noticeofchange/v2/solicitor/addenterdetails');
})

router.post( '/noticeofchange/v2/solicitor/addenterdetails', function (req, res)
{
    //console.warn("Main Router " + req.session.data['casenumber'].length);
    if(req.session.data['casenumber'].length < 16  ||  20 < req.session.data['casenumber'].length )
    {
        req.session.data['errorcasenumber'] = 'true';
        //console.warn("Main Router " + req.session.data['errorcasenumber']);
        res.redirect('addenterdetails');
    }
    else
    {
        req.session.data['errorcasenumber'] = 'false';
        req.session.data['role'] = 'undefined';


        if(req.session.data['caselist'] == 'probate')
        {
            res.redirect('/noticeofchange/v2/solicitor/selectroleprobate');
        }
        else
        {
            req.session.data['caselist'] = 'divorce';
            res.redirect('/noticeofchange/v2/solicitor/selectroledivorce');
        }
    }
})

router.post( '/noticeofchange/v2/solicitor/selectroleprobate', function (req, res)
{
    if(req.session.data['role'] == 'undefined' )
    {
        req.session.data['errorrole'] = 'true';
        res.redirect('selectroleprobate');
    }
    else
    {
        req.session.data['errorrole'] = 'false';

        res.redirect('/noticeofchange/v2/solicitor/securityquestionprobate');
    }
})

router.post( '/noticeofchange/v2/solicitor/selectroledivorce', function (req, res)
{
    if(req.session.data['role'] == 'undefined' )
    {
        req.session.data['errorrole'] = 'true';
        res.redirect('selectroledivorce');
    }
    else
    {
        req.session.data['errorrole'] = 'false';

        res.redirect('/noticeofchange/v2/solicitor/securityquestiondivorce');
    }
})

router.post( '/noticeofchange/v2/solicitor/securityquestionprobate', function (req, res)
{
    console.warn("Main Router  " + req.session.data['lastname']);
    if(req.session.data['lastname'] == 'undefined' )
    {
        req.session.data['errorsecurityprobate'] = 'true';
        res.redirect('securityquestionprobate');
    }
    else
    {
        if(req.session.data['lastname'] != 'Narran'  &&  req.session.data['lastname'] != 'narran' )
        {
            req.session.data['errorsecurityprobatewrongname'] = 'true';
            res.redirect('securityquestionprobate');
        }
        else
        {
            req.session.data['errorsecurityprobate'] = 'false';
            req.session.data['errorsecurityprobatewrongname'] = 'false';
            req.session.data['sot'] = 'undefined';
            res.redirect('/noticeofchange/v2/solicitor/checkanswers');
        }
    }
})

router.post( '/noticeofchange/v2/solicitor/securityquestiondivorce', function (req, res)
{
    console.warn("Main Router  " + req.session.data['day']);
    if(req.session.data['day'] == ''  ||
        req.session.data['month'] == '' ||
        req.session.data['year'] == ''  )
    {
        req.session.data['errorsecuritydivorce'] = 'true';
        res.redirect('securityquestiondivorce');
    }
    else
    {
        var months = ['filler', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        req.session.data['monthoutput'] = months[req.session.data['month']];
        console.warn("Main Router " + req.session.data['monthoutput']);

        req.session.data['errorsecuritydivorce'] = 'false';
        req.session.data['sot'] = 'undefined';
        res.redirect('/noticeofchange/v2/solicitor/checkanswers');
    }
})

router.post( '/noticeofchange/v2/solicitor/checkanswers', function (req, res)
{
    console.warn("Main Router +" + req.session.data['sot']  + "+++");
    console.warn("****************************");
    if(req.session.data['solicitorhasalready'] == 'true' )
    {
        // where solicitor in firm already has case
        res.redirect('alreadygotcaseerror');
    }
    else if(req.session.data['sot'] != 'on' )
    {
        req.session.data['errorsot'] = 'true';
        res.redirect('checkanswers');
    }
    else
    {
        // Sort out the data and time of right now
        var months = ['filler', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        var currentDate = new Date()
        var day = currentDate.getDate()
        var monthtoday = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()

        var timenowis = currentDate.toLocaleString('en-US', { hour: 'numeric',  minute: 'numeric', second: 'numeric', hour12: true })

        req.session.data['todaydate'] = day + " " + months[monthtoday] + " " + year;
        req.session.data['todaydatetime'] = timenowis;
        req.session.data['errorsot'] = 'false';
        req.session.data['casenumberselected'] = req.session.data['casenumber'];
        req.session.data['caseadded'] = 'true';
        req.session.data['adminonly'] = 'true';
        res.redirect('/noticeofchange/v2/solicitor/confirmation?autoapproved=true&adminonly=false&servicedown=false&');
    }
})



// STOP REPRESENTING CLIENT - V2
router.post( '/noticeofchange/v2/solicitor/casedetailsprobate', function (req, res)
{
    req.session.data['stopstop'] = '';

    res.redirect('/noticeofchange/v2/solicitor/stopselectclients');
})

router.post( '/noticeofchange/v2/solicitor/casedetailsdivorce', function (req, res)
{
    req.session.data['stopstop'] = '';
    req.session.data['stoppingmoredetail'] = '';
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");

    res.redirect('/noticeofchange/v2/solicitor/stopselectclients');
})

router.post( '/noticeofchange/v2/solicitor/casedetailsimmigration', function (req, res)
{
    req.session.data['stopstop'] = '';
    req.session.data['stoppingmoredetail'] = '';
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");

    res.redirect('/noticeofchange/v2/solicitor/stopselectclients');
})

router.post( '/noticeofchange/v2/solicitor/casedetailspubliclaw', function (req, res)
{
    req.session.data['stopstop'] = '';
    req.session.data['stoppingmoredetail'] = '';
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");

    res.redirect('/noticeofchange/v2/solicitor/stopselectclients');
})

router.post( '/noticeofchange/v2/solicitor/stopselectclients', function (req, res)
{
    if(req.session.data['clientselected'] != 'on' )
    {
        req.session.data['errorstopnoperson'] = 'true';
        res.redirect('stopselectclients');
    }
    else
    {
        req.session.data['errorstopnoperson'] = 'false';
        res.redirect('/noticeofchange/v2/solicitor/stopreason');
    }

})

router.post( '/noticeofchange/v2/solicitor/stopreason', function (req, res)
{
    res.redirect('/noticeofchange/v2/solicitor/confirmstop');
})

router.post( '/noticeofchange/v2/solicitor/confirmstop', function (req, res)
{
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");

    console.warn("case to hide  +" + req.session.data['casetohide']  + "+++");
    if (req.session.data['casetohide'] == 'a')
    {
        req.session.data['hideone'] = 'true';
    }
    else if (req.session.data['casetohide'] == 'b')
    {
        req.session.data['hidetwo'] = 'true';
    }
    else if (req.session.data['casetohide'] == 'c')
    {
        req.session.data['hidethree'] = 'true';
    }

    // Redirect to correct confirmation style
    res.redirect('/noticeofchange/v2/solicitor/confirmationofstopping');



})



















////////////////////////////////////////////////////////////////////////////////////////////////
// Latest version
router.get( '/noticeofchange/startnoc', function (req, res)
{
    // Resetting all the data before the user starts
    req.session.data['casenumber'] = '';
    req.session.data['errorcasenumber'] = 'false';
    req.session.data['serviceeligibilityerror'] = 'false';

    req.session.data['role'] == 'undefined';
    req.session.data['errorrole'] = 'false';

    req.session.data['title'] = '';
    req.session.data['firstname'] = '';
    req.session.data['lastname'] = '';
    req.session.data['errorsecurityprobate'] = 'false';
    req.session.data['errorsecurityprobatewrongname'] = 'false';
    req.session.data['sot'] = 'undefined';

    req.session.data['errorsecuritydivorce'] = 'false';
    req.session.data['errorsecuritydivorcefirstname'] = 'false';
    req.session.data['errorsecuritydivorcelastname'] = 'false';

    req.session.data['errorsecurityprobate'] = 'false';

    req.session.data['errorsecurityprobatetitle'] = 'false';
    req.session.data['errorsecurityprobatefirstname'] = 'false';
    req.session.data['errorsecurityprobatelastname'] = 'false';

    req.session.data['errorsecurityprobatedate'] = 'false';
    req.session.data['errorsecurityprobatedateday'] = 'false';
    req.session.data['errorsecurityprobatedatemonth'] = 'false';
    req.session.data['errorsecurityprobatedateyear'] = 'false';


    req.session.data['day'] = '';
    req.session.data['month'] = '';
    req.session.data['year'] = '';
    req.session.data['errorsecuritydivorce'] = 'false';

    req.session.data['errornomatch'] = 'false';

    req.session.data['errorsot'] = 'false';

    res.redirect('/noticeofchange/solicitor/addenterdetails');
})

router.post( '/noticeofchange/solicitor/addenterdetails', function (req, res)
{
    //console.warn("Main Router " + req.session.data['casenumber'].length);
    if(req.session.data['casenumber'].length < 16  ||  20 < req.session.data['casenumber'].length )
    {
        req.session.data['errorcasenumber'] = 'true';
        //console.warn("Main Router " + req.session.data['errorcasenumber']);
        res.redirect('addenterdetails');
    }
    else
    {
        req.session.data['errorcasenumber'] = 'false';
        req.session.data['role'] = 'undefined';


        if(req.session.data['caselist'] == 'probate')
        {
            res.redirect('/noticeofchange/solicitor/securityquestionprobate');
        }
        else
        {
            req.session.data['caselist'] = 'divorce';
            res.redirect('/noticeofchange/solicitor/securityquestiondivorce');
        }
    }
})

router.post( '/noticeofchange/solicitor/selectroleprobate', function (req, res)
{
    console.warn("orobate radio selection +" + req.session.data['role']  + "+++");
    if(req.session.data['role'] == 'undefined' )
    {
        req.session.data['errorrole'] = 'true';
        res.redirect('selectroleprobate');
    }
    else
    {
        req.session.data['errorrole'] = 'false';

        res.redirect('/noticeofchange/solicitor/securityquestionprobate');
    }
})

router.post( '/noticeofchange/solicitor/selectroledivorce', function (req, res)
{
    if(req.session.data['role'] == 'undefined' )
    {
        req.session.data['errorrole'] = 'true';
        res.redirect('selectroledivorce');
    }
    else
    {
        req.session.data['errorrole'] = 'false';

        res.redirect('/noticeofchange/solicitor/securityquestiondivorce');
    }
})

router.post( '/noticeofchange/solicitor/securityquestionprobate', function (req, res)
{

    console.warn("Main Router THE NAME IS " + req.session.data['lastname']);

    if(req.session.data['firstname'] == 'Joe'  ||  req.session.data['firstname'] == 'joe')
    {
        req.session.data['errorsecurityprobate'] = 'true';
        req.session.data['errornomatch'] = 'true';

        req.session.data['errorsecurityprobatetitle'] = 'false';
        req.session.data['errorsecurityprobatefirstname'] = 'false';
        req.session.data['errorsecurityprobatelastname'] = 'false';
        req.session.data['errorsecurityprobatedate'] = 'false';

        req.session.data['errorsecurityprobatedateday'] = 'false';
        req.session.data['errorsecurityprobatedatemonth'] = 'false';
        req.session.data['errorsecurityprobatedateyear'] = 'false';

        res.redirect('securityquestionprobate');
    }

    else if(req.session.data['lastname'] == '' || req.session.data['firstname'] == '' || req.session.data['title'] == '' ||
        req.session.data['day'] == ''  ||
        req.session.data['month'] == '' ||
        req.session.data['year'] == ''  )
    {
        req.session.data['errornomatch'] = 'false';
        req.session.data['errorsecurityprobate'] = 'true'
        if(req.session.data['title'] == '')
        {
            req.session.data['errorsecurityprobatetitle'] = 'true'
        }
        else
        {
            req.session.data['errorsecurityprobatetitle'] = 'false';
        }
        if(req.session.data['firstname'] == '')
        {
            req.session.data['errorsecurityprobatefirstname'] = 'true'
        }
        else
        {
            req.session.data['errorsecurityprobatefirstname'] = 'false';
        }
        if(req.session.data['lastname'] == '')
        {
            req.session.data['errorsecurityprobatelastname'] = 'true'
        }
        else
        {
            req.session.data['errorsecurityprobatelastname'] = 'false';
        }

        if(req.session.data['day'] == '')
        {
            req.session.data['errorsecurityprobatedate'] = 'true'
            req.session.data['errorsecurityprobatedateday'] = 'true'
        }
        else
        {
            req.session.data['errorsecurityprobatedateday'] = 'false';
        }
        if(req.session.data['month'] == '')
        {
            req.session.data['errorsecurityprobatedate'] = 'true'
            req.session.data['errorsecurityprobatedatemonth'] = 'true'
        }
        else
        {
            req.session.data['errorsecurityprobatedatemonth'] = 'false';
        }
        if(req.session.data['year'] == '')
        {
            req.session.data['errorsecurityprobatedate'] = 'true'
            req.session.data['errorsecurityprobatedateyear'] = 'true'
        }
        else
        {
            req.session.data['errorsecurityprobatedateyear'] = 'false';
        }

        //  The date has no errors
        if(req.session.data['day'] != ''  &&
            req.session.data['month'] != '' &&
            req.session.data['year'] != ''  )
        {
            req.session.data['errorsecurityprobatedate'] = 'false'
        }

        res.redirect('securityquestionprobate');
    }
    else
    {
        req.session.data['tempmonthdateformat'] = req.session.data['month'];
        //work with 01 month format
        console.warn("Date substring is :  " +  req.session.data['tempmonthdateformat'].substring(0, 1));
        if(req.session.data['tempmonthdateformat'].substring(0, 1) == '0')
        {
            req.session.data['tempmonthdateformat'] = req.session.data['tempmonthdateformat'].substring(1, 2)
            console.warn("BRAND NEW  date is :  " +  req.session.data['tempmonthdateformat']);
        }

        var months = ['filler', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        req.session.data['monthoutput'] = months[req.session.data['tempmonthdateformat']];
        console.warn("Main Router " + req.session.data['monthoutput']);


        // Clear all the errors
        req.session.data['errorsecurityprobate'] = 'false';

        req.session.data['errorsecurityprobatetitle'] = 'false';
        req.session.data['errorsecurityprobatefirstname'] = 'false';
        req.session.data['errorsecurityprobatelastname'] = 'false';

        req.session.data['errorsecurityprobatedate'] = 'false'
        req.session.data['errorsecurityprobatedateday'] = 'false';
        req.session.data['errorsecurityprobatedatemonth'] = 'false';
        req.session.data['errorsecurityprobatedateyear'] = 'false';

        res.redirect('/noticeofchange/solicitor/checkanswers');

    }


})

router.post( '/noticeofchange/solicitor/securityquestiondivorce', function (req, res)
{
    console.warn("Main Router THE NAME IS " + req.session.data['lastname']);

    if(req.session.data['firstname'] == 'Joe'  ||  req.session.data['firstname'] == 'joe')
    {
        req.session.data['errorsecuritydivorce'] = 'true';
        req.session.data['errornomatch'] = 'true';

        req.session.data['errorsecuritydivorcefirstname'] = 'false';
        req.session.data['errorsecuritydivorcelastname'] = 'false';

        res.redirect('securityquestiondivorce');
    }
    else if(req.session.data['lastname'] == '' || req.session.data['firstname'] == '')
    {
        req.session.data['errorsecuritydivorce'] = 'true'
        req.session.data['errornomatch'] = 'false';
        if(req.session.data['firstname'] == '')
        {
            req.session.data['errorsecuritydivorcefirstname'] = 'true'
        }
        else
        {
            req.session.data['errorsecuritydivorcefirstname'] = 'false';
        }
        if(req.session.data['lastname'] == '')
        {
            req.session.data['errorsecuritydivorcelastname'] = 'true'
        }
        else
        {
            req.session.data['errorsecuritydivorcelastname'] = 'false';
        }

        res.redirect('securityquestiondivorce');
    }
    else
    {
            req.session.data['errorsecuritydivorce'] = 'false';
            req.session.data['errorsecuritydivorcefirstname'] = 'false';
            req.session.data['errorsecuritydivorcelastname'] = 'false';
            res.redirect('/noticeofchange/solicitor/checkanswers');

    }

    /*
    if(req.session.data['day'] == ''  ||
        req.session.data['month'] == '' ||
        req.session.data['year'] == ''  )
    {
        req.session.data['errorsecuritydivorce'] = 'true';
        res.redirect('securityquestiondivorce');
    }
    else
    {
        req.session.data['tempmonthdateformat'] = req.session.data['month'];
        //work with 01 month format
        console.warn("Date substring is :  " +  req.session.data['tempmonthdateformat'].substring(0, 1));
        if(req.session.data['tempmonthdateformat'].substring(0, 1) == '0')
        {
            req.session.data['tempmonthdateformat'] = req.session.data['tempmonthdateformat'].substring(1, 2)
            console.warn("BRAND NEW  date is :  " +  req.session.data['tempmonthdateformat']);
        }

        var months = ['filler', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        req.session.data['monthoutput'] = months[req.session.data['tempmonthdateformat']];
        console.warn("Main Router " + req.session.data['monthoutput']);

        req.session.data['errorsecuritydivorce'] = 'false';
        req.session.data['sot'] = 'undefined';
        res.redirect('/noticeofchange/solicitor/checkanswers');
    }

    */
})

router.post( '/noticeofchange/solicitor/checkanswers', function (req, res)
{
    console.warn("Main Router +" + req.session.data['sot']  + "+++");
    console.warn("****************************");
    if(req.session.data['solicitorhasalready'] == 'true' )
    {
        // where solicitor in firm already has case
        res.redirect('alreadygotcaseerror');
    }
    else if(req.session.data['sot'] != 'on'  ||   req.session.data['noticecheckbox'] != 'on' )
    {
        if(req.session.data['sot'] != 'on')
        {
            req.session.data['errorsot'] = 'true';
        }
        else
        {
            req.session.data['errorsot'] = 'false';
        }

        if(req.session.data['noticecheckbox'] != 'on' )
        {
            req.session.data['errorgivennotice'] = 'true';
        }
        else
        {
            req.session.data['errorgivennotice'] = 'false';
        }

        res.redirect('checkanswers');
    }
    else
    {
        // Sort out the data and time of right now
        var months = ['filler', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        var currentDate = new Date()
        var day = currentDate.getDate()
        var monthtoday = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()

        var timenowis = currentDate.toLocaleString('en-US', { hour: 'numeric',  minute: 'numeric', second: 'numeric', hour12: true })

        req.session.data['todaydate'] = day + " " + months[monthtoday] + " " + year;
        req.session.data['todaydatetime'] = timenowis;
        req.session.data['errorsot'] = 'false';
        req.session.data['errorgivennotice'] = 'false';
        req.session.data['casenumberselected'] = req.session.data['casenumber'];
        req.session.data['caseadded'] = 'true';
        req.session.data['adminonly'] = 'true';
        res.redirect('/noticeofchange/solicitor/confirmation?autoapproved=true&adminonly=false&servicedown=false&');
    }
})



// STOP REPRESENTING CLIENT
router.post( '/noticeofchange/solicitor/casedetailsprobate', function (req, res)
{
    req.session.data['stopstop'] = '';

    res.redirect('/noticeofchange/solicitor/stopselectclients');
})

router.post( '/noticeofchange/solicitor/casedetailsdivorce', function (req, res)
{
    req.session.data['stopstop'] = '';
    req.session.data['stoppingmoredetail'] = '';
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");

    res.redirect('/noticeofchange/solicitor/stopselectclients');
})

router.post( '/noticeofchange/solicitor/casedetailsimmigration', function (req, res)
{
    req.session.data['stopstop'] = '';
    req.session.data['stoppingmoredetail'] = '';
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");

    res.redirect('/noticeofchange/solicitor/stopselectclients');
})

router.post( '/noticeofchange/solicitor/casedetailspubliclaw', function (req, res)
{
    req.session.data['stopstop'] = '';
    req.session.data['stoppingmoredetail'] = '';
    req.session.data['clientselected'] = 'undefined'
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");

    res.redirect('/noticeofchange/solicitor/stopselectclients');
})

router.post( '/noticeofchange/solicitor/stopselectclients', function (req, res)
{
    console.warn("stop client selected +" + req.session.data['clientselectedradio']  + "+++");

    if(req.session.data['clientselectedradio'] == 'undefined' )
    {
        req.session.data['errorstopnoperson'] = 'true';
        res.redirect('stopselectclients');
    }
    else
    {
        req.session.data['errorstopnoperson'] = 'false';
        res.redirect('/noticeofchange/solicitor/stopsot');
    }

})

router.post( '/noticeofchange/solicitor/stopreason', function (req, res)
{
    res.redirect('/noticeofchange/solicitor/stopsot');
})


router.post( '/noticeofchange/solicitor/stopsot', function (req, res)
{
    res.redirect('/noticeofchange/solicitor/confirmstop');
})


router.post( '/noticeofchange/solicitor/confirmstop', function (req, res)
{
    console.warn("stop checkbox +" + req.session.data['stopstop']  + "+++");

        console.warn("case to hide  +" + req.session.data['casetohide']  + "+++");
        if (req.session.data['casetohide'] == 'a')
        {
            req.session.data['hideone'] = 'true';
        }
        else if (req.session.data['casetohide'] == 'b')
        {
            req.session.data['hidetwo'] = 'true';
        }
        else if (req.session.data['casetohide'] == 'c')
        {
            req.session.data['hidethree'] = 'true';
        }

        // Redirect to correct confirmation style
            res.redirect('/noticeofchange/solicitor/confirmationofstopping');



})



// NOT USED AS ROLE SEEMS TO BE WHO THEY ARE REPRESENTING
router.post( '/noticeofchange/solicitor/selectrole', function (req, res)
{
    res.redirect('/noticeofchange/solicitor/checkanswers');
})








//////////////////////////////////////////////////////////////////////////////////
////////////// SEARCH FOR ORG FOR A CITIZEN DICORCE APPLENT //////////////////////
//////////////////////////////////////////////////////////////////////////////////


router.post( '/searchorgs/search/divorce1', function (req, res)
{
    if(req.session.data['represented'] == 'yes')
    {
        res.redirect('/searchorgs/search/divorce2');
    }
    else
    {
        res.redirect('/searchorgs/search/therestofapplication');
    }
})


router.post( '/searchorgs/search/divorce2', function (req, res)
{
    if(req.session.data['firmname'] == 'yes')
    {
        res.redirect('/searchorgs/search/divorce3');
    }
    else
    {
        res.redirect('/searchorgs/search/therestofapplication');
    }
})


router.post( '/searchorgs/search/divorce3', function (req, res)
{
    res.redirect('/searchorgs/search/therestofapplication');
})




//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
