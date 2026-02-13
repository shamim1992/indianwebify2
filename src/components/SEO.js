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
}) => {
  const fullTitle = title.includes('Indian Webify') ? title : `${title} | Indian Webify`;
  const fullUrl = url.startsWith('http') ? url : `https://indianwebify.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://indianwebify.com${image}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noindex || nofollow ? `${noindex ? 'noindex' : ''}${nofollow ? ', nofollow' : ''}` : 'index, follow'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Indian Webify" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6d123f" />
      <meta name="msapplication-TileColor" content="#6d123f" />
      <link rel="canonical" href={fullUrl} />

      {/* Favicon */}
      {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default SEO;

