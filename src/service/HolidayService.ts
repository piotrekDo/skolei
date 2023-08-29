import { Holiday } from '../model/Holiday';

class HoliDayService {
    holidaysSet = new Set([
        new Date(2023, 0, 1, 0, 0, 0, 0).getTime(),
        new Date(2023, 0, 6, 0, 0, 0, 0).getTime(),
        new Date(2023, 3, 9, 0, 0, 0, 0).getTime(),
        new Date(2023, 3, 10, 0, 0, 0, 0).getTime(),
        new Date(2023, 4, 1, 0, 0, 0, 0).getTime(),
        new Date(2023, 4, 3, 0, 0, 0, 0).getTime(),
        new Date(2023, 4, 28, 0, 0, 0, 0).getTime(),
        new Date(2023, 5, 8, 0, 0, 0, 0).getTime(),
        new Date(2023, 7, 15, 0, 0, 0, 0).getTime(),
        new Date(2023, 10, 1, 0, 0, 0, 0).getTime(),
        new Date(2023, 10, 11, 0, 0, 0, 0).getTime(),
        new Date(2023, 11, 25, 0, 0, 0, 0).getTime(),
        new Date(2023, 11, 26, 0, 0, 0, 0).getTime(),
    ]);

  holidays2023: Holiday[] = [
    { date: new Date(2023, 0, 1), description: 'Nowy Rok' },
    { date: new Date(2023, 0, 6), description: 'Święto Trzech Króli' },
    { date: new Date(2023, 3, 9), description: 'Wielkanoc' },
    { date: new Date(2023, 3, 10), description: 'Wielkanoc' },
    { date: new Date(2023, 4, 1), description: 'Święto Państwowe' },
    { date: new Date(2023, 4, 3), description: 'Święto Narodowe Trzeciego Maja' },
    { date: new Date(2023, 4, 28), description: 'Zielone Świątki' },
    { date: new Date(2023, 5, 8), description: 'Boże Ciało' },
    { date: new Date(2023, 7, 15), description: 'Wniebowzięcie Najświętszej Maryi Panny' },
    { date: new Date(2023, 10, 1), description: 'Wszystkich Świętych' },
    { date: new Date(2023, 10, 11), description: 'Narodowe Święto Niepodległości' },
    { date: new Date(2023, 11, 25), description: 'Boże Narodzenie' },
    { date: new Date(2023, 11, 26), description: 'Boże Narodzenie' },
  ];

  calculateDays(startDate: Date, endDate: Date) {
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    return daysDifference + 1;
  }

  calculateBusinessDays(startDate: Date, endDate: Date): number {
    const totalDays = this.calculateDays(startDate, endDate);
    let businessDays = 0;
    let checkedDate = new Date(startDate);
    checkedDate.setHours(0)
    checkedDate.setMinutes(0)
    checkedDate.setSeconds(0)
    checkedDate.setMilliseconds(0)
    for (let index = 0; index < totalDays; index++) {
        checkedDate.setDate(startDate.getDate() + index);
        const day = checkedDate.getDay();
        if(day === 0 || day === 6 || this.holidaysSet.has(checkedDate.getTime())) continue;
        businessDays ++;
    }
    return businessDays;
  }
}

export default new HoliDayService();
