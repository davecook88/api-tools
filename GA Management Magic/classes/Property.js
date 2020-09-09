class Property {
  constructor(property) {
    this.GAProperty = property;
    this.id = property.getId();
    this.name = property.name;
    this.url = property.websiteUrl;
    this.accountId = property.accountId;
  }

  /**
   * @returns RemarketingAudienceList for this property
   * @memberof Property
   */
  getAudienceList() {
    const { id, accountId } = this;
    return Analytics.Management.RemarketingAudience.list(accountId, id);
  }

  getDimensionList() {
    const { id, accountId } = this;
    return Analytics.Management.CustomDimensions.list(accountId, id);
  }

  getFilterList() {
    const { id, accountId } = this;
    return Analytics.Management.CustomFilters.list(accountId, id);
  }

  getMetricList() {
    const { id, accountId } = this;
    return Analytics.Management.CustomMetrics.list(accountId, id);
  }

  getProfileList(){
    const { id, accountId } = this;
    return Analytics.Management.Profiles.list(accountId, id);
  }
}
