"use client";

import React from 'react';
import CodeEditor from './CodeEditor';

const HomePage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold mb-8">Code Execution Platform</h1>
      <CodeEditor />
    </main>
  );
};

export default HomePage;
