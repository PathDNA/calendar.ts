enum MonthValues {
	January = 1,
	February = 4,
	March = 4,
	April = 0,
	May = 2,
	June = 5,
	July = 0,
	August = 3,
	September = 6,
	October = 1,
	November = 4,
	December = 6,
}

enum CenturyValues {
	_1700 = 4,
	_1800 = 2,
	_1900 = 0,
	_2000 = 6,
}

export enum NumDays {
	January = 31,
	February = 28,
	March = 31,
	April = 30,
	May = 31,
	June = 30,
	July = 31,
	August = 31,
	September = 30,
	October = 31,
	November = 30,
	December = 31,
}

export enum DaysOfWeek {
	Sunday,
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday
}



export namespace DaysOfWeek {
	function toString(d: DaysOfWeek): string {
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
}

export enum Months {
	January,
	February,
	March,
	April,
	May,
	June,
	July,
	August,
	September,
	October,
	November,
	December,
}

export namespace Months {
	export function toString(m: Months): string {
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

			default:
				throw ("unsupported month: " + m);
		}
	}
}

export function calculateDayOfWeek(day: number, month: Months, year: number): DaysOfWeek {
	let value = 0;
	const lastTwo = getLastNDigits(year, 2);
	// Add the last two digits of the year
	value += lastTwo;
	// Divide by 4 and drop the remainder
	value = Math.floor(value / 4)
	// Add the day of the month
	value += day
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

export function getNumDays(month: Months, year: number): number {
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

function getLastNDigits(value: number, n: number): number {
	const str = value.toString();
	const lastN = str.substr(str.length - 2)
	return parseInt(lastN);
}

function getMonthValue(month: Months): MonthValues {
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

function getCenturyValue(year: number): CenturyValues {
	if (year < 1700) {
		throw ("years before 1700 are not supported");
	} else if (year < 1800) {
		return CenturyValues._1700;
	} else if (year < 1900) {
		return CenturyValues._1800;
	} else if (year < 2000) {
		return CenturyValues._1900;
	} else if (year < 2100) {
		return CenturyValues._2000;
	} else {
		// Our year is past the 20th century, subtract 400 and try again
		return getCenturyValue(year - 400);
	}
}

function getReductionValue(month: Months, year: number): number {
	if (!isLeapYear(year)) {
		return 0;
	}

	if (month !== Months.January && month !== Months.February) {
		return 0;
	}

	return 1;
}


function isLeapYear(year: number): boolean {
	if (year % 4 !== 0) {
		return false;
	}

	if (year % 100 === 0) {
		return false;
	}

	return true
}

function getDayOfWeek(n: number): DaysOfWeek {
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
		case 0:
			return DaysOfWeek.Saturday;

		default:
			throw ("invalid day of week");
	}
}