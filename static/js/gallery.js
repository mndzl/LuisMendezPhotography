window.addEventListener('load', () => {
  const gallery = document.querySelector('.gallery');
  const allItems = document.querySelectorAll('.image');

  function resizeMasonryItem(item){
    const rowHeight = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(gallery).getPropertyValue('gap'));
    const itemHeight = item.querySelector('img').getBoundingClientRect().height;
    const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${rowSpan}`;
  }

  function resizeAllMasonryItems(){
    allItems.forEach(item => resizeMasonryItem(item));
  }

  resizeAllMasonryItems();

  window.addEventListener('resize', resizeAllMasonryItems);
});

// Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
const galleryImgs = document.querySelectorAll('.gallery img');

// Open lightbox on image click
galleryImgs.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) lightbox.style.display = 'none';
});