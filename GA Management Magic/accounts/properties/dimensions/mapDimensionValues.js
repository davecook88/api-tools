function mapDimensionValues(dimension = {}) {
  const formatBool = bool => bool ? "✓": "x";
  return {
    include: "",
    accountId: dimension.accountId || '',
    webPropertyId: dimension.webPropertyId || '',
    id:dimension.id || '',
    name: dimension.name || '',
    index: dimension.index || '',
    created:dimension.created || '',
    updated:dimension.updated || '',
    active: formatBool(dimension.active),
    url:dimension.selfLink || '',
    scope: dimension.scope || '',
  };
}

/**
 * @desc Updates Dimension resource pulled from Analytics API with any changes from the sheet before being passed back to the AI to update.
 *
 * @param {*} rowObject from _Row.createObject method. This represents the data from the sheet. Each attribute represents a column header
 * @param {Google Analytics Dimension} dimension dimension object from Google Analytics
 * @returns {}
 */
function mapSheetToDimensionResource(rowObject = {}, dimension) {
  const formatBool = value => value === "✓" ? true : false;
  return {
    "kind": "analytics#customDimension",
    "id": rowObject.id || dimension.id,
    "accountId": rowObject.accountId ? rowObject.accountId.toString() : dimension.accountId,
    "webPropertyId": rowObject.webPropertyId || dimension.webPropertyId,
    "name": rowObject.name || dimension.name,
    "index": rowObject.index || dimension.index,
    "scope": rowObject.scope || dimension.scope,
    "active": formatBool(rowObject.active),
    "created": rowObject.created || dimension.created,
    "updated": rowObject.updated || dimension.updated,
    "selfLink": dimension.selfLink,
    "parentLink": dimension.parentLink
  }
}
