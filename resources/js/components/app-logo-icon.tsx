import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            {/* Neural network nodes */}
            <circle cx="8" cy="8" r="2.5" fill="currentColor" />
            <circle cx="20" cy="6" r="2.5" fill="currentColor" />
            <circle cx="32" cy="8" r="2.5" fill="currentColor" />
            
            <circle cx="6" cy="20" r="2.5" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <circle cx="34" cy="20" r="2.5" fill="currentColor" />
            
            <circle cx="8" cy="32" r="2.5" fill="currentColor" />
            <circle cx="20" cy="34" r="2.5" fill="currentColor" />
            <circle cx="32" cy="32" r="2.5" fill="currentColor" />
            
            {/* Connection lines */}
            <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6">
                {/* Top layer connections */}
                <line x1="10.5" y1="8" x2="17.5" y2="6" />
                <line x1="22.5" y1="6" x2="29.5" y2="8" />
                
                {/* Middle layer connections */}
                <line x1="8.5" y1="20" x2="17" y2="20" />
                <line x1="23" y1="20" x2="31.5" y2="20" />
                
                {/* Bottom layer connections */}
                <line x1="10.5" y1="32" x2="17.5" y2="34" />
                <line x1="22.5" y1="34" x2="29.5" y2="32" />
                
                {/* Vertical connections */}
                <line x1="8" y1="10.5" x2="6" y2="17.5" />
                <line x1="20" y1="8.5" x2="20" y2="17" />
                <line x1="32" y1="10.5" x2="34" y2="17.5" />
                
                <line x1="6" y1="22.5" x2="8" y2="29.5" />
                <line x1="20" y1="23" x2="20" y2="31" />
                <line x1="34" y1="22.5" x2="32" y2="29.5" />
                
                {/* Cross connections for AI complexity */}
                <line x1="10.5" y1="8" x2="18" y2="18" />
                <line x1="29.5" y1="8" x2="22" y2="18" />
                <line x1="8.5" y1="22" x2="18" y2="32" />
                <line x1="31.5" y1="22" x2="22" y2="32" />
            </g>
            
            {/* Central processing indicator */}
            <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        </svg>
    );
}