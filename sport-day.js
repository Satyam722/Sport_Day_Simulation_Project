// Sports Day Simulation - Complete Implementation
// Global scores object
let scores = {
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0
};

let isEventRunning = false;

// Utility function to log messages to console and display
function log(message) {
    const output = document.getElementById('output');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'event-message';
    messageDiv.textContent = message;
    output.appendChild(messageDiv);
    output.scrollTop = output.scrollHeight;
    console.log(message);
}

// Main function to start the sports day
function startSportsDay() {
    if (isEventRunning) {
        log("⚠️ Sports Day is already running!");
        return;
    }
    
    isEventRunning = true;
    const startBtn = document.getElementById('startBtn');
    startBtn.disabled = true;
    startBtn.textContent = 'Event Running...';
    
    // Reset scores and clear console
    scores = { red: 0, blue: 0, green: 0, yellow: 0 };
    document.getElementById('output').innerHTML = '<div class="event-message">🎊 Starting Sports Day Simulation...</div>';
    
    log("========================================");
    log("🏆 SPORTS DAY SIMULATION INITIATED");
    log("========================================");
    
    // Start the callback chain
    OpeningCeremony(scores, Race100M);
}

// 1. OPENING CEREMONY FUNCTION
function OpeningCeremony(currentScores, nextCallback) {
    log("\n🎊 OPENING CEREMONY");
    log("Let the games begin!");
    
    let count = 0;
    const timer = setInterval(() => {
        count++;
        log(`Sports Day starting in ${4 - count}...`);
        
        if (count === 3) {
            clearInterval(timer);
            log("✅ Opening Ceremony Completed!");
            log("Initial Scores: " + JSON.stringify(currentScores));
            log("----------------------------------------");
            
            // Pass control to next event
            nextCallback(currentScores, LongJump);
        }
    }, 1000);
}

// 2. RACE 100M FUNCTION
function Race100M(currentScores, nextCallback) {
    log("\n🏃‍♂️ 100 METERS RACE");
    log("Race starting in 3 seconds...");
    
    setTimeout(() => {
        log("🔫 Starting Pistol Fired! Race begins!");
        
        // Generate random race times (10-15 seconds)
        const raceTimes = {};
        const colors = Object.keys(currentScores);
        
        colors.forEach(color => {
            raceTimes[color] = parseFloat((Math.random() * 5 + 10).toFixed(2));
        });
        
        log("Race Times: " + JSON.stringify(raceTimes));
        
        // Determine winners (sort by time - lower is better)
        const sortedResults = Object.entries(raceTimes)
            .sort(([,timeA], [,timeB]) => timeA - timeB);
        
        const firstPlace = sortedResults[0][0]; // Fastest
        const secondPlace = sortedResults[1][0]; // Second fastest
        
        // Update scores
        const updatedScores = {...currentScores};
        updatedScores[firstPlace] += 50;  // 1st place: 50 points
        updatedScores[secondPlace] += 25; // 2nd place: 25 points
        
        log("Previous Scores: " + JSON.stringify(currentScores));
        log("🏅 Race Results:");
        log(`🥇 1st Place: ${firstPlace} - ${raceTimes[firstPlace]}s (+50 points)`);
        log(`🥈 2nd Place: ${secondPlace} - ${raceTimes[secondPlace]}s (+25 points)`);
        log(`🥉 3rd Place: ${sortedResults[2][0]} - ${raceTimes[sortedResults[2][0]]}s`);
        log(`   4th Place: ${sortedResults[3][0]} - ${raceTimes[sortedResults[3][0]]}s`);
        log("Updated Scores: " + JSON.stringify(updatedScores));
        log("----------------------------------------");
        
        // Pass control to next event
        nextCallback(updatedScores, HighJump);
        
    }, 3000);
}

// 3. LONG JUMP FUNCTION
function LongJump(currentScores, nextCallback) {
    log("\n🦘 LONG JUMP COMPETITION");
    log("Event starting in 2 seconds...");
    
    setTimeout(() => {
        log("🌟 Long Jump Competition Started!");
        
        // Randomly select winner
        const colors = Object.keys(currentScores);
        const winningColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Update scores
        const updatedScores = {...currentScores};
        updatedScores[winningColor] += 150; // Long jump winner gets 150 points
        
        log("Previous Scores: " + JSON.stringify(currentScores));
        log("🏅 Long Jump Results:");
        log(`🏆 Winner: ${winningColor} (+150 points)`);
        log("Updated Scores: " + JSON.stringify(updatedScores));
        log("----------------------------------------");
        
        // Pass control to next event
        nextCallback(updatedScores, AwardCeremony);
        
    }, 2000);
}

// 4. HIGH JUMP FUNCTION
function HighJump(currentScores, nextCallback) {
    log("\n🦘 HIGH JUMP COMPETITION");
    log("Waiting for user input...");
    
    // Use setTimeout to allow console to update before prompt
    setTimeout(() => {
        const validColors = Object.keys(currentScores);
        const userInput = prompt(
            "🏅 HIGH JUMP: Which color secured the highest jump?\n\n" +
            "Enter one of the following colors:\n" +
            "• red\n• blue\n• green\n• yellow\n\n" +
            "Or click Cancel to skip this event."
        );
        
        let updatedScores = {...currentScores};
        
        if (userInput && validColors.includes(userInput.toLowerCase())) {
            const winner = userInput.toLowerCase();
            updatedScores[winner] += 100; // High jump winner gets 100 points
            
            log("Previous Scores: " + JSON.stringify(currentScores));
            log("🏅 High Jump Results:");
            log(`🏆 Winner: ${winner} (+100 points)`);
            log("Updated Scores: " + JSON.stringify(updatedScores));
        } else {
            if (userInput === null || userInput === "") {
                log("❌ High Jump cancelled - No input provided");
            } else {
                log(`❌ High Jump cancelled - Invalid color: "${userInput}"`);
                log(`💡 Valid colors are: ${validColors.join(", ")}`);
            }
            log("Scores unchanged: " + JSON.stringify(currentScores));
        }
        
        log("----------------------------------------");
        
        // Pass control to Award Ceremony
        nextCallback(updatedScores);
        
    }, 100);
}

// 5. AWARD CEREMONY FUNCTION
function AwardCeremony(finalScores) {
    log("\n🎖️ AWARD CEREMONY");
    log("Final Scores: " + JSON.stringify(finalScores));
    
    // Sort scores in descending order
    const rankings = Object.entries(finalScores)
        .sort(([,scoreA], [,scoreB]) => scoreB - scoreA);
    
    log("\n🏆 FINAL STANDINGS 🏆");
    log("========================");
    
    const medals = ["🥇", "🥈", "🥉", "  "];
    rankings.forEach(([color, score], index) => {
        log(`${medals[index]} ${index + 1}. ${color.toUpperCase()} - ${score} points`);
    });
    
    log("========================");
    log("\n🎉 CONGRATULATIONS TO ALL PARTICIPANTS!");
    log("🏅 Sports Day 2024 - Event Completed!");
    log("========================================");
    
    // Reset button state
    const startBtn = document.getElementById('startBtn');
    startBtn.disabled = false;
    startBtn.textContent = 'START SPORTS DAY';
    isEventRunning = false;
}

// Page load initialization
window.addEventListener('load', function() {
    log("✅ Sports Day Simulation Loaded Successfully");
    log("👉 Click 'START SPORTS DAY' to begin the event chain");
});
