/**
  * A script to retrieve account, web properties, profiles, goals and segments from Google Analytics using the Google Analytics Management API.
 *
 * @author carmen@mardiros.net (Carmen Mardiros)
 * Twitter: https://twitter.com/carmenmardiros
 * Linkedin: http://www.linkedin.com/in/carmenmardiros
 * Website: http://www.clearclues.com/
 */

function deleteTriggers() {
  var allTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
      ScriptApp.deleteTrigger(allTriggers[i]);
  }
}


function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Instructions");

  var menuEntries = [ {name: "Get GA Accounts", functionName: "getGAaccounts"},
                      {name: "Get GA Profiles (all)", functionName: "runGetAllGAProfiles"},
                      {name: "Get GA Profiles (selected properties)", functionName: "runGetSelectedGAProfiles"},
                      {name: "Get GA Goals (selected properties)", functionName: "runGetGAGoals"},
                      {name: "Get GA Segments", functionName: "getGASegments"}
                    
                    ];
  ss.addMenu("GA Management Scripts", menuEntries);
  sheet.getRange(1, 2, 1, 1).setValue("Google Analytics Management API v1.0");
  sheet.getRange(2, 2, 1, 1).setValue("Last Updated: 22nd August 2013");
  sheet.getRange(3, 2, 1, 1).setValue("Provided as is. May contain bugs and quirks");
  sheet.getRange(4, 2, 1, 1).setValue("Author:");
  sheet.getRange(4, 3, 1, 1).setValue("Carmen Mardiros (carmen@mardiros.net). Comments and questions welcome");
  sheet.getRange(5, 2, 1, 1).setValue("Website:");
  sheet.getRange(5, 3, 1, 1).setFormula('=hyperlink("www.clearclues.com/mytools";"ClearClues.com")');
  sheet.getRange(6, 2, 1, 1).setValue("Twitter");
  sheet.getRange(6, 3, 1, 1).setValue("https://twitter.com/carmenmardiros");
  sheet.getRange(7, 2, 1, 1).setValue("Linkedin:");
  sheet.getRange(7, 3, 1, 1).setValue("http://www.linkedin.com/in/carmenmardiros");
}



function runGetAllGAProfiles() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("gaAllProfiles");
    sheet.clearContents();
    deleteTriggers();
    ScriptProperties.setProperty("start_row", 0);
 
        //Create headers for gaProfiles sheet
        headerNames = [
          'Google Login',
          'Account Id',
          'Account Name',
          'Property Name',
          'Property URL',
          'Property Id',
          'Profile Id',
          'Profile Type',
          'Profile Name',
          'Profile URL',
          'Profile Created Time',
          'Profile Modified Time',
          'Currency',
          'Timezone',
          'Default Page',
          'Exclude Query Params',
          'Site Search Query Params',
          'Site Search Category Params',
          'eCommerce Tracking'
        ];

    //Write headers to gaProfiles sheet
    sheet.getRange(1, 1, 1, headerNames.length).setValues([headerNames]);

    //Run function
    getAllGAProfiles();
}



function runGetSelectedGAProfiles() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetProfiles = ss.getSheetByName("gaSelectedProfiles");
    sheetProfiles.clearContents();
    deleteTriggers();
    ScriptProperties.setProperty("start_row", 0);
 
        //Create headers for gaProfiles sheet
        headerNames = [
          'Google Login',
          'Account Id',
          'Account Name',
          'Property Name',
          'Property URL',
          'Property Id',
          'Profile Id',
          'Profile Type',
          'Profile Name',
          'Profile URL',
          'Profile Created Time',
          'Profile Modified Time',
          'Currency',
          'Timezone',
          'Default Page',
          'Exclude Query Params',
          'Site Search Query Params',
          'Site Search Category Params',
          'eCommerce Tracking'
        ];

    //Write headers to gaProfiles sheet
    sheetProfiles.getRange(1, 1, 1, headerNames.length).setValues([headerNames]);

    //Run function
    getSelectedGAProfiles();
}

