import { useRef, useState } from 'react';
import { CiDiscount1 } from 'react-icons/ci';
import { RiSofaLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/molecules/ProductCard';
import { Image } from '@mantine/core';
import { useAuth } from '@/store/auth.store';

export function HomePage() {
  const productContainerRef = useRef<HTMLDivElement>(null);
  const newArrivalsContainerRef = useRef<HTMLDivElement>(null);
  const {isAuth, login} = useAuth()


  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -800,
        behavior: 'smooth',
      });
    }
  };
  console.log('1')
  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 800,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div
        style={{
          width: '600px',
          height: '250px',
          top: '314px',
          opacity: 1,
          marginTop: '150px',
          zIndex: '1',
        }}
      >
        <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '24px',
            fontWeight: 400,
            lineHeight: '28.13px',
            textAlign: 'left',
            padding: '10px',
            marginLeft: '90px',
          }}
        >
          Stylish solutions for you
        </div>
        <div
          style={{
            fontFamily: 'Krona One, sans-serif',
            fontSize: '50px',
            fontWeight: 400,
            lineHeight: '63.59px',
            textAlign: 'left',
            color: 'rgba(243, 101, 21, 1)',
            padding: '20px',
            marginLeft: '70px',
          }}
        >
          CHOOSE YOUR <br />
          PERFECT <br />
          FURNITURE
        </div>

        <div style={{ marginLeft: '65px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '200px',
              height: '200px',
            }}
          >
            <Link to="/catalog" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  border: '3px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '24px',
                    fontWeight: 700,
                    lineHeight: '23.44px',
                    textAlign: 'center',
                  }}
                >
                  Catalog
                </span>
              </div>
            </Link>

            <div
              style={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                width: '71px',
                height: '3px',
                backgroundColor: 'rgba(243, 101, 21, 1)',
                transform: 'translateY(-50%)',
                zIndex: 4,
              }}
            />

            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: '1415px',
                zIndex: '-1',
                marginBottom: '100px',
              }}
            >
              <Image src="src/assets/images/image.png" alt="image" width="600px" height="740px" />
            </div>

            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: '2650px',
                zIndex: '-1',
                marginBottom: '400px',
              }}
            >
              <Image src="src/assets/images/image2.png" alt="image" width="600px" height="441px" />
            </div>

            <div
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                backgroundColor: 'white',
                transform: 'translateY(-50%)',
                zIndex: 2,
              }}
            />
          </div>
        </div>

        <div
          style={{
            marginLeft: '1200px',
            opacity: 1,
            width: '500px',
          }}
        >
          <div
            style={{
              fontFamily: 'Roboto',
              fontSize: '22px',
              fontWeight: 400,
              lineHeight: '23.44px',
              textAlign: 'left',
              opacity: 1,
              marginBottom: '5px',
            }}
          >
            Stunning collections of modern designer furniture - unique sets as a work of alternative
            art.
          </div>
          <Link
            to="/catalog?q=new_collections"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: 700,
                lineHeight: '23.44px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                marginTop: '20px',
              }}
            >
              New Collection
              <div
                style={{
                  borderTop: '2px solid rgba(243, 101, 21)',
                  height: '2px',
                  width: '80px',
                  marginLeft: '10px',
                }}
              ></div>
            </div>
          </Link>
        </div>
      </div>

      <div
        style={{
          background: 'rgba(23, 22, 22, 1)',
          width: '100%',
          height: '370px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 50px',
          position: 'relative',
          marginTop: '550px',
        }}
      >
        {/* Текст Benefits */}
        <div
          style={{
            position: 'absolute',
            left: '100px',
            top: '20px',
            fontFamily: 'Roboto',
            fontSize: '34px',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          Benefits
        </div>

        {/* Лівий блок */}
        <div style={{ textAlign: 'center', marginLeft: '100px' }}>
          <TbTruckDelivery style={{ fontSize: '80px', color: '#fff' }} />
          <div
            style={{
              fontFamily: 'Roboto',
              fontSize: '24px',
              fontWeight: 400,
              color: '#fff',
              width: '300px',
            }}
          >
            Delivery throughout the Europe and USA
          </div>
        </div>

        {/* Центральний блок */}
        <div style={{ textAlign: 'center' }}>
          <RiSofaLine style={{ fontSize: '80px', color: '#fff' }} />
          <div
            style={{
              fontFamily: 'Roboto',
              fontSize: '24px',
              fontWeight: 400,
              color: '#fff',
              width: '300px',
            }}
          >
            Create your own furniture or choose from our collection
          </div>
        </div>

        {/* Правий блок */}
        <div style={{ textAlign: 'center', marginRight: '200px' }}>
          <CiDiscount1 style={{ fontSize: '80px', color: '#fff' }} />
          <div
            style={{
              fontFamily: 'Roboto',
              fontSize: '24px',
              fontWeight: 400,
              color: '#fff',
              width: '300px',
            }}
          >
            Get a 10% discount on your first item
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '50px',
          left: '100px',
          top: '20px',
          fontFamily: 'Roboto',
          fontSize: '34px',
          fontWeight: 700,
          color: 'black',
          marginLeft: '100px',
        }}
      >
        BEST SELLERS
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '25px',
          marginLeft: '100px',
          overflowX: 'hidden',
        }}
      >
        <button
          onClick={() => scrollLeft(productContainerRef)}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '24px',
            cursor: 'pointer',
            gap: '10px',
            marginBottom: '100px',
          }}
        >
          ←
        </button>

        <div
          ref={productContainerRef}
          style={{
            display: 'flex',
            scrollBehavior: 'smooth',
            width: '100%',
            padding: '10px 0',
            overflowX: 'hidden',
          }}
        >
          {[...Array(12)].map((_, index) => (
            <div key={index} style={{ minWidth: '18%', height: '550px' }}>
              <ProductCard
                key={index}
                imageSrc={`https://via.placeholder.com/200?text=Product+${index + 1}`}
                productName={`Product ${index + 1}`}
                price={`$${(index + 1) * 100}`}
                colors={['#FF0000', '#00FF00', '#0000FF']}
                rating={4.5}
                reviewsCount={120}
                productId={index.toString()}
                productType={'Chairs'}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollRight(productContainerRef)}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '24px',
            cursor: 'pointer',
            marginRight: '50px',
            marginBottom: '100px',
          }}
        >
          →
        </button>
      </div>

      <div
        style={{
          left: '100px',
          top: '20px',
          fontFamily: 'Roboto',
          fontSize: '34px',
          fontWeight: 700,
          color: 'black',
          marginLeft: '100px',
        }}
      >
        NEW ARRIVALES
      </div>

      <div
        style={{ display: 'flex', alignItems: 'center', marginTop: '25px', marginLeft: '100px' }}
      >
        <button
          onClick={() => scrollLeft(newArrivalsContainerRef)}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '24px',
            cursor: 'pointer',
            gap: '10px',
            marginBottom: '100px',
          }}
        >
          ←
        </button>

        <div
          ref={newArrivalsContainerRef}
          style={{
            display: 'flex',
            scrollBehavior: 'smooth',
            width: '100%',
            padding: '10px 0',
            overflowX: 'hidden',
          }}
        >
          {[...Array(12)].map((_, index) => (
            <div key={index} style={{ minWidth: '20%', height: '550px' }}>
              <ProductCard
                key={index}
                imageSrc={`https://via.placeholder.com/200?text=Product+${index + 1}`}
                productName={`Product ${index + 1}`}
                price={`$${(index + 1) * 100}`}
                colors={['#FF0000', '#00FF00', '#0000FF']}
                rating={4.5}
                reviewsCount={120}
                productId={index.toString()}
                productType={'Chairs'}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollRight(newArrivalsContainerRef)}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '24px',
            cursor: 'pointer',
            marginRight: '50px',
            marginBottom: '100px',
          }}
        >
          →
        </button>
      </div>
    </>
  );
}
