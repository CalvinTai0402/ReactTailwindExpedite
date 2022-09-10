import React, { useState } from 'react';
import useClipboard from '../hooks/useClipboard';

export default function ClipboardDemo() {
  const [value, setValue] = useState('');
  const { clipboardState, copy, error } = useClipboard({ delay: 2000 });

  return (
    <div className="flex h-screen">
      <div className="mx-auto">
        <div className="text-2xl w-fit mx-auto m-20">Clipboard Demo</div>
        <div className="text-2xl mx-auto mt-52">
          <div className="mx-auto">
            <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full border border-gray-500" />
          </div>
          <button
            onClick={() => copy(value)}
            type="button"
            className="mx-auto w-full"
          >
            {clipboardState === 'copying' ? 'copying' : 'copy'}
          </button>
          <div className="mx-auto w-fit">
            Clipboard state:
            {clipboardState || 'null'}
          </div>
          {error
          && (
          <div className="mx-auto w-fit">
            {error}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
