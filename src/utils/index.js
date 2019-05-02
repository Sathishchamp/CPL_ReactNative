import _ from 'underscore';

export const isEqual = (obj1, obj2) => _.isEqual(obj1, obj2);

export const isNullOrEmpty = obj => _.isNull(obj) || _.isEmpty(obj);
