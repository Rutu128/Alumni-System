import React from 'react';
import { Link } from 'react-router-dom';

export const ImageIcon = ({ width = '2rem' }) => (
    <Link to={'/'}>
        <svg width={width} height='auto' viewBox="-3.6 -3.6 43.20 43.20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <title>image</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Vivid.JS" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Vivid-Icons" transform="translate(-901.000000, -336.000000)">
                        <g id="Icons" transform="translate(37.000000, 169.000000)">
                            <g id="image" transform="translate(858.000000, 156.000000)">
                                <g transform="translate(6.000000, 11.000000)">
                                    <rect id="Rectangle-path" fill="#d2befd" fillRule="nonzero" x="0" y="0" width="36" height="26"></rect>
                                    <path d="M0,26 L13,13 L18,18 L29,7 L36,14 L36,26 L0,26 Z M18.5,6 C19.8807119,6 21,7.11928813 21,8.5 C21,9.88071187 19.8807119,11 18.5,11 C17.1192881,11 16,9.88071187 16,8.5 C16,7.11928813 17.1192881,6 18.5,6 Z" id="Shape" fill="#622bd7"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </Link>
);
