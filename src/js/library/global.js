

   //*******************************************************
   // Vars
   //*******************************************************

      const pageWrapper = document.getElementById('page-wrapper');


   //*******************************************************
   // Sticky nav
   //*******************************************************

      window.addEventListener('scroll', function() {
         const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
         if (scrollTop > 1) {
            pageWrapper.classList.add('sticky')
         } else {
            pageWrapper.classList.remove('sticky')
         }
      });
