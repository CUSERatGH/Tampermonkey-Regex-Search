## just for tampermonkey javascript auto updata
### Overview
This user script, named "Web Page Content Search Tool," is designed to enhance the browsing experience by enabling users to search for specific content within any webpage and highlight matching text. Additionally, it provides navigation functionality to jump between highlighted results directly from the search interface.

### Features
Search Functionality: Users can enter a keyword or phrase into a search box, and all matching occurrences on the page will be highlighted.
Highlighting: Matches are visually marked with a yellow background, making them stand out against the rest of the page content.
Navigation Buttons: "Previous" and "Next" buttons allow users to easily navigate through the highlighted matches without needing to manually scroll.
Special Highlighting for Current Match: The currently selected match is given special emphasis with a more distinctive style (e.g., red background and bold text) to differentiate it from other highlights.
User Interface Integration: The search bar and navigation controls are neatly integrated into a fixed position at the top corner of the page, ensuring they remain accessible regardless of where the user scrolls.
###How It Works
#### Initialization:
Upon loading, the script injects a search interface into the webpage, consisting of an input field for entering search terms and two buttons for navigation ("Previous" and "Next").
#### Searching and Highlighting:
When the user clicks the "Search" button, the script scans the entire document for matches using a regular expression that corresponds to the entered keyword.
Each match found is wrapped in a \<mark> tag, which applies the default highlighting style.
If matches are found, the first one is automatically scrolled into view and given special highlighting.
#### Navigating Between Highlights:
Clicking the "Next" button scrolls to the next highlighted match and updates its styling to indicate it as the current selection.
Similarly, the "Previous" button allows moving back through the list of matches.
Navigation buttons are disabled when there are no more matches to navigate to in the respective direction.
#### Clearing Highlights:
Performing a new search clears all previous highlights before applying the new ones, ensuring only relevant matches are shown.
### Implementation Details
CSS Styling: Custom styles are added via GM_addStyle to define the appearance of highlighted text and the specially emphasized current match.
DOM Manipulation: The script dynamically modifies the DOM to insert the search interface and apply highlighting without altering the original page structure.
Event Handling: Listeners are attached to the search and navigation buttons to trigger the appropriate actions when clicked.
### Usage
To use this tool, simply install it via a user script manager like Tampermonkey. Once installed, the search interface becomes available on every webpage you visit, ready to assist in quickly locating desired information.

### Benefits
This script significantly improves the efficiency of searching for content on web pages, especially those with large amounts of text. By providing an intuitive way to find and navigate through multiple instances of a keyword, it enhances the overall user experience on the web.

### Compatibility
The script is compatible with most modern web browsers that support user scripts, such as Chrome, Firefox, and Edge, through extensions like Tampermonkey or Greasemonkey.
