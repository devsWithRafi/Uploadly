import Image from 'next/image';

const image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s';

const Aveter = () => {
    return (
        <div className="bg-black w-12 h-12 rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
            <Image
                src={image}
                alt=""
                width={50}
                height={50}
                className="rounded-full scale-[0.9]"
            />
        </div>
    );
};

export default Aveter;
