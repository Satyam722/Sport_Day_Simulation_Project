let isRunning = false;

function updateStatus(message, type = 'success') {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
}

function clearConsole() {
    document.getElementById('consoleOutput').innerHTML = 
        '<div>▶️ Console cleared. Ready for new simulation!</div>';
}

function addToConsole(message) {
    const consoleOutput = document.getElementById('consoleOutput');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    consoleOutput.appendChild(messageDiv);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    
    // Also log to browser console
    console.log(message);
}

function startSportsDay() {
    if (isRunning) {
        updateStatus('⚠️ Sports Day is already running!', 'error');
        return;
    }
    
    const startBtn = document.getElementById('startBtn');
    startBtn.disabled = true;
    startBtn.textContent = 'Running...';
    isRunning = true;
    
    updateStatus('🎊 Sports Day Started! Check the console below.');
    
    // Clear previous output but keep first message
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.innerHTML = '<div>▶️ Sports Day Simulation Started...</div>';
    
    // Your Sports Day Simulation Code
    let scores = { red: 0, blue: 0, green: 0, yellow: 0 };

    function OpeningCeremony(nextEvent) {
        addToConsole("🎊 Opening Ceremony Started!");
        
        let count = 0;
        const timer = setInterval(() => {
            count++;
            addToConsole(`Sports Day Countdown: ${4 - count}...`);
            
            if (count === 3) {
                clearInterval(timer);
                addToConsole("🎯 Initial Scores: " + JSON.stringify(scores));
                addToConsole("----------------------------------------");
                nextEvent(scores, Race100M);
            }
        }, 1000);
    }

    function Race100M(currentScores, nextEvent) {
        addToConsole("🏃‍♂️ 100M Race begins in 3 seconds...");
        
        setTimeout(() => {
            const raceTimes = {};
            Object.keys(currentScores).forEach(color => {
                raceTimes[color] = (Math.random() * 5 + 10).toFixed(2);
            });
            
            addToConsole("⏱️ Race Times: " + JSON.stringify(raceTimes));
            
            const sorted = Object.entries(raceTimes)
                .sort(([,a], [,b]) => a - b)
                .map(([color]) => color);
            
            const updatedScores = {...currentScores};
            updatedScores[sorted[0]] += 50;
            updatedScores[sorted[1]] += 25;
            
            addToConsole("📊 Race Results:");
            addToConsole(`🥇 ${sorted[0]} - ${raceTimes[sorted[0]]}s (+50 points)`);
            addToConsole(`🥈 ${sorted[1]} - ${raceTimes[sorted[1]]}s (+25 points)`);
            addToConsole("📈 Updated Scores: " + JSON.stringify(updatedScores));
            addToConsole("----------------------------------------");
            
            nextEvent(updatedScores, LongJump);
        }, 3000);
    }

    function LongJump(currentScores, nextEvent) {
        addToConsole("🦘 Long Jump begins in 2 seconds...");
        
        setTimeout(() => {
            const colors = Object.keys(currentScores);
            const winner = colors[Math.floor(Math.random() * colors.length)];
            
            const updatedScores = {...currentScores};
            updatedScores[winner] += 150;
            
            addToConsole("🌟 Long Jump Results:");
            addToConsole(`🏆 Winner: ${winner} (+150 points)`);
            addToConsole("📈 Updated Scores: " + JSON.stringify(updatedScores));
            addToConsole("----------------------------------------");
            
            nextEvent(updatedScores, HighJump);
        }, 2000);
    }

    function HighJump(currentScores, nextEvent) {
        addToConsole("🦘 High Jump Event - Please check for a prompt!");
        
        const validColors = Object.keys(currentScores);
        
        // Use setTimeout to allow console to update before prompt
        setTimeout(() => {
            const userChoice = prompt(`🏅 Which color won the High Jump?\nEnter one of: ${validColors.join(", ")}`);
            
            let updatedScores = {...currentScores};
            
            if (userChoice && validColors.includes(userChoice.toLowerCase())) {
                const winner = userChoice.toLowerCase();
                updatedScores[winner] += 100;
                
                addToConsole("🌟 High Jump Results:");
                addToConsole(`🏆 Winner: ${winner} (+100 points)`);
                addToConsole("📈 Updated Scores: " + JSON.stringify(updatedScores));
            } else {
                addToConsole("❌ High Jump cancelled - invalid or no input provided");
                addToConsole("📈 Scores unchanged: " + JSON.stringify(currentScores));
            }
            
            addToConsole("----------------------------------------");
            nextEvent(updatedScores, AwardCeremony);
        }, 100);
    }

    function AwardCeremony(finalScores) {
        addToConsole("🎖️  AWARD CEREMONY  🎖️");
        addToConsole("Final Scores: " + JSON.stringify(finalScores));
        
        const rankings = Object.entries(finalScores)
            .sort(([,a], [,b]) => b - a);
        
        addToConsole("\n🏆 FINAL STANDINGS 🏆");
        const medals = ["🥇", "🥈", "🥉", "  "];
        rankings.forEach(([color, score], index) => {
            addToConsole(`${medals[index]} ${index + 1}. ${color.toUpperCase()} - ${score} points`);
        });
        
        addToConsole("\n🎉 Congratulations to all participants! 🎉");
        
        // Re-enable button
        const startBtn = document.getElementById('startBtn');
        startBtn.disabled = false;
        startBtn.textContent = 'Start Sports Day';
        isRunning = false;
        updateStatus('✅ Sports Day completed successfully!');
    }

    // Start the event chain
    OpeningCeremony(Race100M);
}