function runGetGAGoals() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("gaGoals");
    sheet.clearContents();
    deleteTriggers();
    ScriptProperties.setProperty("start_row", 0);
 
        //Create headers for gaProfiles sheet
        headerNames = [
        'Account Id',
        'Account Name',
        'Property Name',
        'Property URL',
        'Property Id',
        'Profile Id',
        'Profile Name',
        'Goal Id',
        'Goal Name',
        'Goal Value',
        'Goal Type',
        'Goal Active',
        'URL Destination',
        'URL Destination MatchType',
        'URL Destination CaseSensitive',
        'URL Destination FirstStepRequired',
        'URL Destination StepName',
        'URL Destination StepNumber',
        'URL Destination StepUrl',
        'Event Use Event Value',
        'Event MatchType',
        'Event Conditions Type',
        'Event Conditions Expression',
        'Event Conditions Comparison Type',
        'Event Conditions Comparison Value'

      ];
                    
      sheet.getRange(1, 1, 1, headerNames.length)
          .setValues([headerNames]);



    //Run function
    getGAGoals();
}


function getGAaccounts() {  
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("gaAccounts");
    SpreadsheetApp.setActiveSheet(sheet);
    sheet.clearContents()
    var accounts = Analytics.Management.Accounts.list();
    var gaAccounts = [];
    var authUser = accounts.username;
    var totalAccounts = accounts.getItems().length; 
    var totalCountProperties = 0; 

    if (accounts.getItems()) {

      //Start accounts loop
      for (i = 0; i < totalAccounts; i++) {
            Logger.log('looping account ' + i);

            //Sleep 1 second to allow for API rate limit
            Utilities.sleep(1000);
          
            //Get account data for current account
            var accountId = accounts.getItems()[i].getId();
            var accountName = accounts.getItems()[i].getName();
            var webProperties = Analytics.Management.Webproperties.list(accountId);

            //Check if current account has properties
            if (webProperties.getItems()) {
                var totalWebProperties = webProperties.getItems().length;
                //Increment total count of web properties
                totalCountProperties = totalCountProperties + totalWebProperties; 
                Logger.log('total properties for this account : ' + totalWebProperties);

                //Start properties loop for current account
                for (j = 0; j < totalWebProperties; j++) {
                  Logger.log('getting property ' + j);
      
                  //Get property data for current property
                  var propertyId = webProperties.getItems()[j].getId();
                  var propertyName = webProperties.getItems()[j].getName();
                  var propertyURL = webProperties.getItems()[j].websiteUrl;

                  gaAccounts.push([
                      authUser,
                      accountId,
                      accountName,
                      propertyName,
                      propertyURL,
                      propertyId
                  ]);
                }

            } else { Logger.log('No properties found'); }
      }
    } else { Logger.log('No accounts found'); }

    Logger.log('total accounts : ' + totalAccounts);
    Logger.log('total web properties retrieved : ' + totalCountProperties);


      headerNames = [
          'Google Login',
          'Account Id',
          'Account Name',
          'Property Name',
          'Property URL',
          'Property Id'

        ];
    sheet.getRange(1, 1, 1, 1).setValue("Mark accounts to get profiles/goals for with x then run relevant scripts in \'GA Management Scripts\' menu");
    sheet.getRange(1, 2, 1, headerNames.length).setValues([headerNames]);
    sheet.getRange(2, 2, gaAccounts.length, headerNames.length).setValues(gaAccounts);
    Browser.msgBox('Finished successfully. Retrieved '+gaAccounts.length+' record(s).');
  
}

  
function getAllGAProfiles() {  
    //Declare variables
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetProfiles = ss.getSheetByName("gaAllProfiles");
    SpreadsheetApp.setActiveSheet(sheetProfiles);
    var lastRow = sheetProfiles.getLastRow();
    var lastColumn = sheetProfiles.getLastColumn();
    var accounts = Analytics.Management.Accounts.list();
    var authUser = accounts.username;
    var totalAccounts = accounts.getItems().length;
    var gaProfiles = [];
    var startTime= (new Date()).getTime();
    var startRowRaw = ScriptProperties.getProperty("start_row");
    var startRow = Number(startRowRaw);
    var totalCountProfiles = 0; 

    // Logger.log('last row in output sheet is' + lastRow);
    // Logger.log('last column in output sheet is' + lastColumn);
    // Logger.log('total number of accounts :' + totalAccounts);
    // Logger.log('script start time is ' + startTime);
    // Logger.log('startrow is ' + startRow);



    if (accounts.getItems()) {

      //Start accounts loop
      for (i = startRow; i < totalAccounts; i++) {
          Logger.log('looping account ' + i);

          //Sleep 1 second to allow for API rate limit
          Utilities.sleep(1000);
          
          var currTime = (new Date()).getTime();

          //Check script running time. If greater than 4 mins then break and sleep for 1 minute. 
          if(currTime - startTime >= 240000) {
            Logger.log('break at account:' + i);
            ScriptProperties.setProperty("start_row", i);
            Logger.log('startrow is now '+ ScriptProperties.getProperty("start_row"));
            ScriptApp.newTrigger("getAllGAProfiles")
                     .timeBased()
                     .at(new Date(currTime+60000))
                     .create();
            break;

          //Else continue looping accounts  
          } else {
            Logger.log('continue, we are at account : ' + i + 'Account  id: ' + accounts.getItems()[i].getId() + ' ' + accounts.getItems()[i].getName());

            //Get account data for current account
            var accountId = accounts.getItems()[i].getId();
            var accountName = accounts.getItems()[i].getName();
            var webProperties = Analytics.Management.Webproperties.list(accountId);

            //Check if current account has properties
            if (webProperties.getItems()) {
                      var totalWebProperties = webProperties.getItems().length; 

                      //Start properties loop for current account
                      for (j = 0; j < totalWebProperties; j++) {
                        Logger.log('getting property ' + j);
            
                        //Get property data for current property
                        var propertyId = webProperties.getItems()[j].getId();
                        var propertyName = webProperties.getItems()[j].getName();
                        var propertyURL = webProperties.getItems()[j].websiteUrl;
                        var profiles = Analytics.Management.Profiles.list(accountId, propertyId);

                        //Sleep 1 second to allow for API rate limit
                        Utilities.sleep(1000);
                        
                        //Check if current property has profiles
                        if (profiles.getItems()) {
                             var totalProfiles = profiles.getItems().length; 
                             totalCountProfiles = totalCountProfiles + totalProfiles; 
                             //Start profiles loop for current property
                             for (k = 0; k < totalProfiles; k++) {
                                
                                //Get profile data for current profile
                                var profileId = profiles.getItems()[k].getId();
                                var profileName = profiles.getItems()[k].getName();
                                var profileURL = profiles.getItems()[k].websiteUrl;
                                var profileCreatedTime = profiles.getItems()[k].created;
                                var profileModifiedTime = profiles.getItems()[k].updated;
                                var profileCurrency = profiles.getItems()[k].currency;
                                var profileTimezone = profiles.getItems()[k].timezone;
                                var profileDefaultPage = profiles.getItems()[k].defaultPage;
                                var profileExcludeQueryParameters = profiles.getItems()[k].excludeQueryParameters;
                                var profileSiteSearchQueryParameters = profiles.getItems()[k].siteSearchQueryParameters;
                                var profileSiteSearchCategoryParameters = profiles.getItems()[k].siteSearchCategoryParameters;
                                var profileType = profiles.getItems()[k].type;
                                var profileECommerceTracking = profiles.getItems()[k].eCommerceTracking;

                                  //Push data to var
                                  gaProfiles.push([
                                      authUser,
                                      accountId,
                                      accountName,
                                      propertyName,
                                      propertyURL,
                                      propertyId,
                                      profileId,
                                      profileType,
                                      profileName,
                                      profileURL,
                                      profileCreatedTime,
                                      profileModifiedTime,
                                      profileCurrency,
                                      profileTimezone,
                                      profileDefaultPage,
                                      profileExcludeQueryParameters,
                                      profileSiteSearchQueryParameters,
                                      profileSiteSearchCategoryParameters,
                                      profileECommerceTracking
                                  ]);
                             }
                        } else { Logger.log('No profile found'); }
                      }

            } else { Logger.log('No properties found'); }

              Logger.log('size of gaProfiles: ' + gaProfiles.length);
              //Clean up after getting last account
                if (i == totalAccounts) {
                  deleteTriggers();
                  ScriptProperties.setProperty("start_row", 0);
                }
          }

      }
    } else { Logger.log('No accounts found'); }

    Logger.log('total accounts : ' + totalAccounts);
    Logger.log('total profiles retrieved : ' + totalCountProfiles);


    //Write data to sheet
    Logger.log('size of range to write to: '+ lastRow +' '+ 1 +' '+ gaProfiles.length +' '+ lastColumn);  
    sheetProfiles.getRange(lastRow + 1, 1, gaProfiles.length, lastColumn).setValues(gaProfiles);
    Browser.msgBox('Finished successfully. Retrieved '+gaProfiles.length+' record(s).');


}


