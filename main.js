import Cleave from './node_modules/cleave.js/dist/cleave-esm.js';
import './node_modules/cleave.js/dist/addons/cleave-phone.ru.js';


// development overlay
const devOverlay = document.createElement('div');
devOverlay.className = 'dev-overlay';
devOverlay.innerHTML = `
  <div class="dev-overlay-content">
    <p class="dev-overlay-text">website is under development</p>
    <button class="dev-overlay-button">ok, let me see</button>
  </div>
`;
document.body.appendChild(devOverlay);

document.querySelector('.dev-overlay-button').addEventListener('click', () => {
  devOverlay.classList.add('hidden');
  setTimeout(() => {
    devOverlay.remove();
  }, 300);
});


document.addEventListener('DOMContentLoaded', () => {

  /*
    HERO CAROUSEL WITH HORIZONTAL PARALLAX
  */
  // 0.5 also good
  const PARALLAX_FACTOR = .25;
  const heroViewport = document.querySelector('.hero-embla__viewport');
  const heroEmblaApi = EmblaCarousel(heroViewport, {
    loop: true,
    dragFree: false,
    containScroll: false,
    duration: 80,
  }, [EmblaCarouselAutoplay({ 
    delay: 8000,
    stopOnInteraction: false,
    stopOnMouseEnter: false
  })]);

  // horizontal parallax effect setup
  const heroSlides = heroEmblaApi.slideNodes();

  const setParallax = () => {
    const engine = heroEmblaApi.internalEngine();
    const scrollProgress = heroEmblaApi.scrollProgress();

    heroEmblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;

      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const translate = diffToTarget * (-1 / PARALLAX_FACTOR) * 100;
        const slide = heroSlides[slideIndex];
        const img = slide.querySelector('.hero-embla__slide__img');
        if (img) {
          img.style.transform = `translateX(${translate}%)`;
        }
      });
    });
  };

  heroEmblaApi.on('init', setParallax);
  heroEmblaApi.on('scroll', setParallax);
  heroEmblaApi.on('reInit', setParallax);

  // update slide info display
  const heroSlideTitle = document.querySelector('.hero-slide-title');
  const heroSlideDetails = document.querySelector('.hero-slide-details');

  const updateHeroSlideInfo = () => {
    const selectedIndex = heroEmblaApi.selectedScrollSnap();
    const selectedSlide = heroSlides[selectedIndex];
    
    const title = selectedSlide.dataset.title;
    const material = selectedSlide.dataset.material;
    const origin = selectedSlide.dataset.origin;
    const year = selectedSlide.dataset.year;

    heroSlideTitle.textContent = title;
    heroSlideDetails.innerHTML = `${material}<br>${origin}, ${year}`;
  };

  heroEmblaApi.on('init', updateHeroSlideInfo);
  heroEmblaApi.on('select', updateHeroSlideInfo);

  /*
    CATEGORIES
  */

  gsap.registerPlugin(ScrollTrigger);

  const columns = document.querySelectorAll('.parallax-column');

  columns.forEach((column, index) => {
    gsap.to(column, {
      y: -120 * ((index % 2) + 1), // vary the movement: -80, -160, -80, -160, etc.
      ease: "none",
      scrollTrigger: {
        trigger: "#about-brand",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  /*
    QUALITY ITEMS PARALLAX
  */

  if (window.innerWidth > 768) {
    const qualityItems = document.querySelectorAll('.quality-item');

    qualityItems.forEach((item, index) => {
      let yValue = 0;
      if (index === 1) { // middle item
        yValue = 100;
      }
      gsap.to(item, {
        y: yValue,
        ease: "none",
        scrollTrigger: {
          trigger: "#exclusive-qualities",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }

  /*
    ANIMATED TEXT PARALLAX
  */

  const animatedTexts = document.querySelectorAll('.animated-text');

  animatedTexts.forEach(text => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: "top 100%",
        end: "top 0%",
        scrub: true,
      },
      y: 100,
      opacity: 0.5,
      duration: 2,
      ease: "power1.out",
    });
  });

  /*
    COUNTER PARALLAX
   */

const counterParallax = document.querySelectorAll('.counter-parallax');

  counterParallax.forEach(text => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: "top 100%",
        end: "top 0%",
        scrub: true,
      },
      y: 50,
      opacity: 0.75,
      duration: 2,
      ease: "power1.out",
    });
  });

  /*
      COLLECTION
  */

  const galleries = document.querySelectorAll('.collection-category-gallery');

  galleries.forEach((gallery) => {
    // Initialize Embla Carousel on each gallery
    EmblaCarousel(gallery, {
      align: 'start',    // snap to start of each item
      dragFree: false,   // enable snapping
      containScroll: 'trimSnaps', // prevent overscroll
    });
  });

  /*
    CTA
  */

  let cleave = new Cleave('#telephone', {
    phone: true,
    phoneRegionCode: 'RU'
  });

  const telephone = document.getElementById('telephone');
  const dropdown = document.getElementById('form-dropdown');

  telephone.addEventListener('input', () => {
    if (cleave.getRawValue().length >= 10) {
      dropdown.classList.add('expanded');
    }
  });

  /*
    PRODUCT TOOLTIPS
  */

  const tooltip = document.createElement('div');
  tooltip.className = 'product-tooltip';
  document.body.appendChild(tooltip);

  const productImages = document.querySelectorAll('.product-image');

  productImages.forEach(image => {
    image.addEventListener('mouseenter', (e) => {
      const title = image.dataset.title;
      const material = image.dataset.material;
      const origin = image.dataset.origin;
      const year = image.dataset.year;
      tooltip.innerHTML = `${title}<br>${material}<br>${origin}, ${year}`;
      tooltip.classList.add('show');
      updateTooltipPosition(e);
    });

    image.addEventListener('mousemove', updateTooltipPosition);

    image.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
    });
  });

  function updateTooltipPosition(e) {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  }

  /*
    GALLERY VIEW WITH SCALE EFFECT
  */

  const TWEEN_FACTOR_BASE = 0.52;
  let galleryEmblaApi = null;
  let galleryInitialized = false;
  let tweenFactor = 0;
  let tweenNodes = [];

  const numberWithinRange = (number, min, max) => 
    Math.min(Math.max(number, min), max);

  // collect all product images data
  const galleryData = Array.from(productImages).map(image => ({
    src: image.dataset.src,
    title: image.dataset.title,
    material: image.dataset.material,
    origin: image.dataset.origin,
    year: image.dataset.year
  }));

  // initialize gallery carousel with scale effect
  function initGallery() {
    if (galleryInitialized) return;

    const galleryContainer = document.getElementById('gallery-container');
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryViewport = document.getElementById('gallery-viewport');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const titleEl = document.querySelector('.gallery-item-title');
    const descriptionEl = document.querySelector('.gallery-item-description');

    // generate slides
    galleryData.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.className = 'embla__slide';
      slide.innerHTML = `
        <div class="embla__slide__inner">
          <img src="${item.src}" alt="${item.title}" class="embla__slide__img">
        </div>
      `;
      galleryContainer.appendChild(slide);
    });

    // initialize embla
    galleryEmblaApi = EmblaCarousel(galleryViewport, {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps'
    });

    // setup scale tween
    const setTweenNodes = (emblaApi) => {
      tweenNodes = emblaApi.slideNodes().map((slideNode) => slideNode);
    };

    const setTweenFactor = (emblaApi) => {
      tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    };

    const tweenScale = (emblaApi, eventName) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === 'scroll';

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    };

    const updateDescription = () => {
      const index = galleryEmblaApi.selectedScrollSnap();
      const item = galleryData[index];
      titleEl.textContent = item.title;
      descriptionEl.innerHTML = `${item.material}<br>${item.origin}, ${item.year}`;
    };

    setTweenNodes(galleryEmblaApi);
    setTweenFactor(galleryEmblaApi);
    tweenScale(galleryEmblaApi);
    updateDescription();

    galleryEmblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
      .on('select', updateDescription);

    // navigation buttons
    prevBtn.addEventListener('click', () => galleryEmblaApi.scrollPrev());
    nextBtn.addEventListener('click', () => galleryEmblaApi.scrollNext());

    // close on overlay or container click (not on carousel elements)
    galleryOverlay.addEventListener('click', (e) => {
      // close if clicking on the overlay itself or the gallery-container
      if (e.target === galleryOverlay || e.target.classList.contains('gallery-container')) {
        closeGallery();
      }
    });

    // close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && galleryOverlay.classList.contains('active')) {
        closeGallery();
      }
    });

    // close gallery on request link click
    const requestLink = document.querySelector('.gallery-request-link');
    requestLink.addEventListener('click', () => {
      closeGallery();
    });

    galleryInitialized = true;
  }

  function openGallery(startIndex) {
    if (!galleryInitialized) {
      initGallery();
    }

    const galleryOverlay = document.getElementById('gallery-overlay');
    galleryOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // trigger reflow to ensure transition works
    galleryOverlay.offsetHeight;
    
    // add active class to start transition
    requestAnimationFrame(() => {
      galleryOverlay.classList.add('active');
    });

    // scroll to the clicked image
    galleryEmblaApi.scrollTo(startIndex);
  }

  function closeGallery() {
    const galleryOverlay = document.getElementById('gallery-overlay');
    galleryOverlay.classList.remove('active');
    
    // delay hiding display to allow fade-out animation
    setTimeout(() => {
      if (!galleryOverlay.classList.contains('active')) {
        galleryOverlay.style.display = 'none';
      }
    }, 500);
    
    document.body.style.overflow = '';
  }

  // add click handlers to product images
  productImages.forEach((image, index) => {
    image.addEventListener('click', () => {
      openGallery(index);
    });
  });
  
  /*
    LAZY LOADING
  */

  const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const src = element.getAttribute('data-src');

        if (element.tagName === 'IMG') {
          element.setAttribute('src', src);
        } else {
          element.style.backgroundImage = `url('${src}')`;
        }
        
        element.removeAttribute('data-src');
        observer.unobserve(element);
      }
    });
  }, {
    rootMargin: '0px 0px 200px 0px' // start loading when 200px away from viewport
  });

  document.querySelectorAll('[data-src]').forEach(element => {
    lazyLoadObserver.observe(element);
  });

});