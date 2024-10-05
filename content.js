// Function to check if the current URL is likely a career page
function isCareerPage() {
    const careerTerms = ['career', 'careers', 'job', 'opportunit', 'position', 'opening', 'role'];
    const currentUrl = window.location.href.toLowerCase();
    return careerTerms.some(term => currentUrl.includes(term));
  }
  
  // Function to add the "Find Job Board" button
  function addButton() {
      console.log("Attempting to add button");
      if (!isCareerPage()) {
          return;
      }
  
      const existingButton = document.getElementById('job-board-finder-button');
      if (existingButton) {
          console.log("Button already exists");
          return;
      }
  
       setTimeout(() => {
        const button = document.createElement('button');
        button.textContent = 'Find Job Board';
        button.id = 'job-board-finder-button';
        Object.assign(button.style, {
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: '9999999',
            padding: '10px 20px',
            fontSize: '16px',
            color: 'white',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            maxWidth: '150px'
        });

        button.addEventListener('click', findJobBoard);

        document.body.appendChild(button);
        console.log("Button added to page");
    }, 2000); // 2000 milliseconds = 2 seconds delay
}
   
  if (document.readyState === 'loading') {
      console.log("Document still loading, adding DOMContentLoaded listener");
      document.addEventListener('DOMContentLoaded', addButton);
  } else {
      addButton();
  }
  
  // Function to find the job board button
  let currentButtonIndex = -1;
let jobBoardButtons = [];

function findJobBoard() {
    console.log("Finding job board");
    const searchTerms = ['search', 'view', 'see', 'current', 'open', 'career', 'join us'];
    const jobRelatedTerms = ['job', 'role', 'position', 'opening', 'opportunit', 'career', 'join us'];

    let mainContent = document.querySelector('main') || 
                      document.querySelector('#main-content') || 
                      document.querySelector('.main-content') ||
                      document.querySelector('article') ||
                      document.body;

    console.log("Searching for buttons in:", mainContent);

    const elements = mainContent.querySelectorAll('button, a, div[role="button"], div[tabindex="0"], div > a');
    console.log(`Found ${elements.length} potential elements in main content`);

    jobBoardButtons = []; // Reset the array

    for (let element of elements) {
        if (isInList(element) || isInHeaderOrFooter(element)) {
            console.log("Skipping element in list or header/footer:", element.textContent);
            continue;
        }

        const text = element.textContent.toLowerCase().trim();
        const href = element.href || '';
    
        if ((searchTerms.some(term => text.includes(term)) &&
             jobRelatedTerms.some(term => text.includes(term))) ||
            (element.tagName.toLowerCase() === 'a' && 
             href.includes('requisitions') && 
             text.includes('search jobs'))) {
            console.log("Found job board element:", element);
            console.log("Element text:", element.textContent);
            console.log("Element href (if anchor):", element.href);
            jobBoardButtons.push(element);
        }
    }

    if (jobBoardButtons.length > 0) {
        currentButtonIndex = 0;
        highlightCurrentButton();
        if (jobBoardButtons.length > 1) {
            addNavigationButtons();
        }
    } else {
        alert('No job board button found in the main content area.');
    }
}

function highlightCurrentButton() {
    // Remove highlight from all buttons
    jobBoardButtons.forEach(button => {
        button.style.transition = '';
        button.style.transform = '';
        button.style.boxShadow = '';
        button.style.animation = '';
    });

    // Highlight current button
    const currentButton = jobBoardButtons[currentButtonIndex];
    highlightButton(currentButton);
    scrollToButton(currentButton);
    makeClickable(currentButton);
}

function addNavigationButtons() {
    // Remove existing navigation buttons if they exist
    const existingNavContainer = document.getElementById('job-board-nav-container');
    if (existingNavContainer) {
        existingNavContainer.remove();
    }

    const navContainer = document.createElement('div');
    navContainer.id = 'job-board-nav-container';
    Object.assign(navContainer.style, {
        position: 'fixed',
        bottom: '20px',
        left: '180px', // Positioned next to the "Find Job Board" button
        zIndex: '9999999',
        display: 'flex',
        gap: '10px'
    });

    const prevButton = createNavButton('Previous', () => {
        currentButtonIndex = (currentButtonIndex - 1 + jobBoardButtons.length) % jobBoardButtons.length;
        highlightCurrentButton();
    });

    const nextButton = createNavButton('Next', () => {
        currentButtonIndex = (currentButtonIndex + 1) % jobBoardButtons.length;
        highlightCurrentButton();
    });

    navContainer.appendChild(prevButton);
    navContainer.appendChild(nextButton);
    document.body.appendChild(navContainer);
}

function createNavButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    Object.assign(button.style, {
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
    });
    button.addEventListener('click', onClick);
    return button;
}
function addButton() {
    console.log("Attempting to add button");
    if (!isCareerPage()) {
        return;
    }

    const existingButton = document.getElementById('job-board-finder-button');
    if (existingButton) {
        console.log("Button already exists");
        return;
    }

    // Remove existing navigation buttons if they exist
    const existingNavContainer = document.getElementById('job-board-nav-container');
    if (existingNavContainer) {
        existingNavContainer.remove();
    }

    const button = document.createElement('button');
    button.textContent = 'Find Job Board';
    button.id = 'job-board-finder-button';
    Object.assign(button.style, {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: '9999999',
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        maxWidth: '150px'
    });

    button.addEventListener('click', findJobBoard);

    document.body.appendChild(button);
    console.log("Button added to page");
}

// Function to check if an element is within a <ul> tag
function isInList(element) {
    let current = element;
    while (current && current !== document.body) {
        if (current.tagName.toLowerCase() === 'ul') {
            return true;
        }
        current = current.parentElement;
    }
    return false;
}

  function isInHeaderOrFooter(element) {
      let current = element;
      while (current && current !== document.body) {
          const tagName = current.tagName.toLowerCase();
          const id = current.id.toLowerCase();
          const className = current.className.toLowerCase();
  
          if (tagName === 'header' || tagName === 'footer' ||
              id.includes('header') || id.includes('footer') ||
              className.includes('header') || className.includes('footer')) {
              return true;
          }
          current = current.parentElement;
      }
      return false;
  }
  
  // Function to highlight the found button
  function highlightButton(button) {
      console.log("Highlighting button");
      button.style.transition = 'all 0.3s';
      button.style.transform = 'scale(1.1)';
      button.style.boxShadow = '0 0 10px red';
      
      const pulseKeyframes = `
          @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
              100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
          }
      `;
      const styleElement = document.createElement('style');
      styleElement.textContent = pulseKeyframes;
      document.head.appendChild(styleElement);
  
      button.style.animation = 'pulse .5s infinite';
  }
  
  // Function to scroll to the found button
  function scrollToButton(button) {
    button.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  // Function to make the element clickable (for div buttons)
  function makeClickable(element) {
      if (element.tagName.toLowerCase() === 'div') {
          element.setAttribute('role', 'button');
          element.setAttribute('tabindex', '0');
          element.addEventListener('keydown', function(event) {
              if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  element.click();
              }
          });
      }
  }
  
  if (isCareerPage()) {
    addButton();
  } else {
    // Do nothing if it's not a career page
  }