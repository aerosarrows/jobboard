function isCareerPage() {
    const url = window.location.href.toLowerCase();
    const careerKeywords = ['career', 'job', 'opportunit', 'position', 'opening', 'employ'];
    return careerKeywords.some(keyword => url.includes(keyword));
  }
  
  function addButton() {
    if (!isCareerPage()) { 
      return;
    }
  
    console.log("Attempting to add button on career page");
    const existingButton = document.getElementById('job-board-finder-button');
    if (existingButton) { 
      return;
    }
  
    const button = document.createElement('button');
    button.textContent = 'Find Job Board';
    button.id = 'job-board-finder-button';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.left = '20px';
    button.style.zIndex = '9999999';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.color = 'white';
    button.style.backgroundColor = '#4CAF50';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    button.style.maxWidth = '150px';
  
    button.addEventListener('click', () => { 
      findJobBoard();
    });
  
    document.body.appendChild(button); 
  }
  
  function findJobBoard() {
    const searchTerms = ['search', 'view', 'see', 'current', 'open', 'career'];
    const jobRelatedTerms = ['job', 'role', 'position', 'opening', 'opportunit', 'career'];
  
    const buttons = document.querySelectorAll('button, a');
    for (let button of buttons) {
      const text = button.textContent.toLowerCase();
      
      // Check if the text contains at least one search term and one job-related term
      if (searchTerms.some(term => text.includes(term)) &&
          jobRelatedTerms.some(term => text.includes(term))) {
        highlightButton(button);
        scrollToButton(button);
        startAutoClickTimer(button);
        return;
      }
    }
    alert('No job board button found on this page.');
  }

  
  
  function highlightButton(button) {
    button.style.transition = 'all 0.3s';
    button.style.transform = 'scale(1.1)';
    button.style.boxShadow = '0 0 10px red';
    
    // Add pulsing effect
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
  
    button.style.animation = 'pulse 1.5s infinite';
  }
  
  function scrollToButton(button) {
    button.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  function startAutoClickTimer(button) {
    let countdown = 5;
    const countdownElement = document.createElement('div');
    countdownElement.style.position = 'fixed';
    countdownElement.style.top = '20px';
    countdownElement.style.left = '50%';
    countdownElement.style.transform = 'translateX(-50%)';
    countdownElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    countdownElement.style.color = 'white';
    countdownElement.style.padding = '10px';
    countdownElement.style.borderRadius = '5px';
    countdownElement.style.zIndex = '10000';
    document.body.appendChild(countdownElement);
  
    const timer = setInterval(() => {
      countdownElement.textContent = `Auto-redirecting in ${countdown} seconds...`;
      countdown--;
  
      if (countdown < 0) {
        clearInterval(timer);
        countdownElement.remove();
        button.click(); 
      }
    }, 1000);
  }
  
  function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      #job-board-finder-button:hover {
        background-color: #45a049;
      }
    `;
    document.head.appendChild(styleElement);
  }
  
  console.log("Content script loaded");
  addButton();
  addStyles();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
  } else {
    addButton();
  }

  setTimeout(addButton, 3000);