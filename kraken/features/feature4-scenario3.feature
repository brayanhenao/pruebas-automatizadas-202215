Feature: Create Page

  @user1 @web
  Scenario: Create page and schedule the publish date
    Given I login into ghost admin console
    When I navigate to pages
    And I wait for 2 seconds
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "1"
    And I click the create page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "2"
    And I fill in the page title with "Post Feature 4 Scenario 3"
    And I fill in the page content with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I wait for 2 seconds
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "3"
    And I click the publish page button
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "4"
    And I click the Right now page button
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "5"
    And I click the Schedule For Later Button button
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "6"
    And I fill in the date with "2022-11-12"
    And I fill in the time with "04:25"
    And I wait for 1 seconds
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "7"
    And I click the continue publish page button
    And I wait for 1 seconds
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "8"
    And I click the publish page now button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "9"
    And I navigate to pages
    And I take a screenshot for Feature "F4" and Scenario "SC3" and Step "10"
    Then I should see the pages with title "Post Feature 4 Scenario 3" in the list of pages with status "Scheduled"
    And I navigate to page with slug "Post Feature 4 Scenario 3"
    And I should see the page response with 404
