'use client';

import Masonry from 'react-masonry-css';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import Card from '@/components/shared/card/Card';

const News = ({ newsData }) => {
  const news = newsData;
  console.log('%cnews data on the home page', 'color:green', JSON.stringify(news, null, 2));
  //  const combinedData = () => {

  //  }
  const breakpointColumnsObj = {
    default: 3,
    1300: 2,
    875: 1,
  };

  return (
    <section className="bg-[#fafafa]">
      <div className="py-16 lg:pb-[15rem] lg:pt-[10rem] md:py-20 bg-[#f3f3f3] dark:bg-background-5">
        <div className="max-w-[1440px] mx-auto">
          <div className=" lg:px-16 px-6 ">
            {/* Header */}
            <div className="flex flex-col text-center space-y-5 items-center">
              <RevealAnimation delay={0.1}>
                <span className="badge bg-[#fff]">News</span>
              </RevealAnimation>
              <RevealAnimation delay={0.2}>
                {/* <h2 className="max-w-[500px] mx-auto leading-[1.1] text-[4.5rem]">Bushwood Times</h2> */}
                <Image src="/images/home/the-bushwood-times.svg" width={600} height={51} alt='' className='mb-3 lg:mb-10 max-w-[80vw]'/>
              </RevealAnimation>
              {/* <RevealAnimation delay={0.2}>
                <p className="off-black  mb-[4rem] max-w-[700px]">something to say</p>
              </RevealAnimation> */}
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {news.map((item, index) => (
                  <RevealAnimation key={item._id} delay={0.3 + index * 0.1}>
                    <div>
                      <Card
                        imgURL={item.image?.asset?.url ?? ''}
                        lqip={item.image?.asset?.metadata?.lqip ?? ''}
                        title={item.title}
                        description={item.description}
                        linkText={item.linkDeets?.linkText}
                        linkURL={item.linkDeets?.linkURL}
                        linkQuestion={item.linkQuestion}
                      />
                    </div>
                  </RevealAnimation>
                ))}
              </Masonry>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
