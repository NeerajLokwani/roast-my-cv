import React from 'react';

interface FeedbackCardProps {
    feedback: {
        summary: string;
        experience: string;
        skills: string;
        education: string;
        projects: string;
    };
    topFixes: string[];
    missingKeywords: string[];
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, topFixes, missingKeywords }) => {
    return (
        <div className="feedback-card">
            <h2>Section Feedback</h2>
            <div className="feedback-section">
                <h3>Summary</h3>
                <p>{feedback.summary}</p>
            </div>
            <div className="feedback-section">
                <h3>Experience</h3>
                <p>{feedback.experience}</p>
            </div>
            <div className="feedback-section">
                <h3>Skills</h3>
                <p>{feedback.skills}</p>
            </div>
            <div className="feedback-section">
                <h3>Education</h3>
                <p>{feedback.education}</p>
            </div>
            <div className="feedback-section">
                <h3>Projects</h3>
                <p>{feedback.projects}</p>
            </div>

            <h2>Top 3 Fixes</h2>
            <ol className="top-fixes">
                {topFixes.map((fix, i) => (
                    <li key={i}>{fix}</li>
                ))}
            </ol>

            <h2>Missing Keywords</h2>
            <div className="keywords">
                {missingKeywords.map((kw, i) => (
                    <span key={i} className="keyword-tag">{kw}</span>
                ))}
            </div>
        </div>
    );
};

export default FeedbackCard;