export enum TimePeriodSeconds {
	None = 0,
	Minute = 60,
	Hour = TimePeriodSeconds.Minute * 60,
	Day = TimePeriodSeconds.Hour * 24,
	Week = TimePeriodSeconds.Day * 7,
	MonthMean = Math.round(TimePeriodSeconds.Day * 30.436875),
	YearMean = Math.round(TimePeriodSeconds.Day * 365.25),
	Year = TimePeriodSeconds.Day * 365,
}
