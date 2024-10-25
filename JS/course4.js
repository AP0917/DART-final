const quizSection = document.getElementById('quiz-section');
const certificateBtn = document.getElementById('certificate-btn');
const goBackBtn = document.getElementById('go-back-btn');
const nameInputDiv = document.getElementById('name-input');
const quizModal = document.getElementById('quizModal');
const quizModal2 = document.getElementById('quizModal2');

let player;
let videoCompleted = false;
const progressMessage = document.getElementById('progress-message');

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the video player
    player = videojs('my-video', {
        controls: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2],
        userActions: { hotkeys: true },
        techOrder: ['youtube'],
        sources: [{
            type: 'video/youtube',
            src: 'https://www.youtube.com/watch?v=84D0OpGHK5Y'
        }]
    });

    // Add event listener for video end
    player.on('ended', function() {
        console.log('Video ended'); // Debug log
        videoCompleted = true;
        if (progressMessage) {
            progressMessage.style.display = 'none';
        }
        // Show quiz section
        const quizSection = document.getElementById('quiz-section');
        if (quizSection) {
            quizSection.style.display = 'block';
        }
        // Show back button
        const goBackBtn = document.getElementById('go-back-btn');
        if (goBackBtn) {
            goBackBtn.style.display = 'inline-block';
        }
        // Scroll to quiz
        quizSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Add timeupdate event listener
    player.on('timeupdate', function() {
        if (!videoCompleted && progressMessage) {
            const progress = (player.currentTime() / player.duration()) * 100;
            progressMessage.textContent = `Video Progress: ${Math.round(progress)}%`;
        }
    });

    checkDarkMode();
    addAccessibility();
    loadProgress();
    setInterval(saveProgress, 30000);
});

function loadProgress() {
    const savedProgress = localStorage.getItem('videoProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const lastUpdated = new Date(progress.lastUpdated);
        const now = new Date();
        const hoursSinceUpdate = (now - lastUpdated) / (1000 * 60 * 60);

        if (hoursSinceUpdate < 24 && player) {
            player.currentTime(progress.currentTime);
            videoCompleted = progress.completed;
        } else {
            localStorage.removeItem('videoProgress');
        }
    }
}

function saveProgress() {
    if (player) {
        const currentTime = player.currentTime();
        const progress = {
            currentTime: currentTime,
            completed: videoCompleted,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('videoProgress', JSON.stringify(progress));
    }
}

function handleVideoError() {
    console.error('Video error occurred');
}

function submitQuiz() {
    const answers = ['b', 'd', 'b', 'd', 'c', 'b', 'b', 'b', 'b', 'b'];
    let score = 0;
    let allQuestionsAnswered = true;

    // Check each question
    for (let i = 1; i <= 10; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selectedAnswer) {
            allQuestionsAnswered = false;
            break;
        }
        if (selectedAnswer.value === answers[i - 1]) {
            score++;
        }
    }

    // Verify all questions are answered
    if (!allQuestionsAnswered) {
        alert('Please answer all questions before submitting .');
        return;
    }

    // Calculate percentage and show appropriate modal
    const percentage = (score / 10) * 100;
    if (percentage >= 75) {
        openModal();
        certificateBtn.style.display = 'inline-block';
    } else {
        openModal2();
    }
}

function openModal() {
    quizModal.style.display = 'block';
}

function openModal2() {
    quizModal2.style.display = 'block';
}

function closeModal() {
    quizModal.style.display = 'none';
    quizModal2.style.display = 'none';
}

function checkDarkMode() {
    // Your dark mode logic here
}

function addAccessibility() {
    // Your accessibility logic here
}

function showNameInput() {
    nameInputDiv.style.display = 'block';
    certificateBtn.style.display = 'none';
}

function generateCertificate() {
    const userName = document.getElementById('user-name').value;
    if (!userName) {
        alert('Please enter your name');
        return;
    }

    // Create new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    // Load the certificate template
    const img = new Image();
    img.src = '/images/course4.png';
    
    img.onload = function() {
        // Add the certificate template as background
        doc.addImage(img, 'PNG', 0, 0, 297, 210); // A4 landscape dimensions

        // Add the name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(30);
        doc.setTextColor(0, 0, 0);
        doc.text(userName, 148.5, 105, { align: 'center' }); // Adjust coordinates as needed

        // Save the PDF
        doc.save('Disaster Management: Earthquake Certificate.pdf');

        // Hide name input after generating certificate
        nameInputDiv.style.display = 'none';

        // Mark this course as completed
        localStorage.setItem('course1Completed', 'true');

        // Show custom modal
        setTimeout(() => {
            showNextCourseModal();
        }, 2000);
    };
}

function showNextCourseModal() {
    const nextCourseModal = document.getElementById('nextCourseModal');
    const modalContent = nextCourseModal.querySelector('.modal-content');
    
    // Clear previous content
    modalContent.innerHTML = '';

    const completedCourses = getCompletedCourses();
    const nextCourse = getNextAvailableCourse(completedCourses);

    if (nextCourse) {
        modalContent.innerHTML = `
            <h2>Congratulations!</h2>
            <p>You have completed this course. Would you like to proceed to ${nextCourse}?</p>
            <button onclick="goToNextCourse('${nextCourse}')">Yes, proceed to ${nextCourse}</button>
            <button onclick="goHome()">No, go to home</button>
        `;
    } else {
        modalContent.innerHTML = `
            <h2>Congratulations!</h2>
            <p>You have completed all available courses!</p>
            <button onclick="goHome()">Go to home</button>
        `;
    }

    nextCourseModal.style.display = 'block';
}

function getCompletedCourses() {
    const completedCourses = [];
    if (localStorage.getItem('course1Completed') === 'true') completedCourses.push('Course 1');
    if (localStorage.getItem('course2Completed') === 'true') completedCourses.push('Course 2');
    if (localStorage.getItem('course3Completed') === 'true') completedCourses.push('Course 3');
    if (localStorage.getItem('course4Completed') === 'true') completedCourses.push('Course 4');
    return completedCourses;
}

function getNextAvailableCourse(completedCourses) {
    const allCourses = ['Course 1', 'Course 2', 'Course 3', 'Course 4'];
    return allCourses.find(course => !completedCourses.includes(course));
}

function goToNextCourse(course) {
    switch(course) {
        case 'Course 2':
            window.location.href = '/courses/course2.html';
            break;
        case 'Course 3':
            window.location.href = '/courses/course3.html';
            break;
        case 'Course 4':
            window.location.href = '/courses/course4.html';
            break;
    }
}

function goHome() {
    window.location.href = '/index.html';
}

function closeNextCourseModal() {
    document.getElementById('nextCourseModal').style.display = 'none';
}

function closeModal2() {
    quizModal2.style.display = 'none';
}

function goBack() {
    window.history.back();
}