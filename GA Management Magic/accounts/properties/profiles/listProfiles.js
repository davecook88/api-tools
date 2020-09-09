function listProfiles() {
  Logger.log("listProfiles");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const included = _getIncludedProperties(ss);
  Logger.log(included);
  const emptyProfileList = [];
  const analytics = new AnalyticsManager(included);
  analytics.forEachProperty((property, account, analytics) => {
    const profileList = property.getProfileList();
    profiles = profileList.getItems() || [];
    let createSheet = true;
    if (!profiles.length) {
      const createEmptyResponse = SpreadsheetApp.getUi().alert(
        "No profile found for " + property.id + ". Create an empty sheet?",
        ui.ButtonSet.YES_NO
      );
      if (createEmptyResponse == ui.Button.NO) {
        createSheet = false;
        emptyProfileList.push(property.id);
      }
    }
    if (createSheet) {
      const profilesheet = createSheetIfNeeded(ss, "profiles", property); // returns SpreadsheetManager
      const profilesheetValuesObject = new SheetValues(profilesheet);

      profiles.forEach((profile) => {
        const rowObject = mapProfileValues(profile);
        profilesheetValuesObject.assimilateEntry(rowObject);
      });
      // Delete all existing values from sheet and replace them with the new data.
      profilesheet.values = profilesheet.values.slice(0, 1);
      const newRows = profilesheetValuesObject.createRowsFromObject();
      if (newRows) {
        profilesheet.values.push(...newRows);
        profilesheet.clearSheetAndPasteValues();
      }
    }
  });
  if (emptyProfileList.length) {
    const message =
      emptyProfileList.length === 1
        ? "No profiles for property"
        : "No profiles for properties";
    SpreadsheetApp.getActiveSpreadsheet().toast(
      emptyProfileList.join("\n"),
      message
    );
  }
}
