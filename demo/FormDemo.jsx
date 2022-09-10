import React from 'react';
import Form from '../components/Form/Form';

export default function FormDemo() {
  return (
    <div className="flex h-screen">
      <div className="mx-auto">
        <div className="text-2xl w-fit mx-auto m-20">Form Demo</div>
        <div className="text-2xl mx-auto mt-52">
          <Form />
        </div>
      </div>
    </div>
  );
}
