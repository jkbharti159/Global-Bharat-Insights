/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = "India Focus" | "Global Affairs" | "Geopolitics";

export type Source = "The Hindu" | "The Indian Express" | "Times of India" | "Reuters" | "BBC World News";

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface VisualizationData {
  type: "line" | "bar" | "donut" | "radar" | "gauge";
  title: string;
  description: string;
  data: { label: string; value: number }[];
}

export interface NewsArticle {
  id: string;
  title: string;
  source: Source;
  category: Category;
  whyItMatters: string[]; // Strict limit: Max 4 bullets
  summary: string;
  timeline: TimelineEvent[]; // Vertical timeline showing past few weeks development
  visualization: VisualizationData;
  readingTime: number; // in minutes
  publishedTime: string;
  isAIResult?: boolean;
  tags: string[];
  imageUrl?: string;
}
