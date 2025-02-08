import { getPost } from '@/lib/contentful'
import { RichText } from '@/components/RichText'

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const { title, publishDate, body } = await getPost(slug)
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="font-semibold md:text-xl">{title}</div>
        <span className="text-muted-foreground">{publishDate}</span>
      </div>
      <section className="mt-4">
        <RichText richTextContent={body.json} />
      </section>
    </div>
  )
}
