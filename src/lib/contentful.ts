const POST_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches for articles with an "articles" cache tag so content can
      // be revalidated or updated from Contentful on publish
      next: { tags: ["posts"] },
    }
  ).then((response) => response.json());
}

export function extractPostsEntries(fetchResponse: any) {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getAllPosts(
  isDraftMode = false
) {
  const posts = await fetchGraphQL(
    `query {
      postCollection {
        items {
          title
          slug
        }
  }
    }`,
    isDraftMode
  );
  return posts;
}

export async function getArticle(
  slug,
  isDraftMode = false
) {
  const article = await fetchGraphQL(
    `query {
        knowledgeArticleCollection(where:{slug: "${slug}"}, limit: 1, preview: ${isDraftMode ? "true" : "false"
    }) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractArticleEntries(article)[0];
}
