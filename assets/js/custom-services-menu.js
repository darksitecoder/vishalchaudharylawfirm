// Enhanced responsive submenu toggling for "Our Services" nav item
jQuery(document).ready(function($){
  // Enable dropdown on hover for desktop, on click for mobile
  function isDesktop() { return window.innerWidth > 991; }
  var $dropdown = $(".nav-item.dropdown.position-static");
  
  function handleDropdown() {
    if(isDesktop()) {
      $dropdown.off('mouseenter mouseleave');
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
    } else {
      $dropdown.off('mouseenter mouseleave');
      $dropdown.find('> a.nav-link').off('click').on('click', function(e) {
        e.preventDefault();
        var $parent = $(this).parent();
        $parent.toggleClass('show');
        $parent.find('.dropdown-menu').toggleClass('show');
      });
      // Hide dropdown when navigating
      $dropdown.find('.dropdown-item').on('click', function() {
        $dropdown.removeClass('show');
        $dropdown.find('.dropdown-menu').removeClass('show');
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

