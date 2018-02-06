define("calendar", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MonthValues;
    (function (MonthValues) {
        MonthValues[MonthValues["January"] = 1] = "January";
        MonthValues[MonthValues["February"] = 4] = "February";
        MonthValues[MonthValues["March"] = 4] = "March";
        MonthValues[MonthValues["April"] = 0] = "April";
        MonthValues[MonthValues["May"] = 2] = "May";
        MonthValues[MonthValues["June"] = 5] = "June";
        MonthValues[MonthValues["July"] = 0] = "July";
        MonthValues[MonthValues["August"] = 3] = "August";
        MonthValues[MonthValues["September"] = 6] = "September";
        MonthValues[MonthValues["October"] = 1] = "October";
        MonthValues[MonthValues["November"] = 4] = "November";
        MonthValues[MonthValues["December"] = 6] = "December";
    })(MonthValues || (MonthValues = {}));
    var CenturyValues;
    (function (CenturyValues) {
        CenturyValues[CenturyValues["_1700"] = 4] = "_1700";
        CenturyValues[CenturyValues["_1800"] = 2] = "_1800";
        CenturyValues[CenturyValues["_1900"] = 0] = "_1900";
        CenturyValues[CenturyValues["_2000"] = 6] = "_2000";
    })(CenturyValues || (CenturyValues = {}));
    var NumDays;
    (function (NumDays) {
        NumDays[NumDays["January"] = 31] = "January";
        NumDays[NumDays["February"] = 28] = "February";
        NumDays[NumDays["March"] = 31] = "March";
        NumDays[NumDays["April"] = 30] = "April";
        NumDays[NumDays["May"] = 31] = "May";
        NumDays[NumDays["June"] = 30] = "June";
        NumDays[NumDays["July"] = 31] = "July";
        NumDays[NumDays["August"] = 31] = "August";
        NumDays[NumDays["September"] = 30] = "September";
        NumDays[NumDays["October"] = 31] = "October";
        NumDays[NumDays["November"] = 30] = "November";
        NumDays[NumDays["December"] = 31] = "December";
    })(NumDays = exports.NumDays || (exports.NumDays = {}));
    var DaysOfWeek;
    (function (DaysOfWeek) {
        DaysOfWeek[DaysOfWeek["Sunday"] = 0] = "Sunday";
        DaysOfWeek[DaysOfWeek["Monday"] = 1] = "Monday";
        DaysOfWeek[DaysOfWeek["Tuesday"] = 2] = "Tuesday";
        DaysOfWeek[DaysOfWeek["Wednesday"] = 3] = "Wednesday";
        DaysOfWeek[DaysOfWeek["Thursday"] = 4] = "Thursday";
        DaysOfWeek[DaysOfWeek["Friday"] = 5] = "Friday";
        DaysOfWeek[DaysOfWeek["Saturday"] = 6] = "Saturday";
    })(DaysOfWeek = exports.DaysOfWeek || (exports.DaysOfWeek = {}));
    var Months;
    (function (Months) {
        Months[Months["January"] = 0] = "January";
        Months[Months["February"] = 1] = "February";
        Months[Months["March"] = 2] = "March";
        Months[Months["April"] = 3] = "April";
        Months[Months["May"] = 4] = "May";
        Months[Months["June"] = 5] = "June";
        Months[Months["July"] = 6] = "July";
        Months[Months["August"] = 7] = "August";
        Months[Months["September"] = 8] = "September";
        Months[Months["October"] = 9] = "October";
        Months[Months["November"] = 10] = "November";
        Months[Months["December"] = 11] = "December";
    })(Months = exports.Months || (exports.Months = {}));
    (function (Months) {
        function toString(m) {
            switch (m) {
                case Months.January:
                    return "January";
                case Months.February:
                    return "February";
                case Months.March:
                    return "March";
                case Months.April:
                    return "April";
                case Months.May:
                    return "May";
                case Months.June:
                    return "June";
                case Months.July:
                    return "July";
                case Months.August:
                    return "August";
                case Months.September:
                    return "September";
                case Months.October:
                    return "October";
                case Months.November:
                    return "November";
                case Months.December:
                    return "December";
            }
            return "UH";
        }
        Months.toString = toString;
    })(Months = exports.Months || (exports.Months = {}));
    function calculateDayOfWeek(day, month, year) {
        let value = 0;
        const lastTwo = getLastNDigits(year, 2);
        // Add the last two digits of the year
        value += lastTwo;
        // Divide by 4 and drop the remainder
        value = Math.floor(value / 4);
        // Add the day of the month
        value += day;
        // Add month's key-value
        value += getMonthValue(month);
        // Reduce by reduction value
        value -= getReductionValue(month, year);
        // Add century value
        value += getCenturyValue(year);
        // Add the last two digits of the year (again)
        value += lastTwo;
        // Set value as the remainder of value divided by 7;
        value = value % 7;
        // Get day of week from remainder of value divided by 7
        return getDayOfWeek(value);
    }
    exports.calculateDayOfWeek = calculateDayOfWeek;
    function getNumDays(month, year) {
        switch (month) {
            case Months.January:
                return NumDays.January;
            case Months.February:
                if (!isLeapYear(year)) {
                    return NumDays.February;
                }
                return NumDays.February + 1;
            case Months.March:
                return NumDays.March;
            case Months.April:
                return NumDays.April;
            case Months.May:
                return NumDays.May;
            case Months.June:
                return NumDays.June;
            case Months.July:
                return NumDays.July;
            case Months.August:
                return NumDays.August;
            case Months.September:
                return NumDays.September;
            case Months.October:
                return NumDays.October;
            case Months.November:
                return NumDays.November;
            case Months.December:
                return NumDays.December;
            default:
                throw ("invalid month: " + month);
        }
    }
    exports.getNumDays = getNumDays;
    function getLastNDigits(value, n) {
        const str = value.toString();
        const lastN = str.substr(str.length - 2);
        return parseInt(lastN);
    }
    function getMonthValue(month) {
        switch (month) {
            case Months.January:
                return MonthValues.January;
            case Months.February:
                return MonthValues.February;
            case Months.March:
                return MonthValues.March;
            case Months.April:
                return MonthValues.April;
            case Months.May:
                return MonthValues.May;
            case Months.June:
                return MonthValues.June;
            case Months.July:
                return MonthValues.July;
            case Months.August:
                return MonthValues.August;
            case Months.September:
                return MonthValues.September;
            case Months.October:
                return MonthValues.October;
            case Months.November:
                return MonthValues.November;
            case Months.December:
                return MonthValues.December;
            default:
                throw ("invalid month: " + month);
        }
    }
    function getCenturyValue(year) {
        if (year < 1700) {
            throw ("years before 1700 are not supported");
        }
        else if (year < 1800) {
            return CenturyValues._1700;
        }
        else if (year < 1900) {
            return CenturyValues._1800;
        }
        else if (year < 2000) {
            return CenturyValues._1900;
        }
        else if (year < 2100) {
            return CenturyValues._2000;
        }
        else {
            // Our year is past the 20th century, subtract 400 and try again
            return getCenturyValue(year - 400);
        }
    }
    function getReductionValue(month, year) {
        if (!isLeapYear(year)) {
            return 0;
        }
        if (month !== Months.January && month !== Months.February) {
            return 0;
        }
        return 1;
    }
    function isLeapYear(year) {
        if (year % 4 !== 0) {
            return false;
        }
        if (year % 100 === 0) {
            return false;
        }
        return true;
    }
    function getDayOfWeek(n) {
        switch (n) {
            case 1:
                return DaysOfWeek.Sunday;
            case 2:
                return DaysOfWeek.Monday;
            case 3:
                return DaysOfWeek.Tuesday;
            case 4:
                return DaysOfWeek.Wednesday;
            case 5:
                return DaysOfWeek.Thursday;
            case 6:
                return DaysOfWeek.Friday;
            case 7:
                return DaysOfWeek.Saturday;
            default:
                throw ("invalid day of week");
        }
    }
    function toString(d) {
        switch (d) {
            case DaysOfWeek.Sunday:
                return "Sunday";
            case DaysOfWeek.Monday:
                return "Monday";
            case DaysOfWeek.Tuesday:
                return "Tuesday";
            case DaysOfWeek.Wednesday:
                return "Wednesday";
            case DaysOfWeek.Thursday:
                return "Thursday";
            case DaysOfWeek.Friday:
                return "Friday";
            case DaysOfWeek.Saturday:
                return "Saturday";
        }
    }
    exports.toString = toString;
});
