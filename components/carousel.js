import ContainerFullWidth from "./container-full-width";
import CardFeatured from './card-featured';
import CardStory from './card-story';
import {Swiper, SwiperSlide} from 'swiper/react';

export default function Carousel({heading, cards}) {

    let items;

    if (cards === 'spaces') {
        items = [
            {
                'name': 'Nine Volt Leap',
                'location': 'Melksham',
                'description': 'Full backline with drums, breakables at additional cost. Acoustic treatment and comfy sofas for that added touch.',
                'image': '/images/studio-rehearsal.jpg',
                'alt': 'studio',
                'categories': ['Rehearsal']
            },
            {
                'name': 'Mooncalf Studios',
                'location': 'Marlborough',
                'description': 'Pearl Drums, Marshall Amps. High specification acoustic treatment.',
                'image': '/images/studio-rehearsal-3.jpeg',
                'alt': 'studio',
                'categories': ['Rehearsal', 'Recording']
            },
            {
                'name': 'Real World Studios',
                'location': 'Box',
                'description': 'Rehearsal space connected to the recording studio founded by Peter Gabriel.',
                'image': '/images/studio-rehearsal-2.jpg',
                'alt': 'studio',
                'categories': ['Rehearsal', 'Recording']
            },
            {
                'name': 'The Warehouse',
                'location': 'Devizes',
                'description': 'Basic backline, drums included. Snack counter.',
                'image': '/images/studio-rehearsal-4.jpg',
                'alt': 'studio',
                'categories': ['Rehearsal']
            },
            {
                'name': 'Nine Volt Leap',
                'location': 'Melksham',
                'description': 'Full backline with drums, breakables at additional cost. Acoustic treatment and comfy sofas for that added touch.',
                'image': '/images/studio-rehearsal.jpg',
                'alt': 'studio',
                'categories': ['Rehearsal']
            },
            {
                'name': 'Mooncalf Studios',
                'location': 'Marlborough',
                'description': 'Pearl Drums, Marshall Amps. High specification acoustic treatment.',
                'image': '/images/studio-rehearsal-3.jpeg',
                'alt': 'studio',
                'categories': ['Rehearsal', 'Recording']
            },
            {
                'name': 'Real World Studios',
                'location': 'Box',
                'description': 'Rehearsal space connected to the recording studio founded by Peter Gabriel.',
                'image': '/images/studio-rehearsal-2.jpg',
                'alt': 'studio',
                'categories': ['Rehearsal', 'Recording']
            },
            {
                'name': 'The Warehouse',
                'location': 'Devizes',
                'description': 'Basic backline, drums included. Snack counter.',
                'image': '/images/studio-rehearsal-4.jpg',
                'alt': 'studio',
                'categories': ['Rehearsal']
            },
        ]
    } else if (cards === 'stories') {
        items = [
            {
                'title': 'Nine Volt Leap',
                'excerpt': 'Lorem ipsum dolor sit amet, mel eu suavitate splendide, qui dissentiunt voluptatibus an.',
                'image': '/images/studio-rehearsal.jpg',
                'alt': 'studio',
                'categories': ['Inspiration'],
                'date': '04 September 2020'
            },
            {
                'title': 'Mooncalf Studios',
                'excerpt': 'Lorem ipsum dolor sit amet lorem ipsum dolor.',
                'image': '/images/studio-rehearsal-3.jpeg',
                'alt': 'studio',
                'categories': ['News'],
                'date': '12 March 2020'
            },
            {
                'title': 'Real World Studios',
                'excerpt': 'Lorem ipsum dolor sit amet, mel eu suavitate splendide, qui dissentiunt voluptatibus an.',
                'image': '/images/studio-rehearsal-2.jpg',
                'alt': 'studio',
                'categories': ['Events'],
                'date': '23 April 2020'
            },
            {
                'title': 'The Warehouse',
                'excerpt': 'Lorem ipsum dolor sit amet, mel eu suavitate splendide, qui dissentiunt voluptatibus an.',
                'image': '/images/studio-rehearsal-4.jpg',
                'alt': 'studio',
                'categories': ['News'],
                'date': '23 April 2020'
            },
            {
                'title': 'Nine Volt Leap',
                'excerpt': 'Lorem ipsum dolor sit amet lorem ipsum dolor.',
                'image': '/images/studio-rehearsal.jpg',
                'alt': 'studio',
                'categories': ['Inspiration'],
                'date': '04 September 2020'
            },
            {
                'title': 'Mooncalf Studios',
                'excerpt': 'Lorem ipsum dolor sit amet, mel eu suavitate splendide, qui dissentiunt voluptatibus an.',
                'image': '/images/studio-rehearsal-3.jpeg',
                'alt': 'studio',
                'categories': ['News'],
                'date': '12 March 2020'
            },
            {
                'title': 'Real World Studios',
                'excerpt': 'Lorem ipsum dolor sit amet, mel eu suavitate splendide, qui dissentiunt voluptatibus an.',
                'image': '/images/studio-rehearsal-2.jpg',
                'alt': 'studio',
                'categories': ['News'],
                'date': '23 April 2020'
            },
            {
                'title': 'The Warehouse',
                'excerpt': 'Lorem ipsum dolor sit amet lorem ipsum dolor.',
                'image': '/images/studio-rehearsal-4.jpg',
                'alt': 'studio',
                'categories': ['Inspiration'],
                'date': '23 April 2020'
            }
        ]
    }

    return (
        <ContainerFullWidth heading={heading} background={cards === 'stories' ? 'bg-gray-900' : ''}>

            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                className="overflow-visible"
            >
                {items.map((item, i) => {
                    return (
                        <SwiperSlide key={i} className="h-auto">
                            {cards === 'spaces' && <CardFeatured item={item}/>}
                            {cards === 'stories' && <CardStory item={item}/>}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </ContainerFullWidth>
    );
}
