function mapDimensionValues(dimension) {
  return {
    property:dimension.webPropertyId,
    name: dimension.name,
    index: dimension.index,
    created:dimension.created,
    updated:dimension.updated,
    active: dimension.active,
    url:dimension.selfLink,
    scope: dimension.scope

  };
}
