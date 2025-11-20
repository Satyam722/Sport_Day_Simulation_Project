// Sports Day Event Simulation
function startSportsDay() {
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.innerHTML = '<div>🎊 Starting Sports Day... 🎊</div>';
    
    // Override console.log to display in the div
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        originalConsoleLog.apply(console, args);
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : arg
        ).join(' ');
        consoleOutput.innerHTML += `<div>${message}</div>`;
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    };

    // Your Sports Day code here
    let scores = { red: 0, blue: 0, green: 0, yellow: 0 };

    function OpeningCeremony(nextEvent) {
        console.log("🎊 Opening Ceremony Started! 🎊");
        
        let count = 0;
        const timer = setInterval(() => {
            count++;
            console.log(`Sports Day Countdown: ${4 - count}...`);
            
            if (count === 3) {
                clearInterval(timer);
                console.log("🎯 Initial Scores:", scores);
                console.log("----------------------------------------");
                nextEvent(scores, Race100M);
            }
        }, 1000);
    }

    function Race100M(currentScores, nextEvent) {
        console.log("🏃‍♂️ 100M Race begins in 3 seconds...");
        
        setTimeout(() => {
            const raceTimes = {};
            Object.keys(currentScores).forEach(color => {
                raceTimes[color] = (Math.random() * 5 + 10).toFixed(2);
            });
            
            console.log("⏱️ Race Times:", raceTimes);
            
            const sorted = Object.entries(raceTimes)
                .sort(([,a], [,b]) => a - b)
                .map(([color]) => color);
            
            const updatedScores = {...currentScores};
            updatedScores[sorted[0]] += 50;
            updatedScores[sorted[1]] += 25;
            
            console.log("📊 Race Results:");
            console.log(`🥇 ${sorted[0]} - ${raceTimes[sorted[0]]}s (+50 points)`);
            console.log(`🥈 ${sorted[1]} - ${raceTimes[sorted[1]]}s (+25 points)`);
            console.log("📈 Updated Scores:", updatedScores);
            console.log("----------------------------------------");
            
            nextEvent(updatedScores, LongJump);
        }, 3000);
    }

    function LongJump(currentScores, nextEvent) {
        console.log("🦘 Long Jump begins in 2 seconds...");
        
        setTimeout(() => {
            const colors = Object.keys(currentScores);
            const winner = colors[Math.floor(Math.random() * colors.length)];
            
            const updatedScores = {...currentScores};
            updatedScores[winner] += 150;
            
            console.log("🌟 Long Jump Results:");
            console.log(`🏆 Winner: ${winner} (+150 points)`);
            console.log("📈 Updated Scores:", updatedScores);
            console.log("----------------------------------------");
            
            nextEvent(updatedScores, HighJump);
        }, 2000);
    }

    function HighJump(currentScores, nextEvent) {
        console.log("🦘 High Jump Event");
        
        const validColors = Object.keys(currentScores);
        const userChoice = prompt(`Enter the winning color: ${validColors.join(", ")}`);
        
        if (userChoice && validColors.includes(userChoice.toLowerCase())) {
            const winner = userChoice.toLowerCase();
            const updatedScores = {...currentScores};
            updatedScores[winner] += 100;
            
            console.log("🌟 High Jump Results:");
            console.log(`🏆 Winner: ${winner} (+100 points)`);
            console.log("📈 Updated Scores:", updatedScores);
        } else {
            console.log("❌ Event was cancelled - invalid input");
        }
        
        console.log("----------------------------------------");
        nextEvent(updatedScores || currentScores, AwardCeremony);
    }

    function AwardCeremony(finalScores) {
        console.log("🎖️  AWARD CEREMONY  🎖️");
        console.log("Final Scores:", finalScores);
        
        const rankings = Object.entries(finalScores)
            .sort(([,a], [,b]) => b - a);
        
        console.log("\n🏆 FINAL STANDINGS 🏆");
        const medals = ["🥇", "🥈", "🥉", "  "];
        rankings.forEach(([color, score], index) => {
            console.log(`${medals[index]} ${index + 1}. ${color.toUpperCase()} - ${score} points`);
        });
        
        console.log("\n🎉 Congratulations to all participants! 🎉");
    }

    // Start the event
    OpeningCeremony(Race100M);
}
