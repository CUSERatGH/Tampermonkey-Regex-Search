// ==UserScript==
// @name         Web Page Content Search Tool
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description  Search for content on the current webpage and highlight matches with navigation.
// @author       Eric
// @match        *://*/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Add custom styles immediately to ensure they're available when needed
    GM_addStyle(`
        .active-highlight {
            background-color: red !important; /* More distinctive color */
            font-weight: bold;
        }
    `);

    // Function to initialize UI components once the DOM is ready
    function initUI() {
        const searchBox = document.createElement('input');
        searchBox.type = 'text';
        searchBox.placeholder = 'Enter search term';

        const searchButton = document.createElement('button');
        searchButton.textContent = 'Search';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = true;

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';

        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '10px';
        container.style.right = '10px';
        container.style.zIndex = '9999';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.gap = '5px';

        container.appendChild(searchBox);
        container.appendChild(searchButton);
        container.appendChild(prevButton);
        container.appendChild(nextButton);

        document.body.appendChild(container);

        let currentIndex = 0;
        let highlights = [];

        function highlightMatches(keyword) {
            const regex = new RegExp(`(${keyword})`, 'gi');
            highlights = [];

            const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, li, a');
            elements.forEach(el => {
                if (el.nodeType === Node.ELEMENT_NODE) {
                    Array.from(el.childNodes).forEach(childNode => {
                        if (childNode.nodeType === Node.TEXT_NODE) {
                            let textContent = childNode.nodeValue;
                            if (regex.test(textContent)) {
                                let fragment = document.createDocumentFragment();
                                let lastIndex = 0;

                                textContent.replace(regex, (match, offset) => {
                                    if (offset > lastIndex) {
                                        fragment.appendChild(document.createTextNode(textContent.substring(lastIndex, offset)));
                                    }
                                    let mark = document.createElement('mark');
                                    mark.style.backgroundColor = 'yellow';
                                    mark.textContent = match;
                                    fragment.appendChild(mark);
                                    highlights.push(mark);
                                    lastIndex = offset + match.length;
                                });

                                if (lastIndex < textContent.length) {
                                    fragment.appendChild(document.createTextNode(textContent.substring(lastIndex)));
                                }

                                el.insertBefore(fragment, childNode);
                                el.removeChild(childNode);
                            }
                        }
                    });
                }
            });

            return highlights;
        }

        function scrollToHighlight(highlight) {
            if (!highlight) return;
            highlight.scrollIntoView({ behavior: 'smooth', block: 'center' });

            highlights.forEach(hl => hl.classList.remove('active-highlight'));
            highlight.classList.add('active-highlight');
        }

        searchButton.addEventListener('click', () => {
            const keyword = searchBox.value.trim();
            if (!keyword) return;

            document.querySelectorAll('mark').forEach(mark => mark.parentNode.replaceChild(mark.firstChild, mark));

            highlights = highlightMatches(keyword);

            if (highlights.length > 0) {
                currentIndex = 0;
                prevButton.disabled = true;
                nextButton.disabled = false;
                scrollToHighlight(highlights[currentIndex]);
            } else {
                prevButton.disabled = true;
                nextButton.disabled = true;
            }
        });

        prevButton.addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            if (currentIndex === 0) prevButton.disabled = true;
            nextButton.disabled = false;
            scrollToHighlight(highlights[currentIndex]);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = Math.min(currentIndex + 1, highlights.length - 1);
            if (currentIndex === highlights.length - 1) nextButton.disabled = true;
            prevButton.disabled = false;
            scrollToHighlight(highlights[currentIndex]);
        });
    }

    // Wait until the DOM is fully loaded before initializing the UI
    document.addEventListener('DOMContentLoaded', initUI);
})();
