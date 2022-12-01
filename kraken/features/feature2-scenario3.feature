Feature: List Posts

  @user1 @web
  Scenario: Filter posts in draft status
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "1"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "2"
    And I fill in the title with "Draft Post Feature 2 Scenario 3"
    And I fill in the content with "Content for Draft Post Feature 2 Scenario 3"
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "3"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "4"
    And I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "5"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "6"
    And I fill in the title with "Published Post Feature 2 Scenario 3"
    And I fill in the content with "Content for Published Post Feature 2 Scenario 3"
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "7"
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "8"
    And I click the continue publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "9"
    And I click the publish now button
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "10"
    And I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "11"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "12"
    And I fill in the title with "Scheduled Post Feature 2 Scenario 3"
    And I fill in the content with "Content for Scheduled Post Feature 2 Scenario 3"
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "13"
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "14"
    And I schedule post for later with date "2024-01-01" and time "01:00"
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "15"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "16"
    And I click the continue publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "17"
    And I click the publish now button
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "18"
    And I navigate to posts
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "19"
    And I filter the posts by status "Draft"
    And I take a screenshot for Feature "F2" and Scenario "SC2" and Step "20"
    Then I should see the post with title "Draft Post Feature 2 Scenario 3" in the list of posts
    And I should not see the post with title "Published Post Feature 2 Scenario 3" in the list of posts
    And I should not see the post with title "Scheduled Post Feature 2 Scenario 3" in the list of posts
    And I should not see the post with title "Draft Post Feature 2 Scenario 3" in the blog
