Feature: List Pages

  @user1 @web
  Scenario: Filter pages in draft status
    Given I login into ghost admin console
    When I navigate to pages
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "1"
    And I click the create page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "2"
    And I fill in the page title with "Title Page"
    And I fill in the page content with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I wait for 1 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "3"
    And I click the publish page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "4"
    And I click the continue publish page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "5"
    And I click the publish page now button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "6"
    And I navigate to pages
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "7"
    And I click the create page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "8"
    And I fill in the page title with "Post Feature 5 Scenario 1"
    And I fill in the page content with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I wait for 1 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "9"
    And I navigate to pages
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "10"
    And I click the create page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "11"
    And I fill in the page title with "Title 2"
    And I fill in the page content with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I wait for 1 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "12"
    And I navigate to pages
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "13"
    And I click the filter pages button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "14"
    And I click the filter draft pages button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC1" and Step "15"
    Then I should see 2 number of pages with status "Draft".
