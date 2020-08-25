function listProfiles() {
  Logger.log("listProfiles");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const included = _getIncludedProperties(ss);
  Logger.log(included);
  const analytics = new AnalyticsManager(included);
  analytics.forEachProperty((property, account, analytics) => {
    const profileList = property.getProfileList();
    profiles = profileList.getItems() || [];
    if (!profiles.length) {
      SpreadsheetApp.getUi().alert("No profiles for property " + property.id);
    } else {
      const profilesheet = createSheetIfNeeded(ss, "profiles", property); // returns SpreadsheetManager
      const profilesheetValuesObject = new SheetValues(profilesheet);

      profiles.forEach((dimension) => {
        const rowObject = mapDimensionValues(dimension);
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
}
