import React from 'react';

interface ScoreGaugeProps {
    score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
    const getColor = () => {
        if (score >= 70) return 'green';
        if (score >= 50) return 'yellow';
        return 'red';
    };

    return (
        <div className="score-gauge">
            <svg viewBox="0 0 100 100" className="gauge-svg">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#eee"
                    strokeWidth="10"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={getColor()}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(score / 100) * 283} 283`}
                    transform="rotate(-90   50 50)"
                />
            </svg>
            <div className="score-text">
                <span className="score-number">{score}</span>
                <span className="score-label">ATS Score</span>
            </div>
        </div>
    );
};

export default ScoreGauge;