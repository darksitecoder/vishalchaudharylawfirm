// Enhanced responsive submenu toggling for "Our Services" nav item
jQuery(document).ready(function($){
  // Enable dropdown on hover for desktop, on click for mobile
  function isDesktop() { return window.innerWidth > 991; }
  var $dropdown = $(".nav-item.dropdown");
  
  function handleDropdown() {
    if(isDesktop()) {
      // Remove all previous handlers to start fresh
      $dropdown.find('> a.nav-link').off('click touchstart');
      $dropdown.off('mouseenter mouseleave');
      
      // Desktop: hover to show dropdown
      $dropdown.hover(
        function() {
          $(this).addClass('show');
          $(this).find('.dropdown-menu').addClass('show');
        },
        function() {
          $(this).removeClass('show');
          $(this).find('.dropdown-menu').removeClass('show');
        }
      );
      
      // On desktop, ensure clicking the link navigates to services.html
      $dropdown.find('> a.nav-link').on('click', function(e) {
        // Only handle if clicking directly on the link itself (not on dropdown menu)
        if (!$(e.target).closest('.dropdown-menu').length) {
          var href = $(this).attr('href');
          if (href) {
            // Navigate to the href
            window.location.href = href;
            e.preventDefault(); // Prevent default to avoid double navigation
            return false;
          }
        }
      });
    } else {
      // Remove desktop hover handlers
      $dropdown.off('mouseenter mouseleave');
      
      // Mobile: click to toggle dropdown, always prevent navigation (use menu item to navigate)
      $dropdown.find('> a.nav-link').off('click touchstart').on('click touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $parent = $(this).parent('.dropdown');
        $parent.toggleClass('show');
        $parent.find('.dropdown-menu').toggleClass('show');
      });
      
      // Close dropdown when clicking on a dropdown item
      $dropdown.find('.dropdown-item').off('click touchstart').on('click touchstart', function(e) {
        $dropdown.removeClass('show');
        $dropdown.find('.dropdown-menu').removeClass('show');
      });
      
      // Close dropdown when clicking outside
      $(document).off('click.services-dropdown').on('click.services-dropdown', function(e) {
        if (!$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) {
          $dropdown.removeClass('show');
          $dropdown.find('.dropdown-menu').removeClass('show');
        }
      });
    }
  }
  
  handleDropdown();
  $(window).on('resize', function(){
    // Remove all show-classes / clean up
    $dropdown.removeClass('show');
    $dropdown.find('.dropdown-menu').removeClass('show');
    handleDropdown();
  });
});

