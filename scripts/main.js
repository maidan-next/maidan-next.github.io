(function(document, undefined) {
  document.onreadystatechange = function() {
    if (document.readyState === "complete") {
      // Query data
      reqwest({
        'url': 'data.json',
        'type': 'json',
        'error': function() {
          console.error('Unable to get or parse data');
        },
        'success': function(data) {
          // Render data     
          var sectionsTemplate = document.getElementById('sections-template'),
              dataContainer = document.getElementById('data-container'),
              template = Hogan.compile(sectionsTemplate.innerHTML);

          dataContainer.innerHTML = template.render(data);
        }
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
        add('//connect.facebook.net/en_US/all.js#xfbml=1&appId=200103733347528', 'facebook-jssdk');
        // Twitter SDK
        add('//platform.twitter.com/widgets.js');
        fjs.parentNode.insertBefore(frag, fjs);
      }(document, 'script'));
    }
  }
})(document);