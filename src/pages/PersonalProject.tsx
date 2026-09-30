import GalleryViewer from "../components/GalleryViewer";

const imageModules = import.meta.glob(
    "../assets/images/personal_project/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
    {eager: true, import: "default"}
) as Record<string, string>;

export default function PersonalProject() {
    return <GalleryViewer imageModules={imageModules} defaultSection="PERSONAL PROJECT"/>;
}
