import React from 'react';
import Form from '../components/FormMemo/Form';

export default function FormMemoDemo() {
  return (
    <div className="flex h-screen">
      <div className="mx-auto">
        <div className="text-2xl w-fit mx-auto m-20">Memoization Demo</div>
        <div className="text-2xl mx-auto mt-20">
          <Form />
        </div>
      </div>
    </div>
  );
}
