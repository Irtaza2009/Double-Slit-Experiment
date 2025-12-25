// Wave Interference Simulation
let simulation;
let canvasSize;

function setup() {
    // Create canvas
    canvasSize = min(windowHeight - 40, 700);
    const canvas = createCanvas(canvasSize * 1.5, canvasSize);
    canvas.parent('canvas-container');
    
    // Initialize simulation
    simulation = new WaveInterferenceSimulation();
    simulation.setupControls();
    
    // Set frame rate for smooth animation
    frameRate(60);
}

function draw() {
    // Clear with dark background
    background(15, 15, 26);
    
    // Update and display simulation
    simulation.update();
    simulation.display();
}

function windowResized() {
    canvasSize = min(windowHeight - 40, 700);
    resizeCanvas(canvasSize * 1.5, canvasSize);
}

class WaveInterferenceSimulation {
    constructor() {
        // Wave properties
        this.wavelength = 40;
        this.amplitude = 50;
        this.frequency = 1.0;
        this.time = 0;
        
        // Source properties
        this.source1 = {
            enabled: true,
            x: 150,
            y: 100,
            phase: 0,
            color: [220, 100, 100]  // Red
        };
        
        this.source2 = {
            enabled: true,
            x: 150,
            y: 100,
            phase: 90,
            color: [100, 150, 220]  // Blue
        };
        
        // Display options
        this.showIndividualWaves = true;
        this.showResultant = true;
        this.showInterferencePattern = true;
        
        // Canvas properties
        this.waveStartY = 150;
        this.waveEndY = height - 50;
        this.interferenceScreenY = height - 150;
    }
    
