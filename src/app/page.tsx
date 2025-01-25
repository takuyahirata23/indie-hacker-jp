import Image from 'next/image'

import { Twitter } from 'lucide-react'
import { Card, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Home() {
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
        <p className="text-muted-foreground mt-4">Sharing thing I learned, enjoyed and earned. Happy hacking!</p>
      </div>
      <div>
        <div className="text-xl font-semibold">My Products</div>
        <div className="mt-2 border p-4 rounded-lg grid md:grid-cols-2 gap-2 md:gap-x-6">
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
