import { useEffect } from 'react';

export const useEmojiFont = (ref) => {
    useEffect(() => {
        if (ref.current) {
            applyEmojiFont(ref.current);
        }
    }, [ref]);
};

function applyEmojiFont(node) {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/gu;

    node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            const replacedNode = document.createElement('span');
            replacedNode.innerHTML = child.nodeValue.replace(emojiRegex, match => `<span class="emoji">${match}</span>`);
            node.replaceChild(replacedNode, child);
        }
    });
}
