/**
 * Loads authoritative source content from the sources/ directory.
 * These files are maintained by legal and are the primary source of truth.
 * DO NOT modify source content programmatically — changes go through PR review.
 *
 * This module parses the markdown files and makes their content available
 * to the API routes for use as context in LLM prompts.
 */

import fs from "fs";
import path from "path";

export interface AuthoritativeSection {
  title: string;
  sourceDocument: string;
  sourceUrl: string;
  content: string;
}

export interface AuthoritativeFile {
  filename: string;
  category: string;
  sections: AuthoritativeSection[];
}

const SOURCES_DIR = path.join(process.cwd(), "sources");

const AUTHORITATIVE_FILES = [
  "data-security.md",
  "product-security.md",
  "legal-and-policies.md",
];

function parseSourceMarkdown(filename: string): AuthoritativeFile {
  const filepath = path.join(SOURCES_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf-8");
  const category = filename.replace(".md", "");

  const sections: AuthoritativeSection[] = [];
  const blocks = raw.split(/^---$/m).filter(b => b.trim());

  for (const block of blocks) {
    const titleMatch = block.match(/^##\s+(.+)$/m);
    const sourceMatch = block.match(/Source:\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    const sourceDocument = sourceMatch ? sourceMatch[1] : `${category} > ${title}`;
    const sourceUrl = sourceMatch ? sourceMatch[2] : "";

    const contentLines = block.split("\n").filter(line =>
      !line.startsWith("# ") && !line.startsWith("## ") && !line.startsWith("Source:") && line.trim()
    );
    const content = contentLines.join("\n").trim();

    if (content) {
      sections.push({ title, sourceDocument, sourceUrl, content });
    }
  }

  return { filename, category, sections };
}

let _cache: AuthoritativeFile[] | null = null;

export function getAuthoritativeSources(): AuthoritativeFile[] {
  if (_cache) return _cache;
  _cache = AUTHORITATIVE_FILES.map(parseSourceMarkdown);
  return _cache;
}

export function getAuthoritativeContext(question?: string): string {
  const files = getAuthoritativeSources();
  const allSections = files.flatMap(f => f.sections);

  if (!question) {
    return allSections
      .map(s => `[${s.sourceDocument}] (${s.sourceUrl})\n${s.content}`)
      .join("\n\n");
  }

  const lower = question.toLowerCase();
  const terms = lower.split(/\s+/).filter(t => t.length > 2);

  const scored = allSections.map(section => {
    let score = 0;
    for (const term of terms) {
      if (section.content.toLowerCase().includes(term)) score += 1;
      if (section.title.toLowerCase().includes(term)) score += 5;
      if (section.sourceDocument.toLowerCase().includes(term)) score += 3;
    }
    return { section, score };
  });

  const relevant = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score);
  const results = relevant.length > 0 ? relevant.map(s => s.section) : allSections;

  return results
    .map(s => `[${s.sourceDocument}] (${s.sourceUrl})\n${s.content}`)
    .join("\n\n");
}

export function getSourceLabel(url: string): string {
  const files = getAuthoritativeSources();
  for (const file of files) {
    for (const section of file.sections) {
      if (section.sourceUrl === url) return section.sourceDocument;
    }
  }
  return "";
}
