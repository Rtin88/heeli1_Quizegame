        const messages = [
            "اوپس! مشکلی پیش آمد.",
            "خطای 404! صفحه پیدا نشد.",
            "اینجا چیزی نیست...",
            "به نظر گم شده‌اید!"
        ];
        
        const typingElement = document.getElementById('typing-text');
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let speed = 100;
        
        function typeWriter() {
            const currentMessage = messages[messageIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
                speed = 50;
            } else {
                typingElement.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
                speed = 100;
            }
            
            if (!isDeleting && charIndex === currentMessage.length) {
                isDeleting = true;
                speed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                speed = 500;
            }
            
            setTimeout(typeWriter, speed);
        }
        
        typeWriter();