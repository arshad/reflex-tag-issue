import { useStaticQuery, graphql } from "gatsby";

export const usePostTag = () => {
  const data = useStaticQuery(graphql`
    query {
      # Find all post tags, return the name and slug fields.
      allPostTag {
        nodes {
          name
          slug
        }
      }
      # Find all posts grouped by the tag slug and return the total count.
      allPost {
        group(field: tags___slug) {
          slug: fieldValue
          totalCount
        }
      }
    }
  `);

  // Loop through the post tags and add the count by matching slugs.
  data.allPostTag.nodes.map(
    (node) =>
      (node.count = data.allPost.group.filter(
        ({ slug }) => slug === node.slug
      )[0].totalCount)
  );

  return data.allPostTag.nodes;
};
