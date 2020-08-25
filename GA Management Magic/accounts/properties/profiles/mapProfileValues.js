function mapProfileValues(profile = {}) {
  return {
    include: "",
    account: profile.accountId || "",
    id: profile.id || "",
    kind: profile.kind || "",
    name: profile.name || "",
    websiteUrl: profile.websiteUrl || "",
    currency: profile.currency || "",
    timezone: profile.timezone || "",
    defaultPage: profile.defaultPage || "",
    excludeQueryParameters: profile.excludeQueryParameters || "",
    stripSiteSearchQueryParameters: profile.stripSiteSearchQueryParameters || "",
    siteSearchCategoryParameters: profile.siteSearchCategoryParameters || "",
    stripSiteSearchCategoryParameters: profile.stripSiteSearchCategoryParameters || "", 
    siteSearchQueryParameters:
      profile.siteSearchQueryParameters || "",
    eCommerceTracking: profile.eCommerceTracking || "",
    enhancedECommerceTracking: profile.enhancedECommerceTracking || "",
    botFilteringEnabled: profile.botFilteringEnabled || "",
    created: profile.created || "",
    updated: profile.updated || "",
    starred: profile.starred || "",


    permissions: profile.permissions
      ? profile.permissions.effective
        ? profile.permissions.effective.join(",")
        : ""
      : "",
  };
}

// TODO: change this for updating
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
