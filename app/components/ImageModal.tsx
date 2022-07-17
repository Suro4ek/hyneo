// import {classNames} from "~/utils/utils";
// import {useRecoilState} from "recoil";
// import {Image} from "~/state/states"
//
// const ImageModal = ({image}: {image:string}) => {
//     const [isOpen, setOpen] = useRecoilState(Image);
//     return(
//         <div className={classNames("fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center", !isOpen ? "hidden" : "")}>
//             <a className="fixed z-90 top-6 right-8 text-white text-5xl font-bold"
//                onClick={() => setOpen(false)}>&times;</a>
//
//             <img className="max-w-[800px] max-h-[600px] object-cover" src={image}/>
//         </div>
//     )
// }
//
// export default ImageModal;
