import React from 'react'
import Layout from '../Layout/Layout'
import { FiMail, FiMapPin, FiPhone, FiClock } from 'react-icons/fi'
import HeadContact from '../Components/HeadContact'

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: "Київстар",
      info: "+38 (067) 93-42-021 Viber",
      icon: FiPhone,
      contact: "",
    },
    {
      id: 2,
      title: "MTC",
      info: "+38 (095) 12-23-343",
      icon: FiPhone,
      contact: "",
    },
    {
      id: 3,
      title: "Life",
      info: "+38 (063) 54-56-231",
      icon: FiPhone,
      contact: "",
    },
    {
      id: 4,
      title: "Viber додатковий",
      info: "+38 (063) 36-74-051",
      icon: FiPhone,
      contact: "",
    },
    {
      id: 5,
      title: "Графік роботи",
      info: "Пн-Сб: з 10.00 до 18.00",
      icon: FiClock,
      contact: "",
    },
    {
      id: 6,
      title: "Електронна адреса для замовлень",
      info: "Admin.email@gmail.com",
      icon: FiMail,
      contact: "",
    },
    {
      id: 7,
      title: "Рекламні питання",
      info: "email@gmail.com",
      icon: FiMail,
      contact: "",
    },
    {
      id: 8,
      title: "Адреса",
      info: "Вулиця Політехнічна, 6, Київ, 02000",
      icon: FiMapPin,
      contact: "",
    },
  ]

  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
        <HeadContact title="Наші контакти" />
        <div className='mt-20 text-sm leading-8 text-mainText'>
          <p>
            Інформація, що розміщена на нашому веб-сайті, є загальнодоступною у мережах Інтернету.
            У випадку, якщо наш ресурс порушив ваші авторські права, будь ласка, звертайтеся до адміністрації
            сайту за електронною адресою вказаною нижче, і ми оперативно видалимо відповідний контент.
          </p>
        </div>
        <div className='flex flex-wrap justify-center gap-6 lg:my-20 my-10'>
          {
            ContactData.map((item) => (
              <div key={ item.id } className="border border-main flex-colo p-10 bg-dry rounded-lg text-center w-full sm:w-auto">
                <span className='flex-colo w-20 h-20 mb-4 rounded-full bg-main text-mainText text-2xl'>
                  <item.icon />
                </span>
                <h5 className='text-xl font-semibold mb-2 text-gray-400'>{ item.title }</h5>
                <p className='mb-0 text-sm text-subMain leading-7'>
                  { item.contact ? (
                    <a href={ `mailto:${item.contact}` } className='text-subMain'>
                      { item.contact }
                    </a>
                  ) : item.info }
                </p>
              </div>
            ))
          }
        </div>
        <h3 className='text-xl lg:text-xl mb-4 font-semibold'>
          Ми на карті:
        </h3>
        <div className='flex justify-center items-center'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2820.367082758547!2d30.461574079582924!3d50.44960891905389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce8314fdfde3%3A0xd09dbe758a8cc765!2z0JrQn9CGINCa0L7RgNC_0YPRgSA1INCi0JXQpCBp0LwuINCd0LUg0JDQvdGC0L7QvdCwINCc0L7QvdC60L7QstCw!5e1!3m2!1suk!2sua!4v1728475570671!5m2!1suk!2sua"
            width="100%"
            height="450"
            style={ { border: 0 } }
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>


        </div>
      </div>
    </Layout>
  )
}

export default ContactUs
