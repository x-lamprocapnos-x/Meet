Feature: Specify Number Of Events
    Scenario: When user hasn’t specified a number, 32 is the default number
        Given the event page is open
        When viewing the page without filter
        Then 32 events shall be listed

    Scenario: User can change the number of events they want to see
        Given the event page is open
        When a user selects number on events to be filtered
        Then that specified number of events shall be displayed
