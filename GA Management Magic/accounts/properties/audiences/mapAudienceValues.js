function mapAudienceValues(audience = {}) {
  return {
    id: audience.id,
    accountId: audience.accountId,
    propertyId: audience.webPropertyId,
    audienceId: audience.id,
    name: audience.name,
    description: audience.description,
    type: audience.type,
    isSmartList: audience.audienceDefinition
      ? audience.audienceDefinition.includeConditions.isSmartList
      : "",
    daysToLookBack: audience.audienceDefinition
      ? audience.audienceDefinition.includeConditions.daysToLookBack
      : "",
    membershipDurationDays: audience.audienceDefinition
      ? audience.audienceDefinition.includeConditions.membershipDurationDays
      : "",
    segment: audience.audienceDefinition
      ? audience.audienceDefinition.includeConditions.segment
      : "",
    linkedAdAccountId: audience.linkedAdAccounts
      ? audience.linkedAdAccounts.length
        ? audience.linkedAdAccounts[0].linkedAccountId
        : ""
      : "",
    linkedAdAccountType: audience.linkedAdAccounts
      ? audience.linkedAdAccounts.length
        ? audience.linkedAdAccounts[0].type
        : ""
      : "",
    linkedViews: audience.linkedViews ? audience.linkedViews.join(",") : "",
  };
}
