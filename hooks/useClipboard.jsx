import { useState } from 'react';

export default function useClipboard({ delay = 0 } = {}) {
  const [clipboardState, setClipboardState] = useState('');
  const [error, setError] = useState('');
  const handleCopy = async (value) => {
    setClipboardState('copying');
    await navigator.clipboard.writeText(value);
    setClipboardState('disabled');
    setTimeout(() => setClipboardState('ready'), delay);
  };

  const copy = async (value) => {
    if (clipboardState === 'disabled') return;
    if ('clipboard' in navigator) {
      try {
        // setError('Purposely throw error');
        handleCopy(value);
      } catch (e) {
        setClipboardState('error');
        setError(String(e));
      }
    } else {
      setClipboardState('error');
      setError('Browser does not support navigator.clipboard');
    }
  };

  return { copy, clipboardState, error };
}
