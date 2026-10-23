"use client";

import { useState } from "react";
import { terminalTabs, type TerminalLine } from "@/content/site";
import { Cursor, WindowBar } from "./ui";

const toneClass: Record<TerminalLine["tone"], string> = {
  muted: "text-muted",
  ok: "text-accent",
  result: "text-ink",
};

export function Terminal() {
  const [active, setActive] = useState(terminalTabs[0].id);
  const tab = terminalTabs.find((t) => t.id === active) ?? terminalTabs[0];

  return (
    <div className="overflow-hidden rounded-[10px] border border-line-2 bg-surface shadow-[0_0_0_1px_rgb(200_240_74/0.04),0_30px_80px_rgb(0_0_0/0.55)]">
      <WindowBar title="preteco@prod: ~" dots />
      <div role="tablist" aria-label="Módulos" className="flex flex-wrap gap-2 px-4 pt-3.5">
        {terminalTabs.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls="terminal-panel"
              onClick={() => setActive(t.id)}
              className={
                "min-h-9 cursor-pointer rounded px-3.5 font-mono text-[13px] transition-colors " +
                (selected
                  ? "border border-accent bg-accent font-semibold text-bg"
                  : "border border-line-2 bg-transparent text-soft hover:border-accent hover:text-accent")
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        id="terminal-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab.id}`}
        aria-live="polite"
        className="min-h-[280px] px-5 pt-5 pb-[26px] font-mono text-sm leading-[1.85]"
      >
        <div className="text-ink">
          <span className="text-accent">❯</span> {tab.cmd}
        </div>
        {tab.lines.map((l, i) => (
          <div key={`${tab.id}-${i}`} className={toneClass[l.tone]}>
            {l.text}
          </div>
        ))}
        <div className="mt-1.5 text-ink">
          <span className="text-accent">❯</span> <Cursor className="h-[17px] w-[9px] align-[-3px]" />
        </div>
      </div>
    </div>
  );
}
