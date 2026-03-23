// App with file upload state, parse PDF on drop, call AnalyzeCV, 
// show loading spinner while analyzing, display CVFeedback results
// Use UploadZone, FeedbackCard, ScoreGauge, BeforeAfter components
import React, { useState } from 'react';
import { ParsePdf } from './utils/ParsePdf';
import { AnalyzeCV } from './utils/AnalyzeCV';
import UploadZone from './components/UploadZone';
import FeedbackCard from './components/FeedbackCard';
import ScoreGauge from './components/ScoreGauge';
import BeforeAfter from './components/BeforeAfter';
import './App.css';

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cvText, setCvText] = useState<string>('');
  const [feedback, setFeedback] = useState<null | Awaited<ReturnType<typeof AnalyzeCV>>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (file: File) => {
    setError('');
    try {
      const text = await ParsePdf(file);
      setCvText(text);
      setLoading(true);
      const analysis = await AnalyzeCV(text);
      setFeedback(analysis);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="app-container">
        <h1>Roast My CV 🔥</h1>
        <p className="subtitle">Upload your CV and get brutally honest feedback</p>
        <UploadZone onFileUpload={handleFileUpload} />
        {loading && <div className="loading">Analyzing your CV</div>}
        {error && <p className="error">{error}</p>}
        {feedback && (
            <>
                <ScoreGauge score={feedback.ats_score} />
                <FeedbackCard
                    feedback={feedback.sections_feedback}
                    topFixes={feedback.top_3_fixes}
                    missingKeywords={feedback.missing_keywords}
                />
                <BeforeAfter weakBullets={feedback.weak_bullets} />
            </>
        )}
    </div>
);
};

export default App; 