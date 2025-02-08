import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import Image from 'next/image'

import { client } from '@/lib/contentful'

export function RichText({ richTextContent }: { richTextContent: Document }) {
  const options: Options = { // Type the options object
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => <p className="mb-4 md:mb-6 md:text-lg">{children}</p>,
      [BLOCKS.HEADING_1]: (_node, children) => <h1 className="font-semibold py-2 md:py-4 md:text-lg">{children}</h1>,
      [BLOCKS.HEADING_2]: (_node, children) => <h2 className="font-semibold py-2 md:py-4 md:text-lg">{children}</h2>,
      [BLOCKS.HEADING_3]: (_node, children) => <h3 className="font-semibold py-1 md:py-2 md:text-lg">{children}</h3>,
      [BLOCKS.OL_LIST]: (_node, children) => <ol className="ml-2 mb-2">{children}</ol>,
      [BLOCKS.UL_LIST]: (_node, children) => <ul className="ml-2 mb-2">{children}</ul>,
      [BLOCKS.LIST_ITEM]: (_node, children) => <li className="[&>p]:m-0">{children}</li>,
      [BLOCKS.EMBEDDED_ASSET]: async (node) => {
        const { fields } = await client.getAsset(node.data.target.sys.id)

        if (fields) { // Check if fields exist to avoid runtime error
          const { title, description, file } = fields;
          const imageUrl = file?.url;  // Use optional chaining for file.url

          return imageUrl ? ( // Conditional rendering to prevent errors if image is missing
            <div className="my-1 md:my-2"><Image src={`https:${imageUrl}`} alt={title || description || ''} width={500} height={500} className="w-auto h-auto mx-auto" /></div>
          ) : null;
        }

        return null;
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const uri = node.data.uri; // Access uri property
        return <a href={uri} target="_blank" rel="noopener noreferrer" className="underline text-muted-foreground">{children}</a>;
      },
    },
  };

  return (
    <div>
      {richTextContent && documentToReactComponents(richTextContent, options)}
    </div>
  );
}

