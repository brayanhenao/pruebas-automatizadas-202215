Feature: Create Post

  @user1 @web
  Scenario: Create a post and publish it
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot for Feature "F1" and Scenario "SC1" and Step "1"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F1" and Scenario "SC1" and Step "2"
    And I fill in the title with "Post Feature 1 Scenario 1"
    And I fill in the content with "Content for Post Feature 1 Scenario 1"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F1" and Scenario "SC1" and Step "3"
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F1" and Scenario "SC1" and Step "4"
    And I click the continue publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F1" and Scenario "SC1" and Step "5"
    And I click the publish now button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F1" and Scenario "SC1" and Step "6"
    And I navigate to posts
    And I take a screenshot for Feature "F1" and Scenario "SC1" and Step "7"
    Then I should see the post with title "Post Feature 1 Scenario 1" in the list of posts
    And I should see the post with title "Post Feature 1 Scenario 1" in the blog
