class Account {
  constructor(account, included) {
    this.id = account.getId();
    this.name = account.getName();
    this.gaPropertiesList = this.getPropertiesList();
    this.gaProperties = this.gaPropertiesList.getItems();
    this.properties = this.getProperties(included);
  }

  forEachProperty(analytics, callback) {
    this.properties.forEach((property) => callback(property, this, analytics));
  }

  getProperties(included) {
    const includedProperties = included ? included.properties : null;
    try {
      const properties = this.gaProperties
        .filter((prop) =>
          includedProperties ? includedProperties.has(prop.getId()) : true
        )
        .map((prop) => new Property(prop));
      return properties;
    } catch (err) {
      Logger.log("Error getting properties for account " + this.id);
    }
  }

  getPropertiesList() {
    return Analytics.Management.Webproperties.list(this.id);
  }
}
