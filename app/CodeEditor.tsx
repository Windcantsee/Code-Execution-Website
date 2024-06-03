"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Console from './Console';

const CodeEditor = () => {
  const [code, setCode] = useState('# Write your Python code here');
  const [output, setOutput] = useState('');

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleTestCode = async () => {
    console.log('hi')
    try {
      const response = await fetch('http://127.0.0.1:8000/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleSubmitCode = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Editor
        height="70vh"
        defaultLanguage="python"
        defaultValue={code}
        onChange={handleEditorChange}
      />
      <div className="mt-4 flex justify-end">
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleTestCode}
          >
            Test Code
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmitCode}
          >
            Submit Code
          </button>
        </div>
      </div>
      <Console output={output} />
    </div>
  );
};

export default CodeEditor;



