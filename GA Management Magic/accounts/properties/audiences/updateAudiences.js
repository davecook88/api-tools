function updateAudiences() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();
  const audienceSheets = allSheets
    .filter((sheet) => sheet.getName().indexOf("audiences") > -1)
    .map((sheet) => new SpreadsheetManager(ss, sheet.getName()));

  audienceSheets.forEach((sheet) => {
    sheet.forEachRow(function (row) {
      if (row.col("include")) {
        const rowObject = row.createObject();
        const { accountId, audienceId, propertyId } = rowObject;
        const gaAudience = Analytics.Management.RemarketingAudience.get(
          accountId.toString(),
          propertyId,
          audienceId
        );
        // If audienceId not found in above function, a list is returned. 
        const isNotList = !gaAudience.itemsPerPage;
        if (isNotList) {
          const updatedAudience = _applyUpdates(gaAudience, rowObject);
          const updateResponse = Analytics.Management.RemarketingAudience.update(
            updatedAudience,
            accountId.toString(),
            propertyId,
            audienceId
          );
          Logger.log('updateResponse', updateResponse);
        } else {
          const newAudience = _createNewAudienceObject(rowObject);
          Logger.log('newAudience', newAudience);
          const insertResponse = Analytics.Management.RemarketingAudience.insert(
            newAudience,
            accountId.toString(),
            propertyId
          );
          Logger.log('insertResponse', insertResponse);
        }
      }
    });
  });
}

function _applyUpdates(gaAudience, rowObject) {
  const obj = { ...gaAudience };
  const { daysToLookBack, membershipDurationDays, segment } = rowObject;
  obj.audienceDefinition.includeConditions.daysToLookBack = daysToLookBack;
  obj.audienceDefinition.includeConditions.membershipDurationDays = membershipDurationDays;
  obj.audienceDefinition.includeConditions.segment = segment;
  return obj;
}

function _createNewAudienceObject(rowObject) {
  return {
      name: rowObject.name,
      linkedViews: rowObject.linkedViews.toString(),
      linkedAdAccounts: [
        {
          type: rowObject.linkedAdAccountType,
          linkedAccountId: rowObject.linkedAdAccountId
        },
      ],
      audienceType: "STATE_BASED",
      stateBasedAudienceDefinition: {
        includeConditions: {
          daysToLookBack: rowObject.daysToLookBack,
          segment: rowObject.segment,
          membershipDurationDays: 60,
          isSmartList: rowObject.isSmartList || false,
        },
        excludeConditions: {
          exclusionDuration: "PERMANENT",
          segment: rowObject.segment || "sessions::condition::ga:city==London",
        },
      },
  };
}
