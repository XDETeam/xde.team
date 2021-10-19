Feature: TODO: FlowBasics

A short summary of the feature

Scenario: Get flows by tags
	Given Default flows
	And User Stan
	
	When Get flows by tags xde,server

	Then Display flow "XDE Team Server"
