import React from 'react';

interface BeforeAfterProps {
    weakBullets: { original: string; rewritten: string }[];
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({ weakBullets }) => {
    if (weakBullets.length === 0) return null;

    return (
        <div className="before-after">
            <h2>Bullet Point Rewrites</h2>
            {weakBullets.map((bullet, i) => (
                <div key={i} className="bullet-comparison">
                    <div className="original-bullet">
                        <h3>Original</h3>
                        <p>{bullet.original}</p>
                    </div>
                    <div className="rewritten-bullet">
                        <h3>Rewritten</h3>
                        <p>{bullet.rewritten}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BeforeAfter;