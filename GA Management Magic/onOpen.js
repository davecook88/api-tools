function onOpen(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();

  // create the addon menu
  try {
    var menu = ui.createAddonMenu();
    if (e && e.authMode == ScriptApp.AuthMode.NONE) {
      // Add a normal menu item (works in all authorization modes).
      menu
        .addItem("List filters", "requestFilterList")
        .addItem("Update filters", "requestFilterUpdate")
        .addSeparator()
        .addItem("List custom dimensions", "requestDimensionList")
        .addItem("Update custom dimensions", "requestDimensionUpdate")
        .addSeparator()
        .addItem("List custom metrics", "requestMetricList")
        .addItem("Update custom metrics", "requestMetricUpdate")
        .addSeparator()
        .addItem("Format filter sheet", "formatFilterSheet")
        .addItem("Format dimension sheet", "formatDimensionSheet")
        .addItem("Format metric sheet", "formatMetricSheet")
        .addSeparator()
        .addItem("About this Add-on", "about");
    } else {
      menu
        .addItem("List properties", "listAccounts")
        .addItem("Delete non-account sheets", "deleteSheets")
        .addSeparator()
        .addItem("Update properties", "updateProperties")
        .addSeparator()
        .addItem("List audiences", "listAudiences")
        .addItem("Update audiences", "updateAudiences")
        .addSeparator()
        .addItem("List filters", "requestFilterList")
        .addItem("Update filters", "requestFilterUpdate")
        .addSeparator()
        .addItem("List custom dimensions", "listDimensions")
        .addItem("Update custom dimensions", "requestDimensionUpdate")
        .addSeparator()
        .addItem("List custom metrics", "requestMetricList")
        .addItem("Update custom metrics", "requestMetricUpdate")
        .addSeparator()
        .addItem("About this Add-on", "about");
    }
    menu.addToUi();
  } catch (e) {
    Browser.msgBox(e.message);
  }
}

/**************************************************************************
 * Install function runs when the application is installed
 */
function onInstall(e) {
  onOpen(e);
  // send Measurement Protocol hitType to Google Analytics
}
