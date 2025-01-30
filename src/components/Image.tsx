import { useImageModalStore } from "../stores/imageModalStore"

const Image = ({ className, src }: { className: string, src: string }) => {
    const { openImageModal } = useImageModalStore()
    return (
        <img src={src} className={`${className} cursor-zoom-in`} onClick={() => openImageModal(src)} />
    )
}

export default Image