function getSelectedGAProfiles() {  
    //Declare variables
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetProfiles = ss.getSheetByName("gaSelectedProfiles");
    var sheetSettings = ss.getSheetByName("gaSettings");
    SpreadsheetApp.setActiveSheet(sheetProfiles);
    var lastRow = sheetProfiles.getLastRow();
    var lastColumn = sheetProfiles.getLastColumn();
    var range = sheetSettings.getRange("A2:G"); 
    var accounts = range.getValues();
    var totalAccounts = 0;
     for(i=0; i<range.getHeight(); ++i){
       if (accounts[i][0]!='') {
        totalAccounts = totalAccounts +1;
       }
     }
    var gaProfiles = [];
    var startTime= (new Date()).getTime();
    var startRowRaw = ScriptProperties.getProperty("start_row");
    var startRow = Number(startRowRaw);

    Logger.log(accounts);
    //Logger.log(accounts[0]);
    // Logger.log(totalAccounts);
    // Logger.log('last row in output sheet is' + lastRow);
    // Logger.log('last column in output sheet is' + lastColumn);
    // Logger.log('total number of accounts :' + totalAccounts);
    // Logger.log('script start time is ' + startTime);
    // Logger.log('startrow is ' + startRow);



  
if ( totalAccounts == 0 ) {
    Browser.msgBox('Please run \'Get GA Accounts\' script first.\n\n Then go to \'gaAccounts\' sheet and mark accounts to retrieve with an x. \n\n Run the script again');
  } else {
    //Start accounts loop
    for (i = startRow; i < totalAccounts; i++) {
      if (accounts[i][0] !== '') {
          Logger.log('looping account ' + accounts[i][2]);
          var authUser = String(accounts[i][1]);
          var accountId = String(accounts[i][2]);
          var accountName = String(accounts[i][3]);
          var propertyName = String(accounts[i][4]);
          var propertyURL = String(accounts[i][5]);
          var propertyId = String(accounts[i][6]);
          //Sleep 1 second to allow for API rate limit
          Utilities.sleep(1000);
          
          var currTime = (new Date()).getTime();

          //Check script running time. If greater than 4 mins then break and sleep for 1 minute. 
          if(currTime - startTime >= 240000) {
            Logger.log('break at account:' + i);
            ScriptProperties.setProperty("start_row", i);
            Logger.log('startrow is now '+ ScriptProperties.getProperty("start_row"));
            ScriptApp.newTrigger("getSelectedGAProfiles")
                     .timeBased()
                     .at(new Date(currTime+60000))
                     .create();
            break;

          //Else continue looping accounts  
          } else {
            Logger.log('continue, we are at account : ' + i + 'Account  id: ' + accountId + ' ' + accountName);

            var profiles = Analytics.Management.Profiles.list(accountId, propertyId);

            //Sleep 1 second to allow for API rate limit
            Utilities.sleep(1000);
            
            //Check if current property has profiles
            if (profiles.getItems()) {
                 var totalProfiles = profiles.getItems().length; 
                 
                 //Start profiles loop for current property
                 for (j = 0; j < totalProfiles; j++) {
                    
                    //Get profile data for current profile
                    var profileId = profiles.getItems()[j].getId();
                    var profileName = profiles.getItems()[j].getName();
                    var profileURL = profiles.getItems()[j].websiteUrl;
                    var profileCreatedTime = profiles.getItems()[j].created;
                    var profileModifiedTime = profiles.getItems()[j].updated;
                    var profileCurrency = profiles.getItems()[j].currency;
                    var profileTimezone = profiles.getItems()[j].timezone;
                    var profileDefaultPage = profiles.getItems()[j].defaultPage;
                    var profileExcludeQueryParameters = profiles.getItems()[j].excludeQueryParameters;
                    var profileSiteSearchQueryParameters = profiles.getItems()[j].siteSearchQueryParameters;
                    var profileSiteSearchCategoryParameters = profiles.getItems()[j].siteSearchCategoryParameters;
                    var profileType = profiles.getItems()[j].type;
                    var profileECommerceTracking = profiles.getItems()[j].eCommerceTracking;

                      //Push data to var
                      gaProfiles.push([
                          authUser,
                          accountId,
                          accountName,
                          propertyName,
                          propertyURL,
                          propertyId,
                          profileId,
                          profileType,
                          profileName,
                          profileURL,
                          profileCreatedTime,
                          profileModifiedTime,
                          profileCurrency,
                          profileTimezone,
                          profileDefaultPage,
                          profileExcludeQueryParameters,
                          profileSiteSearchQueryParameters,
                          profileSiteSearchCategoryParameters,
                          profileECommerceTracking
                      ]);
                 }
            } else { Logger.log('No profile found'); }



              Logger.log('size of gaProfiles: ' + gaProfiles.length);
              //Clean up after getting last account
                if (i == totalAccounts) {
                  deleteTriggers();
                  ScriptProperties.setProperty("start_row", 0);
                }
          }

      }
    }

    //Write data to sheet
    Logger.log('size of range to write to: '+ lastRow +' '+ 1 +' '+ gaProfiles.length +' '+ lastColumn);  
    sheetProfiles.getRange(lastRow + 1, 1, gaProfiles.length, lastColumn).setValues(gaProfiles);
    Browser.msgBox('Finished successfully. Retrieved '+gaProfiles.length+' record(s).');

  } 

}





