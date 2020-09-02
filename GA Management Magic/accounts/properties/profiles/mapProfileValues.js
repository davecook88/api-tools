function mapProfileValues(profile = {}) {
  const formatBool = bool => bool ? "✓": "x";
  return {
    include: "",
    account: profile.accountId || "",
    id: profile.id || "",
    kind: profile.kind || "",
    name: profile.name || "",
    webPropertyId: profile.webPropertyId || "",
    websiteUrl: profile.websiteUrl || "",
    currency: profile.currency || "",
    timezone: profile.timezone || null,
    defaultPage: profile.defaultPage || "",
    excludeQueryParameters: profile.excludeQueryParameters || "",
    stripSiteSearchQueryParameters:  formatBool(profile.stripSiteSearchQueryParameters),
    siteSearchCategoryParameters: profile.siteSearchCategoryParameters || "",
    stripSiteSearchCategoryParameters:  formatBool(profile.stripSiteSearchCategoryParameters), 
    siteSearchQueryParameters:
      profile.siteSearchQueryParameters || "",
    eCommerceTracking: profile.eCommerceTracking || "",
    enhancedECommerceTracking: profile.enhancedECommerceTracking || "",
    botFilteringEnabled: formatBool(profile.botFilteringEnabled),
    created: profile.created || null,
    updated: profile.updated || null,
    starred: formatBool(profile.starred),


    permissions: profile.permissions
      ? profile.permissions.effective
        ? profile.permissions.effective.join(",")
        : ""
      : "",
  };
}

// TODO: change this for updating
/**
 * @desc Updates Profile resource pulled from Analytics API with any changes from the sheet before being passed back to the AI to update.
 *
 * @param {*} rowObject from _Row.createObject method. This represents the data from the sheet. Each attribute represents a column header
 * @param {Google Analytics profile} profile profile object from Google Analytics
 * @returns {}
 */
function mapSheetToProfileResource(rowObject = {}, profile) {
  const formatBool = value => value === "✓" ? true : false;
  profile.name = rowObject.name || profile.name;
  profile.websiteUrl = rowObject.websiteUrl || profile.websiteUrl;
  profile.level = rowObject.level || profile.level;
  profile.profileCount = rowObject.profileCount || profile.profileCount;
  profile.currency = rowObject.currency || profile.currency;
  profile.timezone = rowObject.timezone || profile.timezone;
  profile.defaultPage = rowObject.defaultPage || profile.defaultPage;
  profile.excludeQueryParameters = formatBool(rowObject.excludeQueryParameters);
  profile.stripSiteSearchQueryParameters = formatBool(rowObject.stripSiteSearchQueryParameters);
  profile.siteSearchCategoryParameters = rowObject.siteSearchCategoryParameters || profile.siteSearchCategoryParameters;
  profile.eCommerceTracking = rowObject.eCommerceTracking || profile.eCommerceTracking;
  profile.enhancedECommerceTracking = rowObject.enhancedECommerceTracking || profile.enhancedECommerceTracking;
  profile.botFilteringEnabled = formatBool(rowObject.botFilteringEnabled);
  profile.created = rowObject.created || profile.created;
  profile.updated = rowObject.updated || profile.updated;
  profile.starred = formatBool(rowObject.starred);
  profile.permissions =
    typeof rowObject.permissions === "string"
      ? { effective: rowObject.permissions.split(",") }
      : profile.permissions;
  return profile;
}
