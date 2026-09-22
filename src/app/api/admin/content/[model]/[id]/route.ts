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
  const path = {
    projects: '/projects',
    areas: '/areas',
    articles: '/blog',
    faqs: '/faq',
  }[model];
  revalidatePath(path);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ model: string; id: string }> },
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { model: rawModel, id } = await params;
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
      const item = await db.project.update({
        where: { id },
        data: {
          title,
          category: cleanText(body.category, 80) || 'Boiler Installation',
          description: cleanText(body.description, 3000),
          beforeImage: beforeImage || null,
          afterImage,
          location: cleanText(body.location, 120) || null,
          published: Boolean(body.published),
        },
      });
      refresh(model);
      return NextResponse.json({ success: true, item });
    }

    if (model === 'areas') {
      const name = cleanText(body.name, 100);
      const description = cleanText(body.description, 3000);
      if (!name || !slugify(name) || !description) {
        return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
      }
      const item = await db.serviceArea.update({
        where: { id },
        data: {
          name,
          slug: slugify(name),
          description,
          active: Boolean(body.active),
          seoTitle: cleanText(body.seoTitle, 180) || null,
          seoDescription: cleanText(body.seoDescription, 320) || null,
        },
      });
      refresh(model);
      return NextResponse.json({ success: true, item });
    }

    if (model === 'articles') {
      const title = cleanText(body.title, 180);
      const featuredImage = cleanText(body.featuredImage, 500);
      if (
        !title ||
        !slugify(title) ||
        !cleanText(body.excerpt, 600) ||
        !cleanText(body.content, 20_000) ||
        !featuredImage ||
        !isSafeMediaUrl(featuredImage)
      ) {
        return NextResponse.json({ error: 'Title, excerpt, content and a valid image are required' }, { status: 400 });
      }
      const item = await db.blogPost.update({
        where: { id },
        data: {
          title,
          slug: slugify(title),
          excerpt: cleanText(body.excerpt, 600),
          content: cleanText(body.content, 20_000),
          featuredImage,
          category: cleanText(body.category, 80) || 'Home Maintenance',
          author: cleanText(body.author, 100) || 'TRIDS Gas & Plumbing',
          published: Boolean(body.published),
          seoTitle: cleanText(body.seoTitle, 180) || null,
          seoDescription: cleanText(body.seoDescription, 320) || null,
        },
      });
      refresh(model);
      return NextResponse.json({ success: true, item });
    }

    if (model === 'faqs') {
      const question = cleanText(body.question, 300);
      const answer = cleanText(body.answer, 4000);
      if (!question || !answer) {
        return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
      }
      const item = await db.faqItem.update({
        where: { id },
        data: {
          question,
          answer,
          category: cleanText(body.category, 80) || 'General',
          order: Math.max(0, Number(body.order) || 0),
          published: Boolean(body.published),
        },
      });
      refresh(model);
      return NextResponse.json({ success: true, item });
    }

    return NextResponse.json({ error: 'Unknown content type' }, { status: 404 });
  } catch (error) {
    console.error(`Failed to update admin content "${model}":`, error);
    return NextResponse.json(
      { error: 'Could not update content. Check that the title or name is unique.' },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ model: string; id: string }> },
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { model: rawModel, id } = await params;
  const model = rawModel as ContentModel;

  try {
    if (model === 'projects') await db.project.delete({ where: { id } });
    else if (model === 'areas') await db.serviceArea.delete({ where: { id } });
    else if (model === 'articles') await db.blogPost.delete({ where: { id } });
    else if (model === 'faqs') await db.faqItem.delete({ where: { id } });
    else return NextResponse.json({ error: 'Unknown content type' }, { status: 404 });

    refresh(model);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Failed to delete admin content "${model}":`, error);
    return NextResponse.json({ error: 'Could not remove content' }, { status: 500 });
  }
}
