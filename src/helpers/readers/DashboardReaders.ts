import _ from "lodash";

class DashboardReaders {
  public static GetChartValue(_object: any, key: string) {
    try {
      return _.get(_object, key, 1);
    } catch (e) {
      return 1;
    }
  }
}

export default DashboardReaders;
