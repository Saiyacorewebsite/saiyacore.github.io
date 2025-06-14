// Basic Intersection Observer to fade elements in as they scroll into view
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:0.2});
document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));