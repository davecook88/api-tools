function mapPropertiesValues(property = {}) {
  return {
    include: "",
    account: property.accountId || "",
    id: property.id || "",
    name: property.name || "",
    websiteUrl: property.websiteUrl || "",
    level: property.level || "",
    profileCount: property.profileCount || "",
    dataRetentionTime: property.dataRetentionTtl || "",
    dataRetentionResetOnNewActivity:
      property.dataRetentionResetOnNewActivity || "",
    industryVertical: property.industryVertical || "",
    created: property.created || "",
    updated: property.updated || "",
    starred: property.starred || "",
    permissions: property.permissions
      ? property.permissions.effective
        ? property.permissions.effective.join(",")
        : ""
      : "",
  };
}

/**
 * @desc Updates Webproperty resource pulled from Analytics API with any changes from the sheet before being passed back to the AI to update.
 *
 * @param {*} rowObject from _Row.createObject method. This represents the data from the sheet. Each attribute represents a column header
 * @param {Google Analytics Webproperty} property property object from Google Analytics
 * @returns {}
 */
function mapSheetToPropertyResource(rowObject = {}, property) {
  property.name = rowObject.name || property.name;
  property.websiteUrl = rowObject.websiteUrl || property.websiteUrl;
  property.level = rowObject.level || property.level;
  property.profileCount = rowObject.profileCount || property.profileCount;
  property.dataRetentionTtl =
    rowObject.dataRetentionTime || property.dataRetentionTtl;
  property.dataRetentionResetOnNewActivity =
    rowObject.dataRetentionResetOnNewActivity ||
    property.dataRetentionResetOnNewActivity;
  property.industryVertical =
    rowObject.industryVertical || property.industryVertical;
  property.created = rowObject.created || property.created;
  property.updated = rowObject.updated || property.updated;
  property.starred = rowObject.starred || property.starred;
  property.permissions =
    typeof rowObject.permissions === "string"
      ? { effective: rowObject.permissions.split(",") }
      : property.permissions;
  return property;
}
