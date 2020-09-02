function mapDimensionValues(dimension = {}) {
  return {
    id:dimension.id || '',
    property:dimension.id || '',
    name: dimension.name || '',
    index: dimension.index || '',
    created:dimension.created || '',
    updated:dimension.updated || '',
    active: dimension.active || '',
    url:dimension.selfLink || '',
    scope: dimension.scope || '',

  };
}
