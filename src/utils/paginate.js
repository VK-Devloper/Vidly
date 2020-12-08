import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startindex = (pageNumber - 1) * pageSize;

  return _(items).slice(startindex).take(pageSize).value();
}
