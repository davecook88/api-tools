function formatDisplaySheet(ss, sheetName, type) {
  const sheet = ss.insertSheet(sheetName);
  switch (type) {
    case "dimensions":
      _formatDimensionsSheet(sheet);
      return sheet;
    case "audiences":
      _formatAudiencesSheet(sheet);
      return sheet;
    case "properties":
      _formatPropertiesSheet(sheet);
      return sheet;
    case "profiles":
      _formatProfilesSheet(sheet);
      return sheet;

    default:
  }
  return sheet;
}

function testFormatSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  formatDisplaySheet(ss, "dimensions");
}
