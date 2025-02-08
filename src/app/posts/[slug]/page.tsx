import Image from 'next/image'
import { getPost } from '@/lib/contentful'
import { RichText } from '@/components/RichText'
import { formatTime } from '@/lib/utils'

import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const slug = (await params).slug

  const { metadata: { title, description, twitterOgImage } } = await getPost(slug)

  return {
    title: title,
    description: description,
    openGraph: {
      images: [twitterOgImage.url],
    },
    twitter: {
      images: [twitterOgImage.url]
    }
  }
}

export default async function Post({ params }: Props) {
  const slug = (await params).slug
  const { title, publishDate, body, metadata } = await getPost(slug)

  return (
    <div className="mx-auto max-w-4xl">
      <div className="md:flex md:items-center md:justify-between">
        <div className="font-semibold md:text-xl">{title}</div>
        <span className="text-muted-foreground">{formatTime(publishDate)}</span>
      </div>
      <Image src={metadata.twitterOgImage.url} width={metadata.twitterOgImage.width}
        height={metadata.twitterOgImage.width} alt={metadata.twitterOgImage.title}
        className="aspect-2/1 my-2 md:my-4"
      />
      <section className="mt-4">
        <RichText richTextContent={body.json} />
      </section>
    </div>
  )
}
