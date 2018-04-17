
   //*******************************************************
   // styles
   //*******************************************************

      import '../scss/styles.scss';


   //*******************************************************
   // lazy loading
   //*******************************************************

      import lozad from 'lozad'
      const observer = lozad('.lozad', {
         load: function(el) {
            // Custom implementation to load an element
            el.src = el.getAttribute('data-src');
         },
         loaded: function(el) {
            // Custom implementation on a loaded element
            el.classList.add('loaded');
         }
      });
      observer.observe();




   console.log('app.js');
