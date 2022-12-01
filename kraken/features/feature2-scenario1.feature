Feature: List Posts

  @user1 @web
  Scenario: Filter posts by publish date (oldest first)
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "1"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "2"
    And I fill in the title with "First Post Feature 2 Scenario 1"
    And I fill in the content with "First Content for Post Feature 2 Scenario 1"
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "3"
    And I click the settings menu
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "4"
    And I change the publish date to "2022-01-01" and time to "01:00"
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "5"
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "6"
    And I click the continue publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "7"
    And I click the publish now button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "8"
    And I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "9"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "10"
    And I fill in the title with "Second Post Feature 2 Scenario 1"
    And I fill in the content with "Second Content for Post Feature 2 Scenario 1"
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "11"
    And I click the settings menu
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "12"
    And I change the publish date to "2018-01-01" and time to "01:00"
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "13"
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "14"
    And I click the continue publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "15"
    And I click the publish now button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "16"
    And I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "17"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "18"
    And I fill in the title with "Third Post Feature 2 Scenario 1"
    And I fill in the content with "Third Content for Post Feature 2 Scenario 1"
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "19"
    And I click the settings menu
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "20"
    And I change the publish date to "2020-01-01" and time to "01:00"
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "21"
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "22"
    And I click the continue publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "23"
    And I click the publish now button
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "24"
    And I navigate to posts
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "25"
    And I filter the posts published date by "Oldest first"
    And I take a screenshot for Feature "F2" and Scenario "SC1" and Step "26"
    Then I should see the post with title "Second Post Feature 2 Scenario 1" in the position 1
    And I should see the post with title "Third Post Feature 2 Scenario 1" in the position 2
    And I should see the post with title "First Post Feature 2 Scenario 1" in the position 3
