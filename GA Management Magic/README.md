Added by Dave
---------
To use this script in a new spreadsheet, the code in this file can be directly uploaded to Google Apps Script using Clasp: https://www.npmjs.com/package/@google/clasp

Be sure to enable the API in your Scripts account: https://script.google.com/u/2/home/usersettings

Delete the .clasp.json file and run `clasp login` followed by `clasp push` to create a new sheet. Alternatively, change the scriptId to a script attached to a spreadsheet in your account to upload this to a different project.

---

Many of you have written about errors related to quota limits. This is a known issue related to the Google Analytics Management API daily quota and is being worked on.

In the meantime, you can work around it by following the instructions below, which will use your own cloud project (and won't be sharing the quota with others). This should eliminate the issue for most users, though it should be noted that the API quotas still apply.

---

GA Management Magic
---------
The Google Analytics Management API can be accessed through a Google Sheet to list and update settings data in a Google Sheet. This Sheets add-on provides a seemless extension that enterprise users of Google Analytics can employ to list entities from Google Analytics into a sheet, make updates and additions to those entities and push updated items from the sheet up to GA.

It works with free as well as GA 360 properties.

### Installing the tool
This tool can most easily be installed through the [Google Add-ons Web Store](https://chrome.google.com/webstore/detail/clmbnkmolchgmhnkbcjbadnnhekdigdo/).

If you wish to extend the functionality, it can also be installed by placing all the Apps Script files in this repository into [a script bound to a Google Sheet](https://developers.google.com/apps-script/guides/bound), which will use your own Cloud Project (and may require you to configure a cloud project).

## Working with Filters, Custom Dimensions & Custom Metrics in Google Sheets
#### Listing
To list filters from an account (or a list of accounts), or custom dimensions/metrics from a property (or list of properties), run one of the __List__ commands from the add-on menu. At the prompt, enter one or more account or property ID(s) -- as directed -- from which to list the management entity settings in your sheet.

Depending on whether there is data in the current sheet, the sheet will either be cleared and then formatted, or else a new sheet will be added and formatted. The resulting formatted sheet will then be populated with the values from the accounts/properties.

If you update any of these values, you can push the updates to GA by invoking one of the __Update__ functions from the add-on menu.

#### Updating
To update settings run one of the __Update__ commands from the add-on menu.

If there is no data in the sheet, or the sheet format is not recognized by the scripts, a formatted sheet will be presented, into which filter/custom dimension/metric settings can be entered.
