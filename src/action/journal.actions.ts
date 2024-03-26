'use server';

import journaData from '@/_content/journals/journals.json';
import fetchFile from '@/lib/fetchFile';
import {MDBlock} from '@/lib/interfaces/markdown';



export async function getMeta(slug: string) {
  const index = journaData.journals.findIndex((journal) => journal == slug);
  if (index == -1) {
    return null;
  } else
    return journaData.metadata[index];
}
async function getSections(slug: string) {
  const file = fetchFile(`src/_content/journals/json/${slug}/index.json`);
  if (!file) return 0;
  const data = await JSON.parse(file);
  return data;
}
async function getSectionId(slug: string, index: number) {
  const file = fetchFile(`src/_content/journals/json/${slug}/index.json`);
  if (!file) return null;
  const data = await JSON.parse(file);
  return data[index].id;
}

export async function getIntro(slug: string) {
  const id = await getSectionId(slug, 0);
  if (!id) return null;
  const file = fetchFile(`src/_content/journals/json/${slug}/${id}.json`);
  if (!file) return null;
  return await JSON.parse(file);
}
export async function getRest(slug: string) {
  const data = await getSections(slug);
  if (!data) return null;
  const sections: MDBlock[][] = [];
  for (let i = 1; i < data.length; i++) {
    const id = data[i].id;
    const file = fetchFile(`src/_content/journals/json/${slug}/${id}.json`);
    if (!file) continue;
    const section = await JSON.parse(file);
    sections.push(section);
  }
  return sections;
}