
import {IBlogMeta} from '@/lib/interfaces/blogs';
import {parseMeta} from '@/lib/parser/parser';
import * as fs from 'fs';


export async function getBlogMetas() {
  const blogUrl = 'src/_content/blogs';
  const files = fs.readdirSync(blogUrl);
  const metas: IBlogMeta[] = [];
  for (const f in files) {
    const b: IBlogMeta =
        {createdAt: '', title: '', description: '', hero: '', slug: ''};
    const meta = parseMeta(`${blogUrl}/${files[f]}`, b);
    if (meta.title.length > 0) metas.push(meta);
  }
  return metas;
}