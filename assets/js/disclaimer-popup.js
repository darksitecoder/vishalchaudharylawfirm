/**
 * Disclaimer Popup Handler
 * Shows disclaimer popup on first visit and stores user preference in localStorage
 */

(function() {
  'use strict';
  
  // Create disclaimer popup HTML if it doesn't exist
  function createDisclaimerPopup() {
    if ($('#disclaimerPopup').length === 0) {
      var disclaimerHTML = `
        <div id="disclaimerPopup" class="disclaimer-popup">
          <div class="disclaimer-content">
            <div class="disclaimer-header">
              <h4><i class="fa fa-info-circle"></i> Legal Disclaimer</h4>
            </div>
            <div class="disclaimer-body">
              <p>This website and its contents are provided for informational purposes only. The information on this website does not constitute legal advice and should not be relied upon as such. No attorney-client relationship is formed by visiting this website or contacting our Office. Please consult with a qualified attorney for advice regarding your specific legal situation.</p>
              <p class="disclaimer-note"><strong>By continuing to use this website, you acknowledge that you have read and understood this disclaimer.</strong></p>
            </div>
            <div class="disclaimer-footer">
              <button type="button" class="disclaimer-btn disclaimer-reject" id="disclaimerReject">
                <i class="fa fa-times"></i> Reject
              </button>
              <button type="button" class="disclaimer-btn disclaimer-accept" id="disclaimerAccept">
                <i class="fa fa-check"></i> Accept
              </button>
            </div>
          </div>
        </div>
      `;
      $('body').append(disclaimerHTML);
    }
  }
  
  // Initialize disclaimer popup
  function initDisclaimerPopup() {
    // Check if user has already accepted/rejected disclaimer
    var disclaimerStatus = localStorage.getItem('disclaimerStatus');
    var disclaimerPopup = $('#disclaimerPopup');
    
    // Only show if user hasn't interacted with it before
    if (!disclaimerStatus) {
      // Wait for page to load, then show popup with slight delay
      setTimeout(function() {
        disclaimerPopup.addClass('show');
      }, 1000); // Show after 1 second of page load
    }
    
    // Accept button handler
    $(document).on('click', '#disclaimerAccept', function() {
      localStorage.setItem('disclaimerStatus', 'accepted');
      disclaimerPopup.removeClass('show').addClass('hide');
      setTimeout(function() {
        disclaimerPopup.hide();
      }, 400);
    });
    
    // Reject button handler
    $(document).on('click', '#disclaimerReject', function() {
      localStorage.setItem('disclaimerStatus', 'rejected');
      disclaimerPopup.removeClass('show').addClass('hide');
      setTimeout(function() {
        disclaimerPopup.hide();
        // Optionally redirect or show message when rejected
        // window.location.href = 'about:blank'; // Uncomment if you want to redirect
      }, 400);
    });
  }
  
  // Initialize when DOM is ready
  $(document).ready(function() {
    createDisclaimerPopup();
    initDisclaimerPopup();
  });
  
})();
