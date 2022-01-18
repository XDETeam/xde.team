Feature: TeamMeeting

	TODO:
	- Meeting itself has a schedule. But this schedule is shared. So everybody in the meeting
	should have it in personal notifications.
	- Meeting can be an event, or just a node? What makes it a meeting?

@Calendar @ToDo
Scenario: Shared calendars for the meeting participants
	Given Meeting of //xde.team
	And Scheduled weekly on Wed at 09:30+01
	When Stan look at calendar on 2022-01-10
	#TODO: Then Calendar has meeting item

@ToDo
Scenario: Fluctuating members
	Meeting may have fluctuating members. Some of them are a part of it regularly.
	Some others join occasionally. So probably they should subscribe to be notified
	and simply write a meeting outcome even if they don't. Subscription can allow to
	be notified with different channels and notification timeframe.
	However there is an issue related to authorization. Not everyone are allowed to
	subscribe to the meeting.

@ToDo
Scenario: Multiple schedules for the meeting
	The same meeting can have different schedules. For example before 2022-01-01
	it can be on Tue and Thu at 10:00+01, after that it can be on Wed at 09:30+01.
	Especially interesting case is when timeframes intersects. For example the first
	timeframe ends on 2022-02-01 and the second one starts on 2021-12-01.

@ToDo
Scenario: Multiple source of timeframes
	Meeting can define timeframe and participant can define its own timeframe.
	Subscription should be notified only when they both intersects or any of them
	are missing.

@ToDo
Scenario: Meeting duration
	Meeting may have an estimated duration to be shown in the calendar. There can be
	also multiple durations for different timeframes.

@ToDo
Scenario: Subscribers
	Participant subscribes to the meeting or meeting contains subscribers?

@ToDo
Scenario: Outcomes
	There are multiple participands of the meeting. Each one has its own outcomes
	from the meeting.

@ToDo
Scenario: Naming
	Names can be localized and in common multiple names may exist. Besides such tricky
	scenarions, a simple named meeting in calendar should be also tested. And missing
	name as well (or it will be well-tested in oother scenations).

	# Given Meeting of //xde.team
	# And Named "Weekly status meeting"
