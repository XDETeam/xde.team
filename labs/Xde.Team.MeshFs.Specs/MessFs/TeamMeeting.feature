Feature: TeamMeeting

A short summary of the feature

@Calendar
Scenario: Shared calendars for the meeting participants
	Given Meeting "Some c00l meeting"
	And Scheduled weekly at 09:30+01
	When Stan look at calendar on 2022-01-10
	#Then Calendar has meeting item
