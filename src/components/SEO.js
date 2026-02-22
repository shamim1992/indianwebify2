import Head from 'next/head';

const SEO = ({
  title = 'Indian Webify - Digital Solutions & Web Development Services',
  description = 'Indian Webify offers professional website development, app development, AI solutions, digital marketing, and research projects. Transform your business with our cutting-edge digital services.',
  keywords = 'website development, app development, AI development, digital marketing, web design, mobile apps, Indian Webify',
  image = '/indianwebify.png',
  url = 'https://indianwebify.com',
  type = 'website',
  author = 'Indian Webify',
  noindex = false,
  nofollow = false,
  // Article-specific props
  publishedTime = null,
  modifiedTime = null,
  articleAuthor = null,
  articleSection = null,
  articleTags = null,
  // Structured data (JSON-LD)
  jsonLd = null,
}) => {
  const fullTitle = title.includes('Indian Webify') ? title : `${title} | Indian Webify`;
  const fullUrl = url.startsWith('http') ? url : `https://indianwebify.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://indianwebify.com${image}`;
  const robotsContent = [noindex ? 'noindex' : 'index', nofollow ? 'nofollow' : 'follow'].join(', ');

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robotsContent} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Indian Webify" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {type === 'article' && articleTags && articleTags.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@IndianWebify" />
      <meta property="twitter:creator" content="@IndianWebify" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      <meta property="twitter:image:alt" content={fullTitle} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6d123f" />
      <meta name="msapplication-TileColor" content="#6d123f" />
      <link rel="canonical" href={fullUrl} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default SEO;
