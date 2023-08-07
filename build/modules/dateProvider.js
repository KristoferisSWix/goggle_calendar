export default class DateProvider {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.currentDay = new Date().getDate();
    }
    // week getters
    getWeekDayName(weekDay) {
        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return dayNames[weekDay];
    }
    getWeekDay(day = this.currentDay, month = this.currentMonth, year = this.currentYear) {
        return new Date(year, month, day).getDay();
    }
    getFullWeekInformation(weekOffset = 0) {
        const viewingDay = this.currentDay + 7 * weekOffset;
        const viewingDate = new Date(this.currentYear, this.currentMonth, viewingDay);
        const firstDayOfWeek = viewingDate.getDate() - this.getWeekDay(viewingDay);
        const firstWeekInformation = [];
        for (let i = 0; i < 7; i++) {
            const dateDay = firstDayOfWeek + i;
            const saveDate = new Date(viewingDate.getFullYear(), viewingDate.getMonth(), dateDay);
            const isCurrentCheck = this.currentDay === saveDate.getDate() &&
                this.currentMonth === saveDate.getMonth() &&
                this.currentYear === saveDate.getFullYear();
            firstWeekInformation.push({
                year: saveDate.getFullYear(),
                month: saveDate.getMonth(),
                day: saveDate.getDate(),
                weekDayName: this.getWeekDayName(saveDate.getDay()),
                isCurrent: isCurrentCheck,
            });
        }
        return firstWeekInformation;
    }
    // month getters
    getMonthName(month = this.currentMonth) {
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        return monthNames[month];
    }
    getPrevAndCurrMonthLength(providedMonthOffset = 0) {
        const { year, month } = this.parseDateFromMonthOffset(providedMonthOffset);
        const currentMonthLength = new Date(year, month + 1, 0).getDate();
        const prevMonthLength = new Date(year, month, 0).getDate();
        return { currentMonthLength, prevMonthLength };
    }
    // misc
    getOffsetGMT() {
        function isSingleDigit(n) {
            return (n < 10 ? '0' : '') + n;
        }
        let offset = new Date().getTimezoneOffset();
        let sign = offset < 0 ? '+' : '-';
        offset = Math.abs(offset);
        return sign + isSingleDigit((offset / 60) | 0);
    }
    parseDateFromMonthOffset(monthOffset = 0) {
        let correctedMonthOffset = this.currentMonth + monthOffset;
        const parsedDate = new Date(this.currentYear, correctedMonthOffset);
        // months in 0-11 basis
        return {
            year: parsedDate.getFullYear(),
            month: parsedDate.getMonth(),
        };
    }
}
