;(function(document, undefined) {
  var DATA_URL = 'data.json';

  $(function() {
    // Query data
    $.getJSON(DATA_URL)
      .done(function(data) {
        // Render data     
        var $sectionsTemplate = $('#sections-template'),
            $dataContainer = $('#data-container'),
            template = Hogan.compile($sectionsTemplate.html());

        $dataContainer.html(template.render(data));
      })
      .error(function() {
        console.error('Unable to get or parse data');
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