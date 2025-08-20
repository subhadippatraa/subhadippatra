import React from 'react';

export function mdToHtml(md: string): JSX.Element {
  const lines = md.split(/\r?\n/);
  const blocks: JSX.Element[] = [];
  let para: string[] = [];
  function flushPara() {
    if (para.length) {
      blocks.push(<p key={`p-${blocks.length}`}>{para.join(' ')}</p>);
      para = [];
    }
  }
  lines.forEach((line, idx) => {
    if (line.startsWith('## ')) {
      flushPara();
      blocks.push(<h3 key={`h3-${idx}`}>{line.replace(/^##\s+/, '')}</h3>);
    } else if (line.startsWith('# ')) {
      flushPara();
      blocks.push(<h2 key={`h2-${idx}`}>{line.replace(/^#\s+/, '')}</h2>);
    } else if (line.trim() === '') {
      flushPara();
    } else {
      para.push(line.trim());
    }
  });
  flushPara();
  return <>{blocks}</>;
}

