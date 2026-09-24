import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faStar as regularstar} from "@fortawesome/free-regular-svg-icons";
import { faStar as solidstar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageChannel } from "node:worker_threads";
import React from "react";


export default function Rating({rating}:{rating:number}){
    function getstaricon(position:number):IconProp{
        if(rating>=position){
            return solidstar
        }else if(rating>=position-0.5){
            return faStarHalfStroke
        }else{
            return regularstar
        }
    }
  return<>
 
    {[1,2,3,4,5].map((position,index)=><FontAwesomeIcon className="text-yellow-500 text-sm" key={index} icon={getstaricon(position)}/>)}
  
  
  </>
}
