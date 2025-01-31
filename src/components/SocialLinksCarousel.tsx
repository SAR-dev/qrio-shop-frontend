import { useEffect } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { pb } from "../contexts/PocketContext";
import { Collections, SocialsResponse } from "../types/pocketbase";
import { constants } from "../constants";
import { useLocalStorage } from "usehooks-ts";
import SectionLeftHeader from "./SectionLeftHeader";
import { Link } from "react-router";

const socialIcons = [
    {
        platform: "FACEBOOK",
        icon: <FaFacebook className="size-6" />
    },
    {
        platform: "YOUTUBE",
        icon: <FaYoutube className="size-6" />
    },
    {
        platform: "INSTAGRAM",
        icon: <FaInstagram className="size-6" />
    },
    {
        platform: "WHATSAPP",
        icon: <FaWhatsapp className="size-6" />
    },
    {
        platform: "TIKTOK",
        icon: <FaTiktok className="size-6" />
    },
    {
        platform: "TWITTER",
        icon: <FaTwitter className="size-6" />
    },
]

const SocialLinksCarousel = ({ enableFetch }: { enableFetch: boolean }) => {
    const [socialLinks, setSocialLinks] = useLocalStorage<SocialsResponse[]>(constants.SOCIAL_LINKS_DATA_STORE_KEY, [])

    useEffect(() => {
        if (!enableFetch) return;
        pb.collection(Collections.Socials).getFullList().then(res => setSocialLinks(res))
    }, [enableFetch])

    return (
        <>
            {socialLinks.length > 0 && (
                <div className="bg-base-300 px-5 py-10">
                    <div className="max-w-screen-xl mx-auto mb-5">
                        <SectionLeftHeader title="🤗 FOLLOW US" subtitle="Get in touch with us to receive more updates!" />
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="carousel carousel-end rounded-box max-w-screen-xl">
                            {socialLinks.map((data, i) => (
                                <Link to={data.link} target="_blank" className="carousel-item relative" key={i}>
                                    <img
                                        className="h-48 w-48 object-cover"
                                        src={`${import.meta.env.VITE_API_URL}/api/files/${data.collectionId}/${data.id}/${data.image}`}
                                    />
                                    <div className="absolute bottom-0 left-0 m-2 text-white">
                                        {socialIcons.find(e => e.platform == data.platform)?.icon}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SocialLinksCarousel