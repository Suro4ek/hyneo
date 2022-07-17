import video1 from "../source/1.webm"
import video2 from "../source/2.webm"
import video3 from "../source/3.webm"
import video4 from "../source/4.webm"
import video5 from "../source/5.webm"
import video6 from "../source/6.webm"
import video7 from "../source/7.webm"
import video8 from "../source/8.webm"
import video9 from "../source/9.webm"
import video10 from "../source/10.webm"
import video11 from "../source/11.webm"
import video12 from "../source/12.webm"

const hours = [
        11,
        11,
        11,
        12,
        12,
        1,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        5,
        5,
        6,
        6,
        7,
        8,
        8,
        9,
        9,
        10,
        10,
]
const videos = [
    video1,
    video2,
    video3,
    video4,
    video5,
    video6,
    video7,
    video8,
    video9,
    video10,
    video11,
    video12
]

const UseVideo = () => {
    const date = new Date();
    const video = videos[hours[date.getHours()]-1];
    return {video}
}

export default UseVideo;