import _ from "lodash";

/**
 * Recursive function to omit properties at all levels
 * @param {*} omittedFields array of deeply omitted fields
 */

function deepEqualWithOmit(obj1, obj2, omittedFields = []) {
  function omitId(obj) {
    if (_.isArray(obj)) {
      return obj.map(omitId);
    }
    if (_.isObject(obj)) {
      return _.transform(obj, (result, value, key) => {
        if (!omittedFields.includes(key)) {
          // eslint-disable-next-line no-param-reassign
          result[key] = omitId(value);
        }
      });
    }
    return obj;
  }

  const obj1Omitted = _.cloneDeepWith(obj1, omitId);
  const obj2Omitted = _.cloneDeepWith(obj2, omitId);

  return _.isEqual(obj1Omitted, obj2Omitted);
}

export default deepEqualWithOmit;
