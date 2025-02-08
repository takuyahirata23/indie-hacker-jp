import Image from 'next/image'
import Link from 'next/link'

import { getAllPosts, extractPostsEntries } from '@/lib/contentful'

import { Twitter } from 'lucide-react'
import { Card, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type PostEntry = {
  title: string
  slug: string
  metadata: {
    title: string
    description: string
    slug: string
    cardImage: {
      url: string
      width: number
      height: number
    }
  }
}

export default async function Home() {
  const res = await getAllPosts(true)
  const entries = extractPostsEntries(res)

  return (
    <div className="font-[family-name:var(--font-geist-sans)] space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="bg-gradient bg-clip-text! text-transparent bg-cover! bg-center! font-black text-2xl">
            IndieHackerJP
          </h1>
          <a href="https://x.com/indiehackerjp" rel="noopener noreferrer" target="_blank" aria-label="My x account">
            <Button size="icon" className="cursor-pointer" aria-label="X link">
              <Twitter className="text-primary-foreground !w-6 !h-6" />
            </Button>
          </a>
        </div>
        <p className="text-muted-foreground mt-4">Sharing things I learned, and documenting my journey as an indie hacker.</p>
      </div>
      <ul className="grid sm:grid-cols-2 gap-4">
        {entries.map(({ slug, metadata: { title, description, cardImage } }: PostEntry, i: number) => (
          <li key={i}>
            <Link href={`/posts/${slug}`}>
              <Card className="overflow-hidden">
                <Image src={cardImage.url} width={cardImage.width} height={cardImage.height} alt="LiftySaaS icon" className="w-full h-full" />
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <div className="text-xl font-semibold">My Products</div>
        <div className="mt-2 border p-4 rounded-lg grid md:grid-cols-2 gap-y-4 md:gap-x-6">
          <a href="https://liftysaas.com" rel="noopener" target="_blank">
            <Card>
              <CardHeader className="flex-row gap-x-4 items-center">
                <Image src="/lifty-saas.png" width={28} height={28} alt="LiftySaaS icon" />
                <div className="space-y-1">
                  <CardTitle>
                    LiftySaaS
                  </CardTitle>
                  <CardDescription className="text-secondary-foreground">
                    Launching platform
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </a>
          <a href="https://snapvote.live" rel="noopener" target="_blank">
            <Card>
              <CardHeader className="flex-row gap-x-4 items-center">
                <Image src="/snap-vote.png" width={28} height={28} alt="LiftySaaS icon" />
                <div className="space-y-1">
                  <CardTitle>
                    SnapVote
                  </CardTitle>
                  <CardDescription className="text-secondary-foreground">
                    Embedding survey tool
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
}
