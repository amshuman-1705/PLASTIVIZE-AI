
import React from 'react';
import type { TimelineEvent } from '../../types';

interface TimelineProps {
    events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
    return (
        <div className="relative border-l-2 border-brand-green-light ml-3">
            {events.map((event, index) => (
                <div key={index} className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-brand-green-light rounded-full -left-3 ring-8 ring-white">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                    </span>
                    <h3 className="flex items-center mb-1 text-md font-semibold text-brand-text">
                        {event.date}
                    </h3>
                    <p className="text-sm font-normal text-brand-text-light">{event.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
