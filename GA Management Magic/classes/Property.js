class Property {
  constructor(property) {
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
}