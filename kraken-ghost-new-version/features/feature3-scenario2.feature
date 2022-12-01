Feature: Create Tag

  @user1 @web
  Scenario: Create an internal tag, assign it to 3 posts, verify the post count in the list
    Given I navigate to login page
    When I enter login credentials
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "1"
    And I click the login button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "2"
    When I navigate to tags
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "3"
    And I click the create tag button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "4"
    And I fill in the tag name with "Tag Test"
    And I wait for 2 seconds
    And I fill in the tag description with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "5"
    And I wait for 1 seconds
    And I click the save tag button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "6"
    And I navigate to posts
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "7"
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "8"
    And I fill in the title with "First Post Feature 3 Scenario 2"
    And I wait for 2 seconds
    And I fill in the content with "Content for First Post Feature 3 Scenario 2"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "9"
    And I wait for 1 seconds
    And I click the settings menu
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "10"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "11"
    And I click the select tag
    And I wait for 2 seconds
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "12"
    And I click the publish now button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "13"
    And I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "14"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "15"
    And I fill in the title with "Second Post Feature 3 Scenario 2"
    And I wait for 2 seconds
    And I fill in the content with "Content for Second Post Feature 3 Scenario 2"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "16"
    And I wait for 2 seconds
    And I click the settings menu
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "17"
    And I click the select tag
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "18"
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "19"
    And I click the publish now button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "20"
    And I navigate to posts
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "21"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "22"
    And I fill in the title with "Third Post Feature 3 Scenario 2"
    And I wait for 2 seconds
    And I fill in the content with "Content for Third Post Feature 3 Scenario 2"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "23"
    And I wait for 2 seconds
    And I click the settings menu
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "24"
    And I click the select tag
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "25"
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "26"
    And I click the publish now button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "27"
    And I navigate to posts
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "28"
    And I navigate to tags
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2" and Step "29"
    Then I should see the tag with name "Tag Test" and 3 post in the list of tags
