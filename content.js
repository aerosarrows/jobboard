// Function to check if the current URL is likely a career page
function isCareerPage() {
  const careerTerms = ['career', 'job', 'opportunit', 'position', 'opening', 'role'];
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
 
if (document.readyState === 'loading') {
    console.log("Document still loading, adding DOMContentLoaded listener");
    document.addEventListener('DOMContentLoaded', addButton);
} else {
    addButton();
}

// Function to find the job board button
function findJobBoard() {
    console.log("Finding job board");
    const searchTerms = ['search', 'view', 'see', 'current', 'open', 'career'];
    const jobRelatedTerms = ['job', 'role', 'position', 'opening', 'opportunit', 'career'];

    let mainContent = document.querySelector('main') || 
                      document.querySelector('#main-content') || 
                      document.querySelector('.main-content') ||
                      document.querySelector('article') ||
                      document.body;

    console.log("Searching for buttons in:", mainContent);

    const buttons = mainContent.querySelectorAll('button, a');
    console.log(`Found ${buttons.length} potential buttons/links in main content`);

    for (let button of buttons) {
        if (isInHeaderOrFooter(button)) {
            console.log("Skipping button in header/footer:", button.textContent);
            continue;
        }

        const text = button.textContent.toLowerCase();
    
        if (searchTerms.some(term => text.includes(term)) &&
            jobRelatedTerms.some(term => text.includes(term))) {
            console.log("Found job board button:", button);
            console.log("Button text:", button.textContent);
            console.log("Button href (if anchor):", button.href);
            highlightButton(button);
            scrollToButton(button);
            startAutoClickTimer(button);
            return;
        }
    }
    alert('No job board button found in the main content area.');
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

if (isCareerPage()) {
  addButton();
} else {
}