// smooth scroll feel on load
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

document.addEventListener("click", function(e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // toggle menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // close menu on click
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});


 (function() {
    const downloadBtn = document.getElementById('downloadCvBtn');
    
    downloadBtn.addEventListener('click', function() {
        try {
            const link = document.createElement('a');
            link.href = '/Images/resume.pdf';
            link.download = 'Hafsa_Faisal_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error) {
            alert('❌ Error downloading resume. Please try again.');
            console.error('Download error:', error);
        }
    });
})();


/* AJAX JavaScript */

document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('form-message');
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Hide any previous message
    messageDiv.style.display = 'none';
    
    try {
        const response = await fetch('https://formspree.io/f/xnjgwpbr', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            messageDiv.style.display = 'flex';
            messageDiv.className = 'alert success';
            messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I will get back to you soon.';
            form.reset();
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        } else {
            // Error
            const data = await response.json();
            throw new Error(data.error || 'Form submission failed');
        }
    } catch (error) {
        messageDiv.style.display = 'flex';
        messageDiv.className = 'alert error';
        messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';
    } finally {
    
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('form-message');
    const messageText = document.getElementById('message-text');
    const okBtn = document.getElementById('message-ok-btn');
    
    okBtn.addEventListener('click', function() {
        messageDiv.style.display = 'none';
    });
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const originalBtnText = submitBtn.innerHTML;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Hide any previous message
        messageDiv.style.display = 'none';
        
        try {
            const response = await fetch('https://formspree.io/f/xjvqkqrw', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                messageDiv.className = 'alert success';
                messageText.textContent = 'Your message has been sent successfully!';
                messageDiv.style.display = 'flex';
                
                this.reset();
                
                setTimeout(() => {
                    if (messageDiv.style.display === 'flex') {
                        messageDiv.style.display = 'none';
                    }
                }, 10000);
                
            } else {
            
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.className = 'alert error';
            messageText.textContent = 'Something went wrong. Please try again.';
            messageDiv.style.display = 'flex';
            
        
            setTimeout(() => {
                if (messageDiv.style.display === 'flex') {
                    messageDiv.style.display = 'none';
                }
            }, 10000);
        } finally {
            // Submit button restore
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
});

okBtn.addEventListener('click', function() {
    messageDiv.style.opacity = '1';
    messageDiv.style.transition = 'opacity 0.3s ease';
    messageDiv.style.opacity = '0';
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.style.opacity = '1';
    }, 300);
});


