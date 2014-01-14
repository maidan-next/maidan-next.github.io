;(function(document, undefined) {
  var DATA_URL = 'data.json';

  $(function() {
    var $dataContainer = $('#data-container'),
        $body = $('body');

    // Query data
    $.getJSON(DATA_URL)
      .done(function(data) {
        for (var i=0, n=data['sections'].length; i<n; ++i) {
          data['sections'][i]['index'] = i;
        }

        console.log(data);

        // Render data     
        var $sectionsTemplate = $('#sections-template'),
            template = $sectionsTemplate.html();

        $dataContainer.html(Mustache.render(template, data))
          .trigger('rendered');
      })
      .error(function() {
        console.error('Unable to get or parse data');
      });

    // Smooth scroll
    $dataContainer.on('click', '.sidebar-link', function(e) {
        e.preventDefault();
        var target = $($(e.currentTarget).attr('href'));
        $('html,body').animate({
            'scrollTop': target.offset().top
        }, 1000);
        return false;
      })
      .on('rendered', function() {
        $body.scrollspy({
            'target': '.sidebar-wrapper'
          })
          // .scrollspy('refresh');

        $('.nav-sidebar').affix({
            'offset': {
              'top' : 256
            }
          });
      });
    
    // Social buttons
    (function(doc, script) {
      var js,
          fjs = doc.getElementsByTagName(script)[0],
          frag = doc.createDocumentFragment(),
          add = function(url, id) {
              if (doc.getElementById(id)) {
                  return;
              }
              js = doc.createElement(script);
              js.src = url;
              id && (js.id = id);
              frag.appendChild(js);
          };

      // Google+ button
      add('http://apis.google.com/js/plusone.js');
      // Facebook SDK
      add('//connect.facebook.net/uk_UA/all.js#xfbml=1', 'facebook-jssdk');
      // Twitter SDK
      add('//platform.twitter.com/widgets.js');
      fjs.parentNode.insertBefore(frag, fjs);
    }(document, 'script'));
  });
})(document);