
import _ from "lodash";

class DashboardReaders {
    public static GetChartValue(_object: any, key: string) {
        try {
            if (_object) {
                return _.get(_object, ["chart", key], 1);
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
}

export default DashboardReaders;