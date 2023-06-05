import { BrPage } from '@bloomreach/react-sdk'
import axios from 'axios'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { homePageResultMock } from '@/__mocks__/stories'
import ContentPage from '@/components/br/BRHero/ContentPage'
import KiboHeroCarousel from '@/components/home/Carousel/KiboHeroCarousel'
import { FullWidthLayout } from '@/components/layout'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse, NextPageWithLayout } from '@/lib/types'

import type { GetServerSidePropsContext } from 'next'

interface HomePageProps {
  carouselItem: any
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  return {
    props: {
      categoriesTree,
      carouselItem: homePageResultMock,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Home: NextPageWithLayout<HomePageProps> = (props) => {
  const { carouselItem } = props
  const router = useRouter()

  //convert the query string object to a string
  function toLocation(query: any) {
    const paramsStr = Object.keys(query)
      .map((key) => key + '=' + query[key])
      .join('&')

    return paramsStr ? '?' + paramsStr : ''
  }

  return (
    <>
      <BrPage configuration={{
          path: `${router.pathname}${toLocation(router.query)}`,
          endpoint: 'https://developers.bloomreach.io/delivery/site/v1/channels/am_bloomreach_poc/pages',
          httpClient: axios
        }} mapping={{ ContentPage }} />
      {/* <KiboHeroCarousel carouselItem={carouselItem || []}></KiboHeroCarousel> */}
    </>
  )
}

Home.getLayout = FullWidthLayout

export default Home
