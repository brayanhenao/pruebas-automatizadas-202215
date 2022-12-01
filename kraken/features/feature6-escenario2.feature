Feature: Create Member

  @user1 @web
  Scenario: Create a member and filter it
    Given I login into ghost admin console
    When I navigate to members
    And I wait for 2 seconds
    And I take a screenshot for Feature "F6" and Scenario "SC2" and Step "1"
    And I click the create New member button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F6" and Scenario "SC2" and Step "2"
    And I fill in the Name with "New member Unsubscribed"
    And I wait for 2 seconds
    And I fill in the email with "newmemberunsubscribed@mail.com"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F6" and Scenario "SC2" and Step "3"
    And I set member as unsubscribed
    And I wait for 2 seconds
    And I take a screenshot for Feature "F6" and Scenario "SC2" and Step "4"
    And I click the save button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F6" and Scenario "SC2" and Step "5"
    And I navigate to members
    And I wait for 2 seconds
    And I take a screenshot for Feature "F6" and Scenario "SC2" and Step "6"
    And I click on filter member
    And I wait for 2 seconds
    And I take a screenshot for Feature "F6" and Scenario "SC2" and Step "7"
    And I filter members as "unsubscribed" member
    And I wait for 2 seconds
    And I take a screenshot for Feature "F6" and Scenario "SC2" and Step "8"
    Then I should see the member with email "newmemberunsubscribed@mail.com" in the list of members
