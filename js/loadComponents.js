const load = (id, url) => {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
};

// Load components for index.html
load('header-placeholder', '../components/header.html');
load('footer-placeholder', '../components/footer.html');

// Load components for projects.html
// (This will be handled in projects.html separately)