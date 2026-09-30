import GalleryViewer from "../components/GalleryViewer";

const imageModules = import.meta.glob(
    "../assets/images/campaign/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
    {eager: true, import: "default"}
) as Record<string, string>;

export default function Campaign() {
    return <GalleryViewer imageModules={imageModules} defaultSection="CAMPAIGN"/>;
}
