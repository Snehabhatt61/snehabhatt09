const load = (id, url) => {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html

      // Fix relative links in loaded components
      const isInPagesFolder = window.location.pathname.includes('/pages/')
      const container = document.getElementById(id)

      if (isInPagesFolder) {
        // We're in pages folder, links should go up one level
        container.querySelectorAll('a').forEach(link => {
          const href = link.getAttribute('href')
          if (href && !href.startsWith('http') && !href.startsWith('../')) {
            // Prepend ../ to relative links that don't already have it
            if (href.startsWith('./')) {
              link.setAttribute('href', '../' + href.substring(2))
            }
          }
        })

        container.querySelectorAll('img').forEach(img => {
          const src = img.getAttribute('src')
          if (src && !src.startsWith('http') && !src.startsWith('../')) {
            if (src.startsWith('./')) {
              img.setAttribute('src', '../' + src.substring(2))
            }
          }
        })
      }
    })
    .catch(error => console.error(`Failed to load ${url}:`, error))
}

// Detect if we're in pages folder or root
const isInPagesFolder = window.location.pathname.includes('/pages/')
const basePath = isInPagesFolder ? '../' : './'

// Load components with correct relative paths
load('header-placeholder', basePath + 'components/header.html')
load('footer-placeholder', basePath + 'components/footer.html')