    setupControls() {
        // Source 1 controls
        const source1Enabled = document.getElementById('source1Enabled');
        source1Enabled.addEventListener('change', (e) => {
            this.source1.enabled = e.target.checked;
        });
        
        const source1X = document.getElementById('source1X');
        const source1XValue = document.getElementById('source1XValue');
        source1X.addEventListener('input', (e) => {
            this.source1.x = parseInt(e.target.value);
            source1XValue.textContent = this.source1.x;
        });
        
        const source1Phase = document.getElementById('source1Phase');
        const source1PhaseValue = document.getElementById('source1PhaseValue');
        source1Phase.addEventListener('input', (e) => {
            this.source1.phase = parseInt(e.target.value);
            source1PhaseValue.textContent = this.source1.phase + '°';
        });
        
        // Source 2 controls
        const source2Enabled = document.getElementById('source2Enabled');
        source2Enabled.addEventListener('change', (e) => {
            this.source2.enabled = e.target.checked;
        });
        
        const source2X = document.getElementById('source2X');
        const source2XValue = document.getElementById('source2XValue');
        source2X.addEventListener('input', (e) => {
            this.source2.x = parseInt(e.target.value);
            source2XValue.textContent = this.source2.x;
        });
        
        const source2Phase = document.getElementById('source2Phase');
        const source2PhaseValue = document.getElementById('source2PhaseValue');
        source2Phase.addEventListener('input', (e) => {
            this.source2.phase = parseInt(e.target.value);
            source2PhaseValue.textContent = this.source2.phase + '°';
        });
        
        // Wave property controls
        const wavelength = document.getElementById('wavelength');
        const wavelengthValue = document.getElementById('wavelengthValue');
        wavelength.addEventListener('input', (e) => {
            this.wavelength = parseInt(e.target.value);
            wavelengthValue.textContent = this.wavelength;
        });
        
        const amplitude = document.getElementById('amplitude');
        const amplitudeValue = document.getElementById('amplitudeValue');
        amplitude.addEventListener('input', (e) => {
            this.amplitude = parseInt(e.target.value);
            amplitudeValue.textContent = this.amplitude;
        });
        
        const frequency = document.getElementById('frequency');
        const frequencyValue = document.getElementById('frequencyValue');
        frequency.addEventListener('input', (e) => {
            this.frequency = parseFloat(e.target.value);
            frequencyValue.textContent = this.frequency.toFixed(1) + ' Hz';
        });
        
        // Display controls
        const showIndividualWaves = document.getElementById('showIndividualWaves');
        showIndividualWaves.addEventListener('change', (e) => {
            this.showIndividualWaves = e.target.checked;
        });
        
        const showResultant = document.getElementById('showResultant');
        showResultant.addEventListener('change', (e) => {
            this.showResultant = e.target.checked;
        });
        
        const showInterferencePattern = document.getElementById('showInterferencePattern');
        showInterferencePattern.addEventListener('change', (e) => {
            this.showInterferencePattern = e.target.checked;
        });
        
        // Buttons
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', () => {
            this.resetToDefault();
        });
        
        const randomizeBtn = document.getElementById('randomizeBtn');
        randomizeBtn.addEventListener('click', () => {
            this.randomize();
        });
    }
    
    resetToDefault() {
        this.wavelength = 40;
        this.amplitude = 50;
        this.frequency = 1.0;
        this.time = 0;
        
        this.source1.enabled = true;
        this.source1.x = 150;
        this.source1.phase = 0;
        
        this.source2.enabled = true;
        this.source2.x = 150;
        this.source2.phase = 180;
        
        this.showIndividualWaves = true;
        this.showResultant = true;
        this.showInterferencePattern = false;
        
        // Update UI controls
        document.getElementById('wavelength').value = this.wavelength;
        document.getElementById('wavelengthValue').textContent = this.wavelength;
        document.getElementById('amplitude').value = this.amplitude;
        document.getElementById('amplitudeValue').textContent = this.amplitude;
        document.getElementById('frequency').value = this.frequency;
        document.getElementById('frequencyValue').textContent = this.frequency.toFixed(1) + ' Hz';
        
        document.getElementById('source1X').value = this.source1.x;
        document.getElementById('source1XValue').textContent = this.source1.x;
        document.getElementById('source1Phase').value = this.source1.phase;
        document.getElementById('source1PhaseValue').textContent = this.source1.phase + '°';
        
        document.getElementById('source2X').value = this.source2.x;
        document.getElementById('source2XValue').textContent = this.source2.x;
        document.getElementById('source2Phase').value = this.source2.phase;
        document.getElementById('source2PhaseValue').textContent = this.source2.phase + '°';
        
        document.getElementById('source1Enabled').checked = this.source1.enabled;
        document.getElementById('source2Enabled').checked = this.source2.enabled;
        document.getElementById('showIndividualWaves').checked = this.showIndividualWaves;
        document.getElementById('showResultant').checked = this.showResultant;
        document.getElementById('showInterferencePattern').checked = this.showInterferencePattern;
    }
    
    randomize() {
        this.wavelength = floor(random(15, 80));
        this.amplitude = floor(random(30, 80));
        this.frequency = random(0.5, 2.5);
        
        this.source1.x = floor(random(50, 250));
        this.source1.phase = floor(random(0, 360));
        
        this.source2.x = floor(random(50, 250));
        this.source2.phase = floor(random(0, 360));
        
        // Update UI controls
        document.getElementById('wavelength').value = this.wavelength;
        document.getElementById('wavelengthValue').textContent = this.wavelength;
        document.getElementById('amplitude').value = this.amplitude;
        document.getElementById('amplitudeValue').textContent = this.amplitude;
        document.getElementById('frequency').value = this.frequency;
        document.getElementById('frequencyValue').textContent = this.frequency.toFixed(1) + ' Hz';
        
        document.getElementById('source1X').value = this.source1.x;
        document.getElementById('source1XValue').textContent = this.source1.x;
        document.getElementById('source1Phase').value = this.source1.phase;
        document.getElementById('source1PhaseValue').textContent = this.source1.phase + '°';
        
        document.getElementById('source2X').value = this.source2.x;
        document.getElementById('source2XValue').textContent = this.source2.x;
        document.getElementById('source2Phase').value = this.source2.phase;
        document.getElementById('source2PhaseValue').textContent = this.source2.phase + '°';
    }
    
    update() {
        // Update time for wave animation
        this.time += deltaTime / 1000 * this.frequency;
        
        // Update source positions based on canvas size
        this.source1.y = 100;
        this.source2.y = 100;
        this.waveStartY = 150;
        this.waveEndY = height - 50;
        this.interferenceScreenY = height - 150;
    }
    
    display() {
        // Draw title
        this.drawTitle();
        
        // Draw sources
        this.drawSources();
        
        // Draw waves
        this.drawWaves();
        
        // Draw interference pattern on screen if enabled
        if (this.showInterferencePattern) {
            this.drawInterferencePattern();
        }
        
        // Draw interference screen
        this.drawInterferenceScreen();
        
        // Draw physics information
        this.drawPhysicsInfo();
    }
    
    drawTitle() {
        fill(255, 255, 255, 200);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(20);
        text("Wave Interference Simulation", width/2, 30);
        
        textSize(14);
        fill(255, 255, 255, 150);
        text("Electromagnetic Wave Superposition", width/2, 55);
    }
    
    drawSources() {
        // Draw source 1
        if (this.source1.enabled) {
            fill(this.source1.color[0], this.source1.color[1], this.source1.color[2]);
            noStroke();
            ellipse(this.source1.x, this.source1.y, 30, 30);
            
            // Draw phase indicator
            this.drawPhaseIndicator(this.source1.x, this.source1.y, this.source1.phase, this.source1.color);
        }
        
        // Draw source 2
        if (this.source2.enabled) {
            fill(this.source2.color[0], this.source2.color[1], this.source2.color[2]);
            noStroke();
            ellipse(this.source2.x, this.source2.y, 30, 30);
            
            // Draw phase indicator
            this.drawPhaseIndicator(this.source2.x, this.source2.y, this.source2.phase, this.source2.color);
        }
        
        // Draw source labels
        fill(255, 255, 255, 200);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        
        if (this.source1.enabled) {
            text("Source 1", this.source1.x, this.source1.y + 30);
            text(`Phase: ${this.source1.phase}°`, this.source1.x, this.source1.y + 45);
        }
        
        if (this.source2.enabled) {
            text("Source 2", this.source2.x, this.source2.y + 30);
            text(`Phase: ${this.source2.phase}°`, this.source2.x, this.source2.y + 45);
        }
    }
    
    drawPhaseIndicator(x, y, phase, color) {
        push();
        translate(x, y);
        rotate(radians(phase));
        
        stroke(color[0], color[1], color[2], 200);
        strokeWeight(2);
        line(0, 0, 0, -20);
        
        noStroke();
        fill(color[0], color[1], color[2]);
        triangle(0, -25, -5, -15, 5, -15);
        
        pop();
    }
    
    drawWaves() {
        // Calculate wave number
        const k = (2 * PI) / this.wavelength;
        
        // Draw individual waves if enabled
        if (this.showIndividualWaves) {
            if (this.source1.enabled) {
                this.drawWave(this.source1, k, false);
            }
            if (this.source2.enabled) {
                this.drawWave(this.source2, k, false);
            }
        }
        
        // Draw resultant wave if enabled and both sources are active
        if (this.showResultant && (this.source1.enabled || this.source2.enabled)) {
            this.drawResultantWave(k);
        }
    }
    
    drawWave(source, k, isResultant = false) {
        const waveColor = isResultant ? [120, 220, 120] : source.color;
        const waveAlpha = isResultant ? 255 : 150;
        
        stroke(waveColor[0], waveColor[1], waveColor[2], waveAlpha);
        strokeWeight(isResultant ? 3 : 2);
        noFill();
        
        beginShape();
        for (let x = 0; x <= width; x += 2) {
            // Calculate distance from source
            const distance = dist(x, this.waveStartY, source.x, source.y);
            
            // Calculate wave value
            const waveValue = this.amplitude * sin(k * distance - this.time * 2 * PI + radians(source.phase));
            
            // Draw wave
            const y = this.waveStartY + waveValue * (1 - (x / width) * 0.3);
            vertex(x, y);
        }
        endShape();
    }
    
    drawResultantWave(k) {
        stroke(120, 220, 120, 255);
        strokeWeight(3);
        noFill();
        
        beginShape();
        for (let x = 0; x <= width; x += 2) {
            let resultant = 0;
            
            // Add contribution from source 1
            if (this.source1.enabled) {
                const dist1 = dist(x, this.waveStartY, this.source1.x, this.source1.y);
                resultant += this.amplitude * sin(k * dist1 - this.time * 2 * PI + radians(this.source1.phase));
            }
            
            // Add contribution from source 2
            if (this.source2.enabled) {
                const dist2 = dist(x, this.waveStartY, this.source2.x, this.source2.y);
                resultant += this.amplitude * sin(k * dist2 - this.time * 2 * PI + radians(this.source2.phase));
            }
            
            // Scale resultant if both sources are active
            if (this.source1.enabled && this.source2.enabled) {
                resultant *= 0.5; // Average the amplitude
            }
            
            // Draw resultant wave
            const y = this.waveStartY + resultant * (1 - (x / width) * 0.3);
            vertex(x, y);
        }
        endShape();
    }
    
    drawInterferenceScreen() {
        // Draw screen
        stroke(255, 255, 255, 100);
        strokeWeight(2);
        line(0, this.interferenceScreenY, width, this.interferenceScreenY);
        
        // Draw screen label
        fill(255, 255, 255, 200);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(20);
        text("Interference Pattern Screen", 10, this.interferenceScreenY - 20);
    }
    
    drawInterferencePattern() {
        const k = (2 * PI) / this.wavelength;
        
        // Draw intensity pattern on screen
        for (let x = 0; x <= width; x += 4) {
            let intensity = 0;
            
            // Calculate wave contributions at this point on screen
            if (this.source1.enabled) {
                const dist1 = dist(x, this.interferenceScreenY, this.source1.x, this.source1.y);
                intensity += sin(k * dist1 - this.time * 2 * PI + radians(this.source1.phase)) + 1;
            }
            
            if (this.source2.enabled) {
                const dist2 = dist(x, this.interferenceScreenY, this.source2.x, this.source2.y);
                intensity += sin(k * dist2 - this.time * 2 * PI + radians(this.source2.phase)) + 1;
            }
            
            // Normalize intensity
            intensity /= 4; // Normalize to 0-1 range
            
            // Map intensity to brightness
            const brightness = intensity * 255;
            
            // Draw intensity bar
            stroke(brightness, brightness, brightness);
            strokeWeight(4);
            line(x, this.interferenceScreenY - 20, x, this.interferenceScreenY - 20 + intensity * 100);
            
            // Draw interference fringes
            if (intensity > 0.7) {
                // Bright fringe (constructive interference)
                stroke(255, 255, 100, 200);
                strokeWeight(1);
                line(x, this.interferenceScreenY, x, this.interferenceScreenY + 10);
            } else if (intensity < 0.3) {
                // Dark fringe (destructive interference)
                stroke(100, 100, 100, 200);
                strokeWeight(1);
                line(x, this.interferenceScreenY, x, this.interferenceScreenY + 10);
            }
        }
    }
    
    drawPhysicsInfo() {
        const infoY = this.interferenceScreenY + 40;
        
        fill(255, 255, 255, 200);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(12);
        
        // Calculate phase difference
        let phaseDiff = abs(this.source1.phase - this.source2.phase);
        if (phaseDiff > 180) phaseDiff = 360 - phaseDiff;
        
        // Determine interference type
        let interferenceType = "";
        if (phaseDiff < 45 || phaseDiff > 315) {
            interferenceType = "Mostly Constructive";
        } else if (phaseDiff > 135 && phaseDiff < 225) {
            interferenceType = "Mostly Destructive";
        } else {
            interferenceType = "Mixed Interference";
        }
        
        // Calculate path difference (simplified)
        const midX = width / 2;
        const pathDiff = abs(dist(midX, this.interferenceScreenY, this.source1.x, this.source1.y) - 
                            dist(midX, this.interferenceScreenY, this.source2.x, this.source2.y));
        
        // Draw physics information
        text(`Wavelength (λ): ${this.wavelength} px`, 10, infoY);
        text(`Phase Difference: ${phaseDiff.toFixed(0)}°`, 10, infoY + 20);
        text(`Interference: ${interferenceType}`, 10, infoY + 40);
        text(`Path Difference at Center: ${pathDiff.toFixed(0)} px`, 10, infoY + 60);
        
        // Draw constructive/destructive condition
        const n = round(pathDiff / this.wavelength);
        const condition = abs(pathDiff - n * this.wavelength) < 5 ? 
                         `Constructive (n = ${n})` : 
                         `Destructive (n = ${n})`;
        text(`Condition: ${condition}`, 10, infoY + 80);
    }
}