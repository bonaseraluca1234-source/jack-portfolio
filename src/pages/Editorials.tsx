import GalleryViewer from "../components/GalleryViewer";

const imageModules = import.meta.glob(
    "../assets/images/editorials/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
    {eager: true, import: "default"}
) as Record<string, string>;

export default function Editorials() {
    return <GalleryViewer imageModules={imageModules} defaultSection="EDITORIALS"/>;
}
