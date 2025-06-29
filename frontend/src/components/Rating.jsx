import { FaStar ,FaStarHalfAlt ,FaRegStar  } from "react-icons/fa";

const Rating = ({value , text}) => {
  return (
    <div className=" text-yellow-500">
        <div className='flex items-center gap-x-3 mb-3'>
        <span>
            {value >=1 ? <FaStar/> : value > 0.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span>
            {value >=2 ? <FaStar/> : value > 1.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span>
            {value >=3 ? <FaStar/> : value > 2.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span>
            {value >=4 ? <FaStar/> : value > 3.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
        <span>
            {value >=5 ? <FaStar/> : value > 4.5 ? <FaStarHalfAlt/>:<FaRegStar/>}
        </span>
    </div>
    <div className="text-gray-700">
        reviews {text && text}
    </div>
    </div>
  )
}

export default Rating