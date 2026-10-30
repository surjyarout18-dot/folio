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
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image, width: 1600, height: 1000, alt: project.title }],
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
