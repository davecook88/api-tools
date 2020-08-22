/**
 *
 *
 * @param SpreadsheetManager{object} ss
 * @param string type - eg dimensions, audiences, filters
 * @param Property{object} property
 * @returns SpreadsheetManager{object}
 */
function createSheetIfNeeded(ss, type, property) {
  const sheetName = type === 'properties' ? 'Properties - detail' : `${property.id} - ${type}`;
  const ssm = new SpreadsheetManager(ss, sheetName);
  if (!ssm.sheet) {
    formatDisplaySheet(ss, sheetName, type);
    return new SpreadsheetManager(ss, sheetName);
  } else {
    return ssm;
  }
}