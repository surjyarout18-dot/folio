import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'
import { ProjectDetail } from '@/components/project-detail'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      type: 'article',
      images: [{ url: project.image, width: 1600, height: 1000, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  return <ProjectDetail project={project} next={next} />
}
