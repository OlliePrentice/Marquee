import ContainerFullWidth from "./container-full-width";
import CardCategory from './card-category';

export default function Categories() {

    const items = [
        {
            'name': 'Studios',
            'spaces': 420,
            'image': '/images/category-studio.jpg',
            'alt': 'catgory name',
            'subcategories': ['Rehearsal', 'Recording', 'Photography', 'Art']
        },
        {
            'name': 'Classes',
            'spaces': 16,
            'image': '/images/category-classes.jpg',
            'alt': 'catgory name',
            'subcategories': ['Music', 'Art', 'Pottery']
        },
        {
            'name': 'Meeting Rooms',
            'spaces': 1124,
            'image': '/images/category-meeting.jpg',
            'alt': 'catgory name',
            'subcategories': []
        },
        {
            'name': 'Function Rooms',
            'spaces': 7,
            'image': '/images/category-function.jpg',
            'alt': 'catgory name',
            'subcategories': ['Wedding', 'Party']
        },
        {
            'name': 'Sports Venues',
            'spaces': 14,
            'image': '/images/category-sports.jpeg',
            'alt': 'catgory name',
            'subcategories': ['Tennis', 'Badminton', 'Squash']
        },
        {
            'name': 'Outdoor',
            'spaces': 12,
            'image': '/images/category-outdoor.jpeg',
            'alt': 'catgory name',
            'subcategories': ['Kayaking', 'Clay Pigeon', 'Climbing']
        },
        {
            'name': 'Restaurants',
            'spaces': 6,
            'image': '/images/category-restaurant.jpg',
            'alt': 'catgory name',
            'subcategories': []
        },
        {
            'name': 'Accommodation',
            'spaces': 10405,
            'image': '/images/category-accommodation.webp',
            'alt': 'catgory name',
            'subcategories': ['Pet friendly', 'Entire home']
        }
    ];

    return (
        <ContainerFullWidth background="bg-gray-50">
            <ul className="flex flex-wrap -mx-4 list-none p-0">
                {items.map((item, i) => {
                    return (
                        <CardCategory key={i} item={item}/>
                    );
                })}

            </ul>
        </ContainerFullWidth>
    );
}
