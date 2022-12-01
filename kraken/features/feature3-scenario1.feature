Feature: Create Tag

  @user1 @web
  Scenario: Create a public tag and list it
    Given I login into ghost admin console
    When I navigate to tags
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC1" and Step "1"
    And I click the create tag button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC1" and Step "2"
    And I fill in the tag name with "Title Page"
    And I fill in the tag description with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC1" and Step "3"
    And I click the save tag button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC1" and Step "4"
    And I navigate to tags
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC1" and Step "5"
    Then I should see the tag with title "Title Page" in the list of tags
