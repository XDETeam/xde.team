import { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router';

export default function Document() {
  const router = useRouter();
  const { locale } = router;
    
  return (
    <Html lang={ locale }>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