function getGAGoals() {  
    //Declare variables
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetGoals = ss.getSheetByName("gaGoals");
    var sheetSettings = ss.getSheetByName("gaSettings");
    SpreadsheetApp.setActiveSheet(sheetGoals);
    var lastRow = sheetGoals.getLastRow();
    var lastColumn = sheetGoals.getLastColumn();
    var range = sheetSettings.getRange("A2:G"); 
    var accounts = range.getValues();
    var totalAccounts = 0;
     for(i=0; i<range.getHeight(); ++i){
       if (accounts[i][0]!='') {
        totalAccounts = totalAccounts +1;
       }
     }
    var gaGoals = [];
    var startTime= (new Date()).getTime();
    var startRowRaw = ScriptProperties.getProperty("start_row");
    var startRow = Number(startRowRaw);
    var totalCountGoals = 0; 
    
    //Logger.log(accounts);
    //Logger.log(accounts[0]);
    Logger.log(totalAccounts);
    Logger.log('last row in output sheet is' + lastRow);
    Logger.log('last column in output sheet is' + lastColumn);
    Logger.log('total number of accounts :' + totalAccounts);
    Logger.log('script start time is ' + startTime);
    Logger.log('startrow is ' + startRow);



  
if ( totalAccounts == 0 ) {
    Browser.msgBox('Please run \'Get GA Accounts\' script first and mark accounts to retrieve with an x');
  } else {

    //Start accounts loop
    for (i = startRow; i < totalAccounts; i++) {
      if (accounts[i][0] !== '') {
          Logger.log('looping account ' + accounts[i][2]);
          var authUser = String(accounts[i][1]);
          var accountId = String(accounts[i][2]);
          var accountName = String(accounts[i][3]);
          var propertyName = String(accounts[i][4]);
          var propertyURL = String(accounts[i][5]);
          var propertyId = String(accounts[i][6]);
          //Sleep 1 second to allow for API rate limit
          Utilities.sleep(1000);
          
          var currTime = (new Date()).getTime();

          //Check script running time. If greater than 4 mins then break and sleep for 1 minute. 
          if(currTime - startTime >= 240000) {
            Logger.log('break at account:' + i);
            ScriptProperties.setProperty("start_row", i);
            Logger.log('startrow is now '+ ScriptProperties.getProperty("start_row"));
            ScriptApp.newTrigger("getSelectedGAProfiles")
                     .timeBased()
                     .at(new Date(currTime+60000))
                     .create();
            break;

          //Else continue looping accounts  
          } else {
            Logger.log('continue, we are at account : ' + i + 'Account  id: ' + accountId + ' ' + accountName);

            var profiles = Analytics.Management.Profiles.list(accountId, propertyId);

            //Sleep 1 second to allow for API rate limit
            Utilities.sleep(1000);
            
            //Check if current property has profiles
            if (profiles.getItems()) {
                 var totalProfiles = profiles.getItems().length; 
                 
                 //Start profiles loop for current property
                 for (j = 0; j < totalProfiles; j++) {
                    //Get profile data for current profile
                    var profileId = profiles.getItems()[j].getId();
                    var profileName = profiles.getItems()[j].getName();
                    var goals = Analytics.Management.Goals.list(accountId, propertyId, profileId);

                    Utilities.sleep(1000);
                    if (goals.getItems()) {
                        var totalgoals = goals.getItems().length;
                        Logger.log('total goals for current profile: ' + totalgoals + ' profileName : ' + profileName); 
                        totalCountGoals = totalCountGoals + totalgoals; 
                        for (k = 0; k < totalgoals; k++) {
                          var profileLink = goals.getItems()[k].parentLink.href;
                          var goalId = goals.getItems()[k].getId();
                          var goalLink = goals.getItems()[k].selfLink;

                          var goalName = goals.getItems()[k].name;
                          var goalType = goals.getItems()[k].type;
                          var goalValue = goals.getItems()[k].value;
                          var goalActive = goals.getItems()[k].active;
                          var goalCreated = goals.getItems()[k].created;
                          var goalUpdated = goals.getItems()[k].updated;

                          if (goalType == "URL_DESTINATION") {
                              var goalUrlDestinationUrl = goals.getItems()[k].urlDestinationDetails.url;
                              var goalUrlDestinationCaseSensitive = goals.getItems()[k].urlDestinationDetails.caseSensitive;
                              var goalUrlDestinationMatchType = goals.getItems()[k].urlDestinationDetails.matchType;
                              var goalUrlDestinationFirstStepRequired = goals.getItems()[k].urlDestinationDetails.firstStepRequired;
                              var goalUrlDestinationSteps = goals.getItems()[k].urlDestinationDetails.steps;


                              //Check if goal url has steps
                              if (typeof goalUrlDestinationSteps === "undefined") {                            
                                        gaGoals.push([
                                            accountId,
                                            accountName,
                                            propertyName,
                                            propertyURL,
                                            propertyId,
                                            profileId,
                                            profileName,
                                            goalId,
                                            goalName,
                                            goalValue,
                                            goalType,
                                            goalActive,
                                            goalUrlDestinationUrl,
                                            goalUrlDestinationMatchType,
                                            goalUrlDestinationCaseSensitive,
                                            goalUrlDestinationFirstStepRequired,
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined"
                                        ]);
                                } else {
                                  for(step in goalUrlDestinationSteps) {
                                    var goalurlDestinationStepName = goalUrlDestinationSteps[step].name;  
                                    var goalurlDestinationStepNumber = goalUrlDestinationSteps[step].number;  
                                    var goalurlDestinationStepUrl = goalUrlDestinationSteps[step].url;                                

                                        gaGoals.push([
                                            accountId,
                                            accountName,
                                            propertyName,
                                            propertyURL,
                                            propertyId,
                                            profileId,
                                            profileName,
                                            goalId,
                                            goalName,
                                            goalValue,
                                            goalType,
                                            goalActive,
                                            goalUrlDestinationUrl,
                                            goalUrlDestinationMatchType,
                                            goalUrlDestinationCaseSensitive,
                                            goalUrlDestinationFirstStepRequired,
                                            goalurlDestinationStepName,
                                            goalurlDestinationStepNumber,
                                            goalurlDestinationStepUrl,
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined"

                                        ]);
                                  }
                              }

                          } else if(goalType == "EVENT") { 
                              var goalEventuseEventValue = goals.getItems()[k].eventDetails.useEventValue;
                              var goalEventConditions = goals.getItems()[k].eventDetails.eventConditions;

                              //Check if goal event has conditions
                              if (typeof goalEventConditions === "undefined") {                            
                                        gaGoals.push([
                                            accountId,
                                            accountName,
                                            propertyName,
                                            propertyURL,
                                            propertyId,
                                            profileId,
                                            profileName,
                                            goalId,
                                            goalName,
                                            goalValue,
                                            goalType,
                                            goalActive,
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            goalEventuseEventValue,
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",

                                        ]);
                                } else {
                                  for(condition in goalEventConditions) {
                                    var goalEventConditionsType = goalEventConditions[condition].type;
                                    var goalEventConditionsMatchType = goalEventConditions[condition].matchType;
                                    var goalEventConditionsExpression = goalEventConditions[condition].expression;
                                    var goalEventConditionsComparisonType = goalEventConditions[condition].comparisonType;
                                    var goalEventConditionsComparisonValue = goalEventConditions[condition].comparisonValue;

                                      gaGoals.push([
                                            accountId,
                                            accountName,
                                            propertyName,
                                            propertyURL,
                                            propertyId,
                                            profileId,
                                            profileName,
                                            goalId,
                                            goalName,
                                            goalValue,
                                            goalType,
                                            goalActive,
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            "undefined",
                                            goalEventuseEventValue,
                                            goalEventConditionsMatchType,
                                            goalEventConditionsType,
                                            goalEventConditionsExpression,
                                            goalEventConditionsComparisonType,
                                            goalEventConditionsComparisonValue

                                      ]);
                                  }
                              }


                          } 
                        }
                    } else { Logger.log('No goals found'); }

                 }
            } else { Logger.log('No profile found'); }



              Logger.log('size of gaGoals: ' + gaGoals.length);
              //Clean up after getting last account
                if (i == totalAccounts) {
                  deleteTriggers();
                  ScriptProperties.setProperty("start_row", 0);
                }
          }

      }
    }
    Logger.log('total accounts : ' + totalAccounts);
    Logger.log('total goals retrieved : ' + totalCountGoals);

    //Write data to sheet
    Logger.log('size of range to write to: '+ lastRow +' '+ 1 +' '+ gaGoals.length +' '+ lastColumn);  
    sheetGoals.getRange(lastRow + 1, 1, gaGoals.length, lastColumn).setValues(gaGoals);
    Browser.msgBox('Finished successfully. Retrieved '+gaGoals.length+' record(s).');
  }
}

  


