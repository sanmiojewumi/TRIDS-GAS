import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { cleanText, isSafeMediaUrl } from '@/lib/security';

type ContentModel = 'projects' | 'areas' | 'articles' | 'faqs';

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function refresh(model: ContentModel) {
  const paths: Record<ContentModel, string[]> = {
    projects: ['/projects'],
    areas: ['/areas'],
    articles: ['/blog'],
    faqs: ['/faq'],
  };
  paths[model].forEach((path) => revalidatePath(path));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ model: string }> },
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { model } = await params;
  try {
    if (model === 'projects') {
      return NextResponse.json({ items: await db.project.findMany({ orderBy: { createdAt: 'desc' } }) });
    }
    if (model === 'areas') {
      return NextResponse.json({ items: await db.serviceArea.findMany({ orderBy: { name: 'asc' } }) });
    }
    if (model === 'articles') {
      return NextResponse.json({ items: await db.blogPost.findMany({ orderBy: { createdAt: 'desc' } }) });
    }
    if (model === 'faqs') {
      return NextResponse.json({ items: await db.faqItem.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] }) });
    }
    return NextResponse.json({ error: 'Unknown content type' }, { status: 404 });
  } catch (error) {
    console.error(`Failed to load admin content "${model}":`, error);
    return NextResponse.json({ error: 'Could not load content' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ model: string }> },
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { model: rawModel } = await params;
  const model = rawModel as ContentModel;

  try {
    const body = await request.json();

    if (model === 'projects') {
      const title = cleanText(body.title, 160);
      const afterImage = cleanText(body.afterImage, 500);
      const beforeImage = cleanText(body.beforeImage, 500);
      if (!title || !afterImage || !isSafeMediaUrl(afterImage) || (beforeImage && !isSafeMediaUrl(beforeImage))) {
        return NextResponse.json({ error: 'A title and valid HTTPS or local after image are required' }, { status: 400 });
      }
      const item = await db.project.create({
        data: {
          title,
          category: cleanText(body.category, 80) || 'Boiler Installation',
          description: cleanText(body.description, 3000),
          beforeImage: beforeImage || null,
          afterImage,
          location: cleanText(body.location, 120) || null,
          published: body.published !== false,
        },
      });
      refresh(model);
      return NextResponse.json({ success: true, item }, { status: 201 });
    }

    if (model === 'areas') {
      const name = cleanText(body.name, 100);
      const slug = slugify(name);
      if (!name || !slug || !cleanText(body.description, 3000)) {
        return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
      }
      const item = await db.serviceArea.create({
        data: {
          name,
          slug,
          description: cleanText(body.description, 3000),
          active: body.active !== false,
          seoTitle: cleanText(body.seoTitle, 180) || null,
          seoDescription: cleanText(body.seoDescription, 320) || null,
        },
      });
      refresh(model);
      return NextResponse.json({ success: true, item }, { status: 201 });
    }

    if (model === 'articles') {
      const title = cleanText(body.title, 180);
      const featuredImage = cleanText(body.featuredImage, 500);
      const slug = slugify(title);
      if (
        !title ||
        !slug ||
        !cleanText(body.excerpt, 600) ||
        !cleanText(body.content, 20_000) ||
        !featuredImage ||
        !isSafeMediaUrl(featuredImage)
      ) {
        return NextResponse.json({ error: 'Title, excerpt, content and a valid image are required' }, { status: 400 });
      }
      const item = await db.blogPost.create({
        data: {
          title,
          slug,
          excerpt: cleanText(body.excerpt, 600),
          content: cleanText(body.content, 20_000),
          featuredImage,
          category: cleanText(body.category, 80) || 'Home Maintenance',
          author: cleanText(body.author, 100) || 'TRIDS Gas & Plumbing',
          published: body.published !== false,
          seoTitle: cleanText(body.seoTitle, 180) || null,
          seoDescription: cleanText(body.seoDescription, 320) || null,
        },
      });
      refresh(model);
      return NextResponse.json({ success: true, item }, { status: 201 });
    }

    if (model === 'faqs') {
      const question = cleanText(body.question, 300);
      const answer = cleanText(body.answer, 4000);
      if (!question || !answer) {
        return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
      }
      const item = await db.faqItem.create({
        data: {
          question,
          answer,
          category: cleanText(body.category, 80) || 'General',
          order: Math.max(0, Number(body.order) || 0),
          published: body.published !== false,
        },
      });
      refresh(model);
      return NextResponse.json({ success: true, item }, { status: 201 });
    }

    return NextResponse.json({ error: 'Unknown content type' }, { status: 404 });
  } catch (error) {
    console.error(`Failed to create admin content "${model}":`, error);
    return NextResponse.json(
      { error: 'Could not create content. Check that the title or name is unique.' },
      { status: 400 },
    );
  }
}
