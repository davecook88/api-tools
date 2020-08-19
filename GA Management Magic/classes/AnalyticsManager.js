class AnalyticsManager {
  constructor(included) {
    this.user;
    this.gaAccountsList;
    this.gaAccounts = [];
    this.accounts = [];
    this.getAccounts(included);
  }

  forEachAccount(callback) {
    this.accounts.forEach((account) => callback(account));
  }

  forEachProperty(callback) {
    this.accounts.forEach((account) => account.forEachProperty(this, callback));
  }

  getAccounts(included) {
    const includedAccounts = included ? included.accounts : null;
    try {
      const gaAccountsList = Analytics.Management.Accounts.list();
      this.gaAccounts = gaAccountsList.getItems();
      this.user = gaAccountsList.username;
    } catch (err) {
      Logger.log("Error getting accounts from API", err);
    }
    try {
      const accounts = this.gaAccounts
        .filter((acc) => includedAccounts ? includedAccounts.has(parseInt(acc.getId())) : true)
        .map((acc) => new Account(acc, included));
      this.accounts = accounts;
    } catch (err) {
      Logger.log("Error creating account objects", err);
    }
  }
}
