document.addEventListener('DOMContentLoaded', function() {
    // Toggle the sliding menu
    document.getElementById('menu-toggle').addEventListener('click', function() {
        var menu = document.getElementById('sliding-menu');
        var overlay = document.getElementById('overlay');
        if (menu.classList.contains('show-menu')) {
            menu.classList.remove('show-menu');
            overlay.style.display = 'none';
        } else {
            menu.classList.add('show-menu');
            overlay.style.display = 'block';
        }
    });

    // Hide the sliding menu when clicking the overlay
    document.getElementById('overlay').addEventListener('click', function() {
        var menu = document.getElementById('sliding-menu');
        var overlay = document.getElementById('overlay');
        menu.classList.remove('show-menu');
        overlay.style.display = 'none';
    });

    // Smooth scroll to sections
    document.querySelectorAll('#sliding-menu ul li a').forEach(function(menuItem) {
        menuItem.addEventListener('click', function(event) {
            event.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);
            var menu = document.getElementById('sliding-menu');
            var overlay = document.getElementById('overlay');
            menu.classList.remove('show-menu');
            overlay.style.display = 'none';

            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjust for fixed header
                behavior: 'smooth'
            });

            // Add selected class for LED edge lighting effect
            document.querySelectorAll('.glassmorphism').forEach(function(section) {
                section.classList.remove('selected');
            });
            if (targetSection) {
                targetSection.classList.add('selected');
            }
        });
    });

    // Parallax effect using Intersection Observer and requestAnimationFrame
    const parallaxElements = document.querySelectorAll('.parallax');

    const observerOptions = {
        root: null,
        threshold: 0,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parallaxElement = entry.target;
                const updateParallax = () => {
                    const scrollPosition = window.scrollY;
                    const offset = parallaxElement.offsetTop;
                    parallaxElement.style.backgroundPositionY = `${(scrollPosition - offset) * 0.5}px`;
                    requestAnimationFrame(updateParallax);
                };
                updateParallax();
            }
        });
    }, observerOptions);

    parallaxElements.forEach(parallaxElement => {
        observer.observe(parallaxElement);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view'); // Add the in-view class
                observer.unobserve(entry.target); // Stop observing after the animation
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    scrollElements.forEach(el => {
        observer.observe(el); // Observe each scroll-animate element
    });
});

document.getElementById("menu-button").addEventListener("click", function() {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.classList.toggle("open"); // Toggle the open class
});

// Optional: Close the menu when a link is clicked
const menuLinks = document.querySelectorAll('.menu ul li a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("menu-container").classList.remove("open"); // Close menu on link click
    });
});

window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    
    // Adjust speed for each parallax background
    const parallaxBg1 = document.querySelector('.parallax-bg-1');
    const parallaxBg2 = document.querySelector('.parallax-bg-2');

    // Set background position to create parallax effect
    parallaxBg1.style.transform = `translateY(${scrolled * 0.5}px)`; // Background moves slower
    parallaxBg2.style.transform = `translateY(${scrolled * 0.3}px)`; // Background moves slower than the first

    // Optionally, adjust the content speed (if desired)
    const parallaxContent = document.querySelectorAll('.parallax-content');
    parallaxContent.forEach(content => {
        content.style.transform = `translateY(${scrolled * 0.2}px)`; // Content moves faster
    });
});
// Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
});

// Scroll-triggered animations (reveal sections)
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 50) {
            section.classList.add('in-view');
        }
    });
});
// JavaScript to fetch local storage and recommend similar products
const userRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
const recommendedContainer = document.getElementById('personalized-cards');

// Example cards data
const allProducts = [
    { name: "GPK Series 1", img: "gpk1.jpg" },
    { name: "GPK Series 2", img: "gpk2.jpg" },
    // More products
];

// Dynamically display recently viewed items
userRecentlyViewed.forEach(product => {
    let productItem = `<div class="product-item">
                        <img src="${product.img}" alt="${product.name}">
                        <p>${product.name}</p>
                       </div>`;
    recommendedContainer.innerHTML += productItem;
});
// Use Three.js for 3D model viewing
import * as THREE from 'three';

// Set up basic 3D scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gpk-3d-viewer') });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 1, 1); // Placeholder 3D object
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
