import React, { useContext } from 'react'
import { ThemeContext } from "../App";



const Input = () => {

    const {setIsError, SetWaning, AllDetail, SetAllDetail, setCardLoading, setPlayListLoading } = useContext(ThemeContext)

    const Get_Detail = async  (Url: String) => {




        setIsError(false)

        // eslint-disable-next-line
        var re = new RegExp(`https:\/\/www\.youtube\.com\/watch?.*=...........`);
        // eslint-disable-next-line
        var playlist = new RegExp(`https://www.youtube.com/playlist`);
        SetAllDetail({ type: 'empty' });
        SetWaning([]);

        if (Url === "") {
            return 0;
        }

        const AllUrl = Url.split('\n')

        // this function come from python line 17 in main.py 
        // then call this function then it will run in python
        // after it will get all details of youtube a video 
        // through 'message'  and all details stored value to AllDetails 
        // split mean 2 url in textarea into ["url", "url"]
        

        for (let i = 0; i < AllUrl.length; i++)  
         {

            let url = AllUrl[i]

            if (url !== "") {
                if (url.match(re)) {
                    if (AllDetail.every((obj: any) => obj.url !== url)) {
                         setCardLoading(true)
                         await window.eel.Add_Details(url)((message: any) => {

                            if (message !== true) {
                                SetAllDetail({ message, type: 'add' });
                            }  
                            setCardLoading(false)
                            

                        })
                    }
                } else if (url.match(playlist)) {
                    setPlayListLoading(true)
                    await window.eel.Get_Data_Details_Playlists(url)((data: Array<any>) => {

                        data.map((message: any) => {
                            if (message !== true) {
                                SetAllDetail({ message, type: 'add' });
                            }  
                            return 0;
                        })
                        setPlayListLoading(false)
                    })
                }
                else {
                    SetWaning((arr: any) => [...arr, url]);
                }
            }
        }  
        
        
        return false;
        


    }

   

    

    return (

        <textarea rows={5} cols={45} onChange={(e) => Get_Detail(e.target.value)} required />

    )
}


export { Input }