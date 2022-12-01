Feature: List Members

  @user1 @web
  Scenario: Create 3 members and filter them by name and email
    Given I login into ghost admin console
    When I navigate to members
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "1"
    And I click the create New member button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "2"
    And I fill in the Name with "Member A"
    And I wait for 2 seconds
    And I fill in the email with "membera@mail.com"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "3"
    And I click the save button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "4"
    And I navigate to members
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "5"
    And I click the create New member button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "6"
    And I fill in the Name with "Member B"
    And I wait for 2 seconds
    And I fill in the email with "memberb@mail.com"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "7"
    And I click the save button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "8"
    And I navigate to members
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "9"
    And I click the create New member button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "10"
    And I fill in the Name with "Member C"
    And I wait for 2 seconds
    And I fill in the email with "memberc@mail.com"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "11"
    And I click the save button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "12"
    And I navigate to members
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "13"
    And I click on filter member
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "14"
    And I filter members by name with query "Member"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "15"
    And I click on filter member
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "16"
    And I click the Add filter button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "17"
    And I filter members by email with query "b@" in position 2
    And I wait for 10 seconds
    And I take a screenshot for Feature "F7" and Scenario "SC3" and Step "18"
    Then I should see the member with email "memberb@mail.com" in the list of members
