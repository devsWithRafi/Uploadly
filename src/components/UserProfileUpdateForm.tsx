'use client';

import { useCurrentUser } from '@/context/user-context/UserContext';
import Image from 'next/image';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaSquareXTwitter,
    FaPinterest,
} from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { Button } from './ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import { useUsersSocials } from '@/hooks/useUsersSocials';
import defaultCover from '@/assets/defaultCover.png';
import defaultAveter from '@/assets/defaultAveter.png';
import { Spinner } from './ui/spinner';

const socialIcons = {
    facebook: FaFacebook,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    twitter: FaSquareXTwitter,
    github: FaGithub,
    pinterest: FaPinterest,
    portfolio: BsPersonWorkspace,
};

const platforms = {
    facebook: '',
    instagram: '',
    linkedin: '',
    github: '',
    twitter: '',
    pinterest: '',
    portfolio: '',
} as const;

type profileInputType = {
    name: string;
    bio: string;
};

type platformType = typeof platforms;

const UserProfileUpdateForm = ({
    setIsOpen,
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const { currentUser } = useCurrentUser();
    const socialdata = useUsersSocials(currentUser?.id);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputProfileInfo, setInputProfileInfo] = useState<profileInputType>({
        name: '',
        bio: '',
    });
    const [inputSocialInfo, setInputSocialInfo] =
        useState<platformType>(platforms);
    const [coverImgFile, setCoverImgFile] = useState<File | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const profileFileRef = useRef<HTMLInputElement>(null);

    const InputProps = (
        placeholder: string,
        name: string,
        inpuType: 'social' | 'info' = 'info'
    ) => {
        return {
            name,
            placeholder: `${placeholder} (Optional)`,
            className:
                'border h-full capitalize border-gray-500 p-5 font-space max-[525px]:p-4 text-[16px] max-[525px]:text-[14px]',
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                inpuType === 'social'
                    ? setInputSocialInfo({
                          ...inputSocialInfo,
                          [e.target.name]: e.target.value,
                      })
                    : setInputProfileInfo({
                          ...inputProfileInfo,
                          [e.target.name]: e.target.value,
                      }),
        };
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!currentUser) return;
            setLoading(true);
            const formData = new FormData();
            formData.append('userId', currentUser.id);
            formData.append('name', inputProfileInfo.name);
            formData.append('bio', inputProfileInfo.bio);
            formData.append('platforms', JSON.stringify(inputSocialInfo));

            if (coverImgFile) formData.append('coverImage', coverImgFile);
            if (profileImageFile)
                formData.append('profileImage', profileImageFile);

            const res = await axios.put('/api/update-user', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const data = res.data;

            if (res.status === 200 && data.success) {
                toast.success('Profile Update Succesful!');
                setIsOpen((prev) => !prev);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const addPreviusInfo = () => {
            if (currentUser) {
                setInputProfileInfo({
                    name: currentUser.name,
                    bio: currentUser.bio || 'No Bio Added Yet',
                });
            }
            if (!socialdata?.platforms) return;
            setInputSocialInfo(socialdata.platforms as platformType);
        };
        addPreviusInfo();
    }, [socialdata]);

    return (
        <main
            onSubmit={handleSubmit}
            className="bg-gray-50 w-150 max-[665px]:w-[95vw] max-h-[90vh] max-[665px]:h-[95vh] overflow-y-auto rounded-xl shadow-md"
        >
            {/* COVER PHOTO */}
            <section
                className={cn(
                    'w-full relative',
                    loading && 'pointer-events-none select-none opacity-[0.5]'
                )}
            >
                <div className="overflow-hidden relative w-full bg-gray-200 aspect-[3/0.7]">
                    {currentUser && (
                        <Image
                            src={
                                coverImgFile
                                    ? URL.createObjectURL(coverImgFile)
                                    : currentUser.coverImage
                                    ? currentUser.coverImage
                                    : defaultCover
                            }
                            alt=""
                            width={1000}
                            height={300}
                            className="w-full"
                        />
                    )}

                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="absolute top-2 right-2 bg-white w-8 h-8 aspect-square rounded-full flex items-center justify-center text-[14px] cursor-pointer shadow-md hover:bg-parple hover:text-white duration-200"
                    >
                        <FiEdit />
                        <input
                            ref={fileRef}
                            onChange={(e) =>
                                e.target.files &&
                                setCoverImgFile(e.target.files[0])
                            }
                            type="file"
                            className="hidden"
                        />
                    </button>
                </div>
            </section>
            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className={cn(
                    '',
                    loading && 'pointer-events-none select-none opacity-[0.5]'
                )}
            >
                {/* PROFILE INFO */}
                <section className="mt-5 relative px-8 max-[525px]:px-5 flex items-center gap-5">
                    <div className="w-30 max-[525px]:w-25 aspect-square rounded-full overflow-hidden relative flex items-center justify-center">
                        {currentUser && (
                            <Image
                                src={
                                    profileImageFile
                                        ? URL.createObjectURL(profileImageFile)
                                        : currentUser.image
                                        ? currentUser.image
                                        : defaultAveter
                                }
                                alt=""
                                width={300}
                                height={300}
                                className="w-full h-full"
                            />
                        )}
                        <button
                            type="button"
                            onClick={() => profileFileRef.current?.click()}
                            className="absolute bg-white w-8 h-8 aspect-square rounded-full flex items-center justify-center text-[14px] cursor-pointer shadow-md hover:bg-parple hover:text-white duration-200"
                        >
                            <FiEdit />
                            <input
                                ref={profileFileRef}
                                onChange={(e) =>
                                    e.target.files &&
                                    setProfileImageFile(e.target.files[0])
                                }
                                type="file"
                                className="hidden"
                            />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        {/* inputs */}
                        <div className="h-12 max-[525px]:h-10 w-full">
                            <Input
                                {...InputProps('Enter your name', 'name')}
                                value={inputProfileInfo.name}
                            />
                        </div>
                        <div className="h-12 max-[525px]:h-10 w-full">
                            <Input
                                {...InputProps('Enter your bio', 'bio')}
                                value={inputProfileInfo.bio}
                            />
                        </div>
                    </div>
                </section>
                {/* SOCIAL INFO */}
                <section className="w-full relative px-10 max-[525px]:px-7 mt-15">
                    <h1 className="font-poppins font-medium mb-5 text-xl">
                        Add your social info
                    </h1>
                    <div className="flex flex-col gap-5">
                        {Object.keys(platforms).map((key) => {
                            const keys = key as keyof typeof platforms;
                            const ICON = socialIcons[keys];
                            return (
                                <div
                                    key={key}
                                    className="flex items-center gap-2 h-12 max-[525px]:h-10"
                                >
                                    <span className="h-full aspect-square flex items-center justify-center text-[20px] bg-white shadow rounded-full text-zinc-700 max-[525px]:text-[16px]">
                                        <ICON />
                                    </span>
                                    <Input
                                        {...InputProps(
                                            `${key} Url`,
                                            key,
                                            'social'
                                        )}
                                        value={inputSocialInfo[keys]}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </section>
                {/* SUBMIT BUTTON */}
                <section className="w-full px-10 max-[525px]:px-7 py-10 flex flex-col gap-3">
                    <Button
                        type="submit"
                        className="w-full p-5.5 max-[525px]:p-5 font-poppins"
                    >
                        {loading ? (
                            <span className="flex items-center gap-1">
                                <Spinner /> Updating...
                            </span>
                        ) : (
                            <span>Update</span>
                        )}
                    </Button>
                    <Button
                        onClick={() => setIsOpen((prev) => !prev)}
                        type="button"
                        variant={'outline'}
                        className="w-full p-5 max-[525px]:p-4.5 font-poppins border-zinc-500"
                    >
                        Cancel
                    </Button>
                </section>
            </form>
        </main>
    );
};

export default UserProfileUpdateForm;
