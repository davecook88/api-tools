function mapPropertiesValues(property = {}) {
  return {
    account: property.accountId || "",
    id: property.webPropertyId || "",
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
