(function(document, undefined) {
  document.onreadystatechange = function() {
    if (document.readyState === "complete") {
      var sectionsTemplate = document.getElementById('sections-template'),
          dataContainer = document.getElementById('data-container'),
          template = Hogan.compile(sectionsTemplate.innerHTML);

      dataContainer.innerHTML = template.render(data);
    }
  }
})(document);