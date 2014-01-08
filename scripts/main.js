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
    }
  }
})(document);