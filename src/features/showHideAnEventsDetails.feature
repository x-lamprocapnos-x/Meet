Feature: Show / Hide An Events Details
    Scenario: An event element is collapsed by default
        Given the event page is open
        When a user has not clicked on any event
        Then all events shall be collapsed

    Scenario: User can expand an event to see its details
        Given the event page is open
        When a user clicks on an event
        Then more details shall be displayed

    Scenario: User can collapse an event to hide its details
        Given a user had clicked on an event
        When the user is done viewing the details and clicks away or back
        Then the event details shall collapse

