interface DateConstructor {
    compare(date1 : Date, date2 : Date) : number;
    equals(equals : Date, date2 : Date) : boolean;
    equalsDay(equals : Date, date2 : Date) : boolean;
    getDayNumberFromName(day : string) : number;
    getDaysInMonth(year : number, month : number) : number;
    getMonthAbbrNameFromNumber(month : number) : string;
    getMonthNameFromNumber(month : number) : string;
    getMonthNumberFromName(month : string) : number;
    isLeapYear(year : number) : boolean;

    today() : Date;
    tomorrow() : Date;
    yesterday() : Date;
    UTCtoday() : Date;
    UTCtomorrow() : Date;

    validateDay(day : number, year : number, month : number) : boolean;
    validateHour(hour : number) : boolean;

    validateMillisecond(millisecond : number) : boolean;
    validateMinute(minute : number) : boolean;
    validateMonth(month : number) : boolean;
    validateSecond(second : number) : boolean;
    validateYear(year : number) : boolean;
}

interface Date {
    add(additions : DateModifier) : Date;
    remove(removals : DateModifier) : Date;
    clearTime() : Date;
    clearUTCTime() : Date;
    setTimeToNow() : Date;
    clone() : Date;

    getDaysBetween(date : Date) : number;
    getMillisecondsBetween(date : Date) : number;
    getMinutesBetween(date : Date) : number;
    getSecondsBetween(date : Date) : number;
    getHoursBetween(date : Date) : number;
    getMonthsBetween(date : Date) : number;

    getWeekNumber() : number;
    getFullWeekNumber() : number;
    getOrdinalNumber() : number;

    getLastMonthName() : string;
    getMonthAbbr() : string;
    getMonthName() : string;
    getUTCOffset() : string;

    between() : boolean;
    compareTo(date : Date) : number;
    equals(date : Date) : boolean;
    equalsDay(date : Date) : boolean;

    isAfter(date : Date) : boolean;
    isBefore(date : Date) : boolean;
    isToday() : boolean;
    isWeekend() : boolean;

    toCLFString() : string;
    toDBString() : string;
    toFormat(format : string) : string;
    toUTCFormat(format : string) : string;
}

interface DateModifier {
    milliseconds : number
    seconds : number
    minutes : number
    hours : number
    days : number
    weeks : number
    months : number
    years : number
}