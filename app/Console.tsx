"use client";

import React from 'react';

interface ConsoleProps {
  output: string;
}

const Console: React.FC<ConsoleProps> = ({ output }) => {
  return (
    <div className="bg-white text-black p-4 rounded mt-4">
      <h3 className="text-lg font-bold">Console Output</h3>
      <pre className="whitespace-pre-wrap">{output}</pre>
    </div>
  );
};

export default Console;