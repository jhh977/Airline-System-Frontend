document.querySelector('.img__btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
});

document.addEventListener('DOMContentLoaded', function() {
    const img = document.querySelector('.airplane-image img');
    
    document.querySelector('.airplane-image').addEventListener('mousemove', function(e) {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate the movement range
    const moveX = (x / rect.width - 0.5) * 50; // 10px max movement
    const moveY = (y / rect.height - 0.5) * 50; // 10px max movement
    
    img.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    document.querySelector('.airplane-image').addEventListener('mouseleave', function() {
    img.style.transform = 'translate(0, 0)'; // Reset the image position
    });
}