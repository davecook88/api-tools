class SheetValues {
  constructor(ssm) {
    this.idReference = {};
    this.columnIndexes = ssm.rowHeaders;
  }

  assimilateEntry(entry) {
    this.idReference[entry.id] = entry;
    
  }

  createRowsFromObject() {
    const rows = [];
    for (let id in this.idReference) {
      const audience = this.idReference[id];

      const audienceRow =  [];
      for (let header in this.columnIndexes){
        const index = this.columnIndexes[header];
        audienceRow[index] = audience[header] || '';
      } 
      rows.push(audienceRow);
    }
    return rows;
  }

  getValuesFromSheetAsObject(ssm) {
    if (!ssm) return;
    const obj = {};
    ssm.forEachRow((row) => {
      const audienceId = row.col("id");
      const rowObject = ssm.createObjectFromRow(row);
      obj[audienceId] = rowObject;
    });
    this.idReference = obj;
  }
}
