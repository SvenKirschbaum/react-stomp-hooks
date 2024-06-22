import './index.css'

import React from 'react'
import { App } from './App.jsx';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
