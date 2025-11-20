// Sports Day Simulation - GUARANTEED WORKING VERSION

// Global variables
let scores = { red: 0, blue: 0, green: 0, yellow: 0 };
let isRunning = false;

// Utility function to display messages
function log(message) {
    console.log(message); // Always log to console
    const output = document.getElementById('output');
    if (output) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'event-message';
        messageDiv.textContent = message;
        output.appendChild(messageDiv);
        output.scrollTop = output.scrollHeight;
    }
}

// Main function - SIMPLE AND GUARANTEED TO WORK
function startSportsDay() {
    console.log("🎯 Button clicked! startSportsDay() called");
    
    if (isRunning) {
        log("⚠️ Sports Day is already running!");
        return;
    }
    
    isRunning = true;
    const button = document.getElementById('startBtn');
    button.disabled = true;
    button.textContent = 'Running...';
    
    // Reset and clear
    scores = { red: 0, blue: 0, green: 0, yellow: 0 };
    document.getElementById('output').innerHTML = '<div class="event-message">🎊 Starting Sports Day...</div>';
    
    log("✅ Sports Day Started Successfully!");
    
    // Start the callback chain
    OpeningCeremony(scores, Race100M);
}

// 1. Opening Ceremony
function OpeningCeremony(scores, next) {
    log("🎊 OPENING CEREMONY");
    
    let count = 0;
    const timer = setInterval(() => {
        count++;
        log(`Countdown: ${4 - count}...`);
        
        if (count === 3) {
            clearInterval(timer);
            log("Initial Scores: " + JSON.stringify(scores));
            log("---");
            next(scores, LongJump);
        }
    }, 1000);
}

// 2. Race 100M
function Race100M(scores, next) {
    log("🏃‍♂️ 100M RACE - Starting in 3 seconds");
    
    setTimeout(() => {
        // Generate random times
        const times = {
            red: (Math.random() * 5 + 10).toFixed(2),
            blue: (Math.random() * 5 + 10).toFixed(2),
            green: (Math.random() * 5 + 10).toFixed(2),
            yellow: (Math.random() * 5 + 10).toFixed(2)
        };
        
        log("Race Times: " + JSON.stringify(times));
        
        // Find winners
        const sorted = Object.entries(times).sort((a, b) => a[1] - b[1]);
        const first = sorted[0][0];
        const second = sorted[1][0];
        
        // Update scores
        const newScores = {...scores};
        newScores[first] += 50;
        newScores[second] += 25;
        
        log(`🥇 ${first} (+50), 🥈 ${second} (+25)`);
        log("Scores: " + JSON.stringify(newScores));
        log("---");
        
        next(newScores, HighJump);
    }, 3000);
}

// 3. Long Jump
function LongJump(scores, next) {
    log("🦘 LONG JUMP - Starting in 2 seconds");
    
    setTimeout(() => {
        const colors = ["red", "blue", "green", "yellow"];
        const winner = colors[Math.floor(Math.random() * colors.length)];
        
        const newScores = {...scores};
        newScores[winner] += 150;
        
        log(`🏆 Winner: ${winner} (+150)`);
        log("Scores: " + JSON.stringify(newScores));
        log("---");
        
        next(newScores, AwardCeremony);
    }, 2000);
}

// 4. High Jump
function HighJump(scores, next) {
    log("🦘 HIGH JUMP - Waiting for input...");
    
    setTimeout(() => {
        const answer = prompt("Enter winning color (red/blue/green/yellow):");
        let newScores = {...scores};
        
        if (answer && ["red", "blue", "green", "yellow"].includes(answer.toLowerCase())) {
            newScores[answer.toLowerCase()] += 100;
            log(`🏆 Winner: ${answer} (+100)`);
        } else {
            log("❌ Event cancelled - invalid input");
        }
        
        log("Scores: " + JSON.stringify(newScores));
        log("---");
        
        next(newScores);
    }, 100);
}

// 5. Award Ceremony
function AwardCeremony(finalScores) {
    log("🎖️ AWARD CEREMONY");
    log("Final: " + JSON.stringify(finalScores));
    
    const ranked = Object.entries(finalScores).sort((a, b) => b[1] - a[1]);
    
    log("🏆 FINAL STANDINGS:");
    ranked.forEach(([color, points], index) => {
        const medals = ["🥇", "🥈", "🥉", "  "];
        log(`${medals[index]} ${color}: ${points} points`);
    });
    
    log("🎉 COMPLETED!");
    
    // Reset button
    const button = document.getElementById('startBtn');
    button.disabled = false;
    button.textContent = 'START SPORTS DAY';
    isRunning = false;
}

// Debug: Check if script loads
console.log("✅ sports-day.js loaded successfully!");
console.log("✅ startSportsDay function available:", typeof startSportsDay);