function getGASegments() {  
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName("gaSegments");
      sheet.clearContents();
      SpreadsheetApp.setActiveSheet(sheet);
      var gaSegments = [];
      var segments = Analytics.Management.Segments.list();
      Utilities.sleep(1000);
      if (segments.getItems()) {
          var totalsegments = segments.getItems().length; 
          for (i = 0; i < totalsegments; i++) {
            var segmentId = segments.getItems()[i].segmentId;
            var segmentName = segments.getItems()[i].name;
            var segmentDefinition = segments.getItems()[i].definition;
            var segmentCreated = segments.getItems()[i].created;
            var segmentUpdated = segments.getItems()[i].updated;
                gaSegments.push([
                    segmentId,
                    segmentName,
                    segmentDefinition,
                    segmentCreated,
                    segmentUpdated
                ]);
          }
      } else { }

      headerNames = [
      'Segment Id',
      'Segment Name',
      'Segment Definition',
      'Segment Created',
      'Segment Updated'
      ];
                  
    sheet.getRange(1, 1, 1, headerNames.length).setValues([headerNames]);

    sheet.getRange(2, 1, gaSegments.length, headerNames.length).setValues(gaSegments);

    Browser.msgBox('Finished successfully. Retrieved '+gaSegments.length+' record(s).');
}
  
