;(function(document, undefined) {
  var DATA_URL = 'data.json';

  $(function() {
    var $dataContainer = $('#data-container'),
        $body = $('body');

    // Query data
    $.getJSON(DATA_URL)
      
      .done(function(data) {

        // Augment with favicons data
        for (var i=0, n=data['sections'].length; i<n; ++i) {
          for (var j=0, m=data['sections'][i]['items'].length; j<m; ++j) {
            var current = data['sections'][i]['items'][j],
                url = current['link'],
                image = current['image'];

            if (url && !image) {
              var a = $('<a>', {'href': url})[0];
              current['favicon'] = a.protocol + '//' + a.hostname + '/favicon.ico';
            }
          }
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
    $dataContainer

      .on('click', '.sidebar-link', function(e) {
        e.preventDefault();
        var targetHash = $(e.currentTarget).attr('href'),
            target = $(targetHash);
        $('html,body').animate({
            'scrollTop': target.offset().top
        }, 1000);
        window.location.hash = targetHash;
        return false;
      })

      .on('rendered', function() {
        $body.scrollspy({
            'target': '.sidebar-wrapper'
          })
          // .scrollspy('refresh');

        console.log($('header#masthead').outerHeight());

        $('.nav-sidebar').affix({
            'offset': {
              'top' : $('header#masthead').outerHeight()
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