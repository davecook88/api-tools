function mapMetricValues(metric = {}) {
  const formatBool = bool => bool ? "✓": "x";
  return {
    include: "",
    accountId: metric.accountId || '',
    webPropertyId: metric.webPropertyId || '',
    id:metric.id || '',
    name: metric.name || '',
    index: metric.index || '',
    scope: metric.scope || '',
    min_value: metric.min_value || '',
    max_value: metric.max_value || '',
    
    active: formatBool(metric.active),
    created:metric.created || '',
    updated:metric.updated || '',
    url:metric.selfLink || '',
    scope: metric.scope || '',
  };
}


/**
 * @desc Updates Metric resource pulled from Analytics API with any changes from the sheet before being passed back to the AI to update.
 *
 * @param {*} rowObject from _Row.createObject method. This represents the data from the sheet. Each attribute represents a column header
 * @param {Google Analytics Metric} metric metric object from Google Analytics
 * @returns {}
 */
function mapSheetToMetricResource(rowObject = {}, Metric) {
  const formatBool = value => value === "✓" ? true : false;
  return {
    "kind": "analytics#customMetric",
    "id": rowObject.id || metric.id,
    "accountId": rowObject.accountId ? rowObject.accountId.toString() : metric.accountId,
    "webPropertyId": rowObject.webPropertyId || metric.webPropertyId,
    "name": rowObject.name || metric.name,
    "index": rowObject.index || metric.index,
    "scope": rowObject.scope || metric.scope,
    "active": formatBool(rowObject.active),
    "created": rowObject.created || metric.created,
    "updated": rowObject.updated || metric.updated,
    "selfLink": metric.selfLink,
    "parentLink": metric.parentLink
  }
}
