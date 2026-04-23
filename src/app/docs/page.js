"use client";
import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Book, Code, Globe, Terminal } from 'lucide-react';
import useTranslation from '@/lib/i18n/useTranslation';

export default function DocsPage() {
  const { lang } = useTranslation();

  return (
    <div className="docs-page">
      <Header />
      
      <div className="container docs-container">
        <aside className="docs-sidebar">
          <nav>
            <h3>Getting Started</h3>
            <ul>
              <li className="active">Introduction</li>
              <li>Authentication</li>
              <li>Rate Limits</li>
            </ul>
            <h3>Resources</h3>
            <ul>
              <li>Ingredients</li>
              <li>Substitutes</li>
              <li>Search API</li>
            </ul>
          </nav>
        </aside>

        <main className="docs-content">
          <header className="docs-header">
            <span className="badge">v1.0.0</span>
            <h1>API Documentation</h1>
            <p>Integrate scientific ingredient swap data into your own applications.</p>
          </header>

          <section className="docs-section">
            <div className="section-title">
              <Terminal size={24} />
              <h2>Endpoints</h2>
            </div>

            <div className="api-card glass-card">
              <div className="api-header">
                <span className="method get">GET</span>
                <code className="endpoint">/api/ingredients</code>
              </div>
              <p className="api-desc">Returns a list of all supported ingredients and their basic metadata.</p>
              
              <div className="code-block">
                <pre>
{`{
  "ingredients": [
    {
      "id": "gochujang",
      "name": { "en": "Gochujang", "ko": "고추장" },
      "category": { "en": "K-Food", "ko": "K-푸드" }
    }
  ]
}`}
                </pre>
              </div>
            </div>

            <div className="api-card glass-card">
              <div className="api-header">
                <span className="method get">GET</span>
                <code className="endpoint">/api/ingredients/[id]</code>
              </div>
              <p className="api-desc">Returns detailed substitution data for a specific ingredient.</p>
            </div>
          </section>

          <section className="docs-section">
            <div className="section-title">
              <Code size={24} />
              <h2>Example Implementation</h2>
            </div>
            <div className="code-block">
              <pre>
{`fetch('https://swap.sia.com/api/ingredients/gochujang')
  .then(res => res.json())
  .then(data => console.log(data.substitutes[0].name.en));`}
              </pre>
            </div>
          </section>
        </main>
      </div>

      <Footer />

      <style jsx>{`
        .docs-page {
          min-height: 100vh;
          background: #050505;
        }
        .docs-container {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 64px;
          padding: 80px 24px;
        }
        .docs-sidebar h3 {
          font-size: 14px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
          margin-top: 32px;
        }
        .docs-sidebar ul {
          list-style: none;
        }
        .docs-sidebar li {
          font-size: 15px;
          color: var(--text-secondary);
          padding: 8px 0;
          cursor: pointer;
          transition: color 0.2s;
        }
        .docs-sidebar li:hover, .docs-sidebar li.active {
          color: var(--brand-primary);
        }
        
        .docs-header {
          margin-bottom: 64px;
        }
        .badge {
          background: rgba(245, 158, 11, 0.1);
          color: var(--brand-primary);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 16px;
          display: inline-block;
        }
        .docs-header h1 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .docs-header p {
          font-size: 18px;
          color: var(--text-secondary);
        }
        
        .docs-section {
          margin-bottom: 64px;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          color: var(--text-primary);
        }
        .section-title h2 {
          font-size: 24px;
          margin: 0;
        }
        
        .api-card {
          padding: 32px;
          margin-bottom: 24px;
        }
        .api-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .method {
          font-weight: 800;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .method.get {
          background: rgba(16, 185, 129, 0.2);
          color: var(--brand-success);
        }
        .endpoint {
          font-family: 'monospace';
          font-size: 16px;
          color: var(--text-primary);
        }
        .api-desc {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        
        .code-block {
          background: #000;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          overflow-x: auto;
        }
        pre {
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          color: #10b981;
          line-height: 1.6;
        }
        
        @media (max-width: 900px) {
          .docs-container {
            grid-template-columns: 1fr;
          }
          .docs-sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
