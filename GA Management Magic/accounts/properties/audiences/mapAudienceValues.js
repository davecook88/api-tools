function mapAudienceValues(audience) {
  return {
    accountId:audience.accountId,
    propertyId:audience.webPropertyId,
    audienceId: audience.id,
    name: audience.name,
    description: audience.description,
    type: audience.type,
    isSmartList: audience.audienceDefinition.includeConditions.isSmartList,
    daysToLookBack:
      audience.audienceDefinition ? audience.audienceDefinition.includeConditions.daysToLookBack : '',
    membershipDurationDays:
      audience.audienceDefinition ? audience.audienceDefinition.includeConditions.membershipDurationDays : '',
    segment: audience.audienceDefinition.includeConditions.segment,
    linkedAdAccountId:audience.linkedAdAccounts[0].linkedAccountId,
    linkedAdAccountType:audience.linkedAdAccounts[0].type,
    linkedViews:audience.linkedViews.join(','),
  };
}